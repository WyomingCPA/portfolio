<?php

namespace App\Console\Commands;

use App\Models\PortfolioAsset;
use App\Models\PortfolioTax;
use App\Models\PortfolioTaxAccrual;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;

class AccruePortfolioTaxes extends Command
{
    protected $signature = 'portfolio:accrue-taxes';

    protected $description = 'Ежедневное начисление налогов по целям Portfolio';

    public function handle(): int
    {
        $today = today()->toDateString();

        // Общая стоимость всех активов
        $portfolioTotal = PortfolioAsset::sum('current_value');

        if ($portfolioTotal <= 0) {
            $this->warn('Стоимость портфеля равна нулю. Начисление пропущено.');

            return self::SUCCESS;
        }

        $taxes = PortfolioTax::where('is_active', true)->get();

        if ($taxes->isEmpty()) {
            $this->info('Нет активных налоговых целей.');

            return self::SUCCESS;
        }

        $count = 0;

        foreach ($taxes as $tax) {
            DB::transaction(function () use (
                $tax,
                $today,
                $portfolioTotal,
                &$count
            ) {
                // Проверяем, начисляли ли уже этой цели сегодня
                $alreadyAccrued = PortfolioTaxAccrual::where(
                    'portfolio_tax_id',
                    $tax->id
                )
                    ->whereDate('accrual_date', $today)
                    ->exists();

                if ($alreadyAccrued) {
                    return;
                }

                $rate = (float) $tax->daily_rate;

                // Индивидуальное начисление для каждой цели
                $amount = round($portfolioTotal * $rate, 2);

                PortfolioTaxAccrual::create([
                    'portfolio_tax_id' => $tax->id,
                    'accrual_date' => $today,
                    'base_amount' => $portfolioTotal,
                    'rate' => $rate,
                    'amount' => $amount,
                ]);

                // Увеличиваем накопленную сумму цели
                $tax->increment('amount', $amount);

                $count++;
            });
        }

        $this->info("Общая стоимость портфеля: {$portfolioTotal} ₽");
        $this->info("Обработано целей: {$count}");
        $this->info("Дата начисления: {$today}");

        return self::SUCCESS;
    }
}


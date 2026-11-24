<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\PortfolioAsset;
use App\Models\PortfolioLiability;
use App\Models\PortfolioSnapshot;

class CreatePortfolioSnapshot extends Command
{
    protected $signature = 'portfolio:snapshot';

    protected $description = 'Создание ежедневного слепка портфеля';

    public function handle(): int
    {
        $totalAssets = PortfolioAsset::sum('current_value');

        $totalLiabilities = PortfolioLiability::where('is_active', true)
            ->sum('current_amount');

        $netWorth = $totalAssets - $totalLiabilities;

        PortfolioSnapshot::updateOrCreate(
            [
                'snapshot_date' => today()->toDateString(),
            ],
            [
                'total_assets' => $totalAssets,
                'total_liabilities' => $totalLiabilities,
                'net_worth' => $netWorth,
            ]
        );

        $this->info('Слепок портфеля успешно создан.');

        $this->table(
            ['Показатель', 'Значение'],
            [
                ['Активы', number_format($totalAssets, 2, '.', ' ')],
                ['Обязательства', number_format($totalLiabilities, 2, '.', ' ')],
                ['Чистый капитал', number_format($netWorth, 2, '.', ' ')],
            ]
        );

        return self::SUCCESS;
    }
}

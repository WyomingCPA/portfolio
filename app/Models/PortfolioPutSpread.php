<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PortfolioPutSpread extends Model
{
    protected $fillable = [
        'ticker',
        'expiry',
        'short_strike',
        'short_entry_price',
        'short_current_price',
        'long_strike',
        'long_entry_price',
        'long_current_price',
        'quantity',
        'contract_size',
        'commission',
        'margin',
        'notes',
    ];

    protected function casts(): array
    {
        return [
            'expiry' => 'date',
            'short_strike' => 'decimal:4',
            'short_entry_price' => 'decimal:4',
            'short_current_price' => 'decimal:4',
            'long_strike' => 'decimal:4',
            'long_entry_price' => 'decimal:4',
            'long_current_price' => 'decimal:4',
            'contract_size' => 'decimal:4',
            'commission' => 'decimal:2',
            'margin' => 'decimal:2',
        ];
    }

    // Чистая премия за один базовый актив
    public function getCreditPerUnitAttribute(): float
    {
        return (float) $this->short_entry_price
            - (float) $this->long_entry_price;
    }

    // Общая полученная премия до комиссий
    public function getGrossCreditAttribute(): float
    {
        return $this->credit_per_unit
            * $this->quantity
            * (float) $this->contract_size;
    }

    // Максимальная прибыль после комиссии
    public function getMaxProfitAttribute(): float
    {
        return $this->gross_credit - (float) $this->commission;
    }

    // Максимальный убыток с учётом комиссии
    public function getMaxLossAttribute(): float
    {
        $spreadWidth = (float) $this->short_strike
            - (float) $this->long_strike;

        $grossLoss = ($spreadWidth - $this->credit_per_unit)
            * $this->quantity
            * (float) $this->contract_size;

        return $grossLoss + (float) $this->commission;
    }

    // Точка безубыточности
    public function getBreakevenAttribute(): float
    {
        return (float) $this->short_strike
            - $this->credit_per_unit;
    }

    // Текущая стоимость спреда
    public function getCurrentSpreadValueAttribute(): float
    {
        $shortPrice = (float) (
            $this->short_current_price ?? $this->short_entry_price
        );

        $longPrice = (float) (
            $this->long_current_price ?? $this->long_entry_price
        );

        return $shortPrice - $longPrice;
    }

    // Плавающий результат всей позиции
    public function getUnrealizedPnlAttribute(): float
    {
        $currentValue = $this->current_spread_value
            * $this->quantity
            * (float) $this->contract_size;

        return $this->gross_credit
            - $currentValue
            - (float) $this->commission;
    }

    // Доходность на ГО, %
    public function getReturnOnMarginAttribute(): float
    {
        if ((float) $this->margin <= 0) {
            return 0;
        }

        return ($this->max_profit / (float) $this->margin) * 100;
    }
}


<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class PortfolioTax extends Model
{
    protected $fillable = [
        'name',
        'amount',
        'daily_rate',
        'is_active',
    ];

    protected function casts(): array
    {
        return [
            'amount' => 'decimal:2',
            'daily_rate' => 'decimal:6',
            'is_active' => 'boolean',
        ];
    }

    public function accruals(): HasMany
    {
        return $this->hasMany(PortfolioTaxAccrual::class);
    }
}

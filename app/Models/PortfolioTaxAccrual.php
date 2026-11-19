<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class PortfolioTaxAccrual extends Model
{
    protected $fillable = [
        'portfolio_tax_id',
        'accrual_date',
        'base_amount',
        'rate',
        'amount',
    ];

    protected function casts(): array
    {
        return [
            'accrual_date' => 'date',
            'base_amount' => 'decimal:2',
            'rate' => 'decimal:6',
            'amount' => 'decimal:2',
        ];
    }

    public function portfolioTax(): BelongsTo
    {
        return $this->belongsTo(PortfolioTax::class);
    }
}

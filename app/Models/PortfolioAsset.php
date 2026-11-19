<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PortfolioAsset extends Model
{
    protected $fillable = [
        'name',
        'ticker',
        'type',
        'target_percent',
        'current_value',
        'price_updated_at',
        'last_rebalanced_at',
    ];

    protected function casts(): array
    {
        return [
            'target_percent' => 'decimal:6',
            'current_value' => 'decimal:2',
            'price_updated_at' => 'date',
            'last_rebalanced_at' => 'date',
        ];
    }
}

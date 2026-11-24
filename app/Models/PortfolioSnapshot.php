<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PortfolioSnapshot extends Model
{
    protected $fillable = [
        'snapshot_date',
        'total_assets',
        'total_liabilities',
        'net_worth',
    ];

    protected $casts = [
        'snapshot_date' => 'date',
        'total_assets' => 'decimal:2',
        'total_liabilities' => 'decimal:2',
        'net_worth' => 'decimal:2',
    ];
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PortfolioLiability extends Model
{
    protected $fillable = [
        'name',
        'type',
        'current_amount',
        'interest_rate',
        'creditor',
        'due_date',
        'notes',
        'is_active',
    ];

    protected $casts = [
        'current_amount' => 'decimal:2',
        'interest_rate' => 'decimal:4',
        'due_date' => 'date',
        'is_active' => 'boolean',
    ];
}

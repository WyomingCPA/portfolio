<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PortfolioBasisPosition extends Model
{
    protected $fillable = [
        'ticker',
        'futures_ticker',
        'spot_quantity',
        'futures_quantity',
        'contract_size',
        'spot_entry_price',
        'futures_entry_price',
        'spot_current_price',
        'futures_current_price',
        'futures_expiry',
        'go_per_contract',
        'commission',
        'notes',
    ];

    protected $casts = [
        'spot_quantity' => 'decimal:4',
        'futures_quantity' => 'integer',
        'contract_size' => 'decimal:4',
        'spot_entry_price' => 'decimal:4',
        'futures_entry_price' => 'decimal:4',
        'spot_current_price' => 'decimal:4',
        'futures_current_price' => 'decimal:4',
        'futures_expiry' => 'date',
        'go_per_contract' => 'decimal:2',
        'commission' => 'decimal:4',
    ];

    public function getInitialBasisAttribute()
    {
        return $this->futures_entry_price - $this->spot_entry_price;
    }

    public function getCurrentBasisAttribute()
    {
        $spot = $this->spot_current_price ?? $this->spot_entry_price;
        $futures = $this->futures_current_price ?? $this->futures_entry_price;

        return $futures - $spot;
    }

    public function getUnrealizedPnlAttribute()
    {
        $spot = $this->spot_current_price ?? $this->spot_entry_price;
        $futures = $this->futures_current_price ?? $this->futures_entry_price;

        $spotPnl = ($spot - $this->spot_entry_price)
            * $this->spot_quantity;

        $futuresPnl = ($this->futures_entry_price - $futures)
            * $this->futures_quantity
            * $this->contract_size;

        return $spotPnl + $futuresPnl;
    }

    public function getTotalGoAttribute()
    {
        return $this->go_per_contract * $this->futures_quantity;
    }
}

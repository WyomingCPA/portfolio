<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\PortfolioTaxAccrual;

class PortfolioTaxAccrualController extends Controller
{
    public function index()
    {
        $accruals = PortfolioTaxAccrual::with('portfolioTax')
            ->orderByDesc('accrual_date')
            ->orderByDesc('id')
            ->paginate(30);

        return view('portfolio-tax-accruals.index', compact('accruals'));
    }
}

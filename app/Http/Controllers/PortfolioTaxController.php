<?php

namespace App\Http\Controllers;

use App\Models\PortfolioTax;
use Illuminate\Http\Request;

class PortfolioTaxController extends Controller
{
    public function index()
    {
        $taxes = PortfolioTax::withSum('accruals', 'amount')
            ->orderByDesc('id')
            ->get();

        $total = $taxes->sum('amount');

        return view('portfolio-taxes.index', compact(
            'taxes',
            'total'
        ));
    }

    public function create()
    {
        return view('portfolio-taxes.create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'amount' => 'required|numeric|min:0',
            'is_active' => 'nullable|boolean',
        ]);

        $validated['is_active'] = $request->boolean('is_active');

        // Ставка по умолчанию — 0,25% в день
        $validated['daily_rate'] = 0.0025;

        PortfolioTax::create($validated);

        return redirect()
            ->route('portfolio-taxes.index')
            ->with('success', 'Налоговая цель успешно создана.');
    }

    public function show(PortfolioTax $portfolioTax)
    {
        return redirect()->route('portfolio-taxes.edit', $portfolioTax);
    }

    public function edit(PortfolioTax $portfolioTax)
    {
        return view('portfolio-taxes.edit', compact('portfolioTax'));
    }

    public function update(Request $request, PortfolioTax $portfolioTax)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'amount' => 'required|numeric|min:0',
            'is_active' => 'nullable|boolean',
        ]);

        $validated['is_active'] = $request->boolean('is_active');

        $portfolioTax->update($validated);

        return redirect()
            ->route('portfolio-taxes.index')
            ->with('success', 'Налоговая цель успешно обновлена.');
    }

    public function destroy(PortfolioTax $portfolioTax)
    {
        $portfolioTax->delete();

        return redirect()
            ->route('portfolio-taxes.index')
            ->with('success', 'Налоговая цель удалена.');
    }
}

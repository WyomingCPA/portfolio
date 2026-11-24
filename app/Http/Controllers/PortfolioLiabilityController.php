<?php

namespace App\Http\Controllers;

use App\Models\PortfolioLiability;
use Illuminate\Http\Request;

class PortfolioLiabilityController extends Controller
{
    public function index()
    {
        $liabilities = PortfolioLiability::orderByDesc('is_active')
            ->orderByDesc('id')
            ->paginate(20);

        $totalAmount = PortfolioLiability::where('is_active', true)
            ->sum('current_amount');

        return view('portfolio-liabilities.index', compact(
            'liabilities',
            'totalAmount'
        ));
    }

    public function create()
    {
        return view('portfolio-liabilities.create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'type' => 'required|string|max:50',
            'current_amount' => 'required|numeric|min:0',
            'interest_rate' => 'nullable|numeric|min:0|max:100',
            'creditor' => 'nullable|string|max:255',
            'due_date' => 'nullable|date',
            'notes' => 'nullable|string',
            'is_active' => 'nullable|boolean',
        ]);

        $validated['is_active'] = $request->boolean('is_active');

        PortfolioLiability::create($validated);

        return redirect()
            ->route('portfolio-liabilities.index')
            ->with('success', 'Обязательство успешно добавлено.');
    }

    public function edit(PortfolioLiability $portfolioLiability)
    {
        return view('portfolio-liabilities.edit', compact(
            'portfolioLiability'
        ));
    }

    public function update(Request $request, PortfolioLiability $portfolioLiability)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'type' => 'required|string|max:50',
            'current_amount' => 'required|numeric|min:0',
            'interest_rate' => 'nullable|numeric|min:0|max:100',
            'creditor' => 'nullable|string|max:255',
            'due_date' => 'nullable|date',
            'notes' => 'nullable|string',
            'is_active' => 'nullable|boolean',
        ]);

        $validated['is_active'] = $request->boolean('is_active');

        $portfolioLiability->update($validated);

        return redirect()
            ->route('portfolio-liabilities.index')
            ->with('success', 'Обязательство обновлено.');
    }

    public function destroy(PortfolioLiability $portfolioLiability)
    {
        $portfolioLiability->delete();

        return redirect()
            ->route('portfolio-liabilities.index')
            ->with('success', 'Обязательство удалено.');
    }
}


<?php

namespace App\Http\Controllers;

use App\Models\PortfolioAsset;
use App\Models\PortfolioLiability;
use Illuminate\Http\Request;

use Illuminate\Validation\Rule;

class PortfolioAssetController extends Controller
{
    public function index()
    {
        $assets = PortfolioAsset::orderBy('id')->get();
        $totalAssets = PortfolioAsset::sum('current_value');
        $totalLiabilities = PortfolioLiability::where('is_active', true)->sum('current_amount');
        $netWorth = $totalAssets - $totalLiabilities;

        return view('portfolio.index', compact(
            'assets',
            'totalAssets',
            'totalLiabilities',
            'netWorth'
        ));
    }

    public function create()
    {
        return view('portfolio.create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'ticker' => ['nullable', 'string', 'max:255'],
            'type' => [
                'required',
                Rule::in([
                    'stock',
                    'bond',
                    'fund',
                    'deposit',
                    'crypto',
                    'cash',
                    'other',
                ]),
            ],
            'target_percent' => ['required', 'numeric', 'min:0', 'max:100'],
            'current_value' => ['required', 'numeric', 'min:0'],
            'price_updated_at' => ['nullable', 'date'],
            'last_rebalanced_at' => ['nullable', 'date'],
        ]);
        $validated['target_percent'] /= 100;
        PortfolioAsset::create($validated);

        return redirect()
            ->route('portfolio-assets.index')
            ->with('success', 'Актив успешно добавлен!');
    }

    public function show(PortfolioAsset $portfolioAsset)
    {
        return view('portfolio.show', compact('portfolioAsset'));
    }

    public function edit(PortfolioAsset $portfolioAsset)
    {
        return view('portfolio.edit', compact('portfolioAsset'));
    }

    public function update(Request $request, PortfolioAsset $portfolioAsset)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'ticker' => ['nullable', 'string', 'max:255'],
            'type' => [
                'required',
                Rule::in([
                    'stock',
                    'bond',
                    'fund',
                    'deposit',
                    'crypto',
                    'cash',
                    'other',
                ]),
            ],
            'target_percent' => ['required', 'numeric', 'min:0', 'max:100'],
            'current_value' => ['required', 'numeric', 'min:0'],
            'price_updated_at' => ['nullable', 'date'],
            'last_rebalanced_at' => ['nullable', 'date'],
        ]);

        $validated['target_percent'] /= 100;
        $portfolioAsset->update($validated);

        return redirect()
            ->route('portfolio-assets.index')
            ->with('success', 'Актив успешно обновлён!');
    }

    public function destroy(PortfolioAsset $portfolioAsset)
    {
        $portfolioAsset->delete();

        return redirect()
            ->route('portfolio-assets.index')
            ->with('success', 'Актив удалён!');
    }
}

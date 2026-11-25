<?php

namespace App\Http\Controllers;

use App\Models\PortfolioBasisPosition;
use Illuminate\Http\Request;

class PortfolioBasisPositionController extends Controller
{
    public function index()
    {
        $positions = PortfolioBasisPosition::latest()->get();

        $totalGo = $positions->sum(fn($p) => $p->total_go);
        $totalPnl = $positions->sum(fn($p) => $p->unrealized_pnl);

        return view('portfolio-basis.index', compact(
            'positions',
            'totalGo',
            'totalPnl'
        ));
    }

    public function create()
    {
        return view('portfolio-basis.create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'ticker' => 'required|string|max:20',
            'futures_ticker' => 'required|string|max:30',

            'spot_quantity' => 'required|numeric|gt:0',
            'futures_quantity' => 'required|integer|min:1',
            'contract_size' => 'required|numeric|gt:0',

            'spot_entry_price' => 'required|numeric|gt:0',
            'futures_entry_price' => 'required|numeric|gt:0',

            'spot_current_price' => 'nullable|numeric|gt:0',
            'futures_current_price' => 'nullable|numeric|gt:0',

            'futures_expiry' => 'nullable|date',

            'go_per_contract' => 'required|numeric|min:0',
            'commission' => 'required|numeric|min:0',

            'notes' => 'nullable|string',
        ]);

        PortfolioBasisPosition::create($validated);

        return redirect()
            ->route('portfolio-basis.index')
            ->with('success', 'Парная позиция добавлена.');
    }

    public function edit(PortfolioBasisPosition $position)
    {
        return view('portfolio-basis.edit', [
            'position' => $position
        ]);
    }

    public function update(Request $request, PortfolioBasisPosition $position)
    {
        $validated = $request->validate([
            'ticker' => 'required|string|max:20',
            'futures_ticker' => 'required|string|max:30',

            'spot_quantity' => 'required|numeric|gt:0',
            'futures_quantity' => 'required|integer|min:1',
            'contract_size' => 'required|numeric|gt:0',

            'spot_entry_price' => 'required|numeric|gt:0',
            'futures_entry_price' => 'required|numeric|gt:0',

            'spot_current_price' => 'nullable|numeric|gt:0',
            'futures_current_price' => 'nullable|numeric|gt:0',

            'futures_expiry' => 'nullable|date',

            'go_per_contract' => 'required|numeric|min:0',
            'commission' => 'required|numeric|min:0',

            'notes' => 'nullable|string',
        ]);

        $position->update($validated);

        return redirect()
            ->route('portfolio-basis.index')
            ->with('success', 'Парная позиция обновлена.');
    }

    public function destroy(PortfolioBasisPosition $position)
    {
        $position->delete();

        return redirect()
            ->route('portfolio-basis.index')
            ->with('success', 'Парная позиция удалена.');
    }
}


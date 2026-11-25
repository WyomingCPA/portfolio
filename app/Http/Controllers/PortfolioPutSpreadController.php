<?php

namespace App\Http\Controllers;

use App\Models\PortfolioPutSpread;
use Illuminate\Http\Request;

class PortfolioPutSpreadController extends Controller
{
    // Список открытых позиций
    public function index()
    {
        $positions = PortfolioPutSpread::latest()->get();

        $totalCredit = $positions->sum('gross_credit');
        $totalMaxProfit = $positions->sum('max_profit');
        $totalMaxLoss = $positions->sum('max_loss');
        $totalMargin = $positions->sum('margin');
        $totalPnl = $positions->sum('unrealized_pnl');

        return view('portfolio-put-spreads.index', compact(
            'positions',
            'totalCredit',
            'totalMaxProfit',
            'totalMaxLoss',
            'totalMargin',
            'totalPnl'
        ));
    }

    // Форма создания
    public function create()
    {
        return view('portfolio-put-spreads.create');
    }

    // Сохранение позиции
    public function store(Request $request)
    {
        $validated = $request->validate([
            'ticker' => 'required|string|max:20',
            'expiry' => 'required|date',

            'short_strike' => 'required|numeric|min:0.0001',
            'short_entry_price' => 'required|numeric|min:0.0001',
            'short_current_price' => 'nullable|numeric|min:0',

            'long_strike' => 'required|numeric|min:0.0001',
            'long_entry_price' => 'required|numeric|min:0.0001',
            'long_current_price' => 'nullable|numeric|min:0',

            'quantity' => 'required|integer|min:1',
            'contract_size' => 'required|numeric|min:0.0001',

            'commission' => 'required|numeric|min:0',
            'margin' => 'required|numeric|min:0',

            'notes' => 'nullable|string',
        ]);

        if ($validated['short_strike'] <= $validated['long_strike']) {
            return back()
                ->withErrors([
                    'short_strike' => 'Страйк проданного PUT должен быть выше страйка купленного PUT.',
                ])
                ->withInput();
        }

        if ($validated['short_entry_price'] <= $validated['long_entry_price']) {
            return back()
                ->withErrors([
                    'short_entry_price' => 'Полученная премия должна быть больше уплаченной премии.',
                ])
                ->withInput();
        }

        PortfolioPutSpread::create($validated);

        return redirect()
            ->route('portfolio-put-spreads.index')
            ->with('success', 'Bull Put Spread успешно добавлен!');
    }

    // Форма редактирования
    public function edit(PortfolioPutSpread $put_spread)
    {
        return view('portfolio-put-spreads.edit', [
            'position' => $put_spread,
        ]);
    }

    // Обновление позиции
    public function update(Request $request, PortfolioPutSpread $put_spread)
    {
        $validated = $request->validate([
            'ticker' => 'required|string|max:20',
            'expiry' => 'required|date',

            'short_strike' => 'required|numeric|min:0.0001',
            'short_entry_price' => 'required|numeric|min:0.0001',
            'short_current_price' => 'nullable|numeric|min:0',

            'long_strike' => 'required|numeric|min:0.0001',
            'long_entry_price' => 'required|numeric|min:0.0001',
            'long_current_price' => 'nullable|numeric|min:0',

            'quantity' => 'required|integer|min:1',
            'contract_size' => 'required|numeric|min:0.0001',

            'commission' => 'required|numeric|min:0',
            'margin' => 'required|numeric|min:0',

            'notes' => 'nullable|string',
        ]);

        if ($validated['short_strike'] <= $validated['long_strike']) {
            return back()
                ->withErrors([
                    'short_strike' => 'Страйк проданного PUT должен быть выше страйка купленного PUT.',
                ])
                ->withInput();
        }

        if ($validated['short_entry_price'] <= $validated['long_entry_price']) {
            return back()
                ->withErrors([
                    'short_entry_price' => 'Полученная премия должна быть больше уплаченной премии.',
                ])
                ->withInput();
        }

        $put_spread->update($validated);

        return redirect()
            ->route('portfolio-put-spreads.index')
            ->with('success', 'Bull Put Spread успешно обновлён!');
    }

    // Удаление позиции
    public function destroy(PortfolioPutSpread $put_spread)
    {
        $put_spread->delete();

        return redirect()
            ->route('portfolio-put-spreads.index')
            ->with('success', 'Позиция удалена!');
    }
}

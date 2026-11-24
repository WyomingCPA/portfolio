@extends('adminlte::page')

@section('title', 'Инвестиционный портфель')

@section('content_header')
<h1>Инвестиционный портфель</h1>
@stop

@section('content')

@php
$total = $assets->sum('current_value');
@endphp

<div class="card">
    <div class="card-header">
        <h3 class="card-title">Активы портфеля</h3>

        <div class="card-tools">
            <a href="{{ route('portfolio-assets.create') }}"
                class="btn btn-success btn-sm">
                <i class="fas fa-plus"></i> Добавить актив
            </a>
        </div>
    </div>

    <div class="card-body table-responsive p-0">
        <table class="table table-bordered table-hover text-nowrap">
            <thead>
                <tr>
                    <th>Актив</th>
                    <th>Тикер</th>
                    <th>Тип</th>
                    <th class="text-right">Цель %</th>
                    <th class="text-right">Текущая стоимость</th>
                    <th class="text-right">Факт %</th>
                    <th class="text-right">Отклонение %</th>
                    <th class="text-right">Купить / продать</th>
                    <th>Флаг ребалансировки</th>
                    <th>Дата обновления</th>
                    <th>Дней с ребаланса</th>
                    <th>Действия</th>
                </tr>
            </thead>

            <tbody>
                @forelse($assets as $asset)
                @php
                $fact = $total > 0
                ? ($asset->current_value / $total) * 100
                : 0;

                $target = $asset->target_percent * 100;

                $deviation = $fact - $target;

                $rebalance = ($total * $asset->target_percent)
                - $asset->current_value;

                $days = $asset->last_rebalanced_at
                ? (int) $asset->last_rebalanced_at->diffInDays(now())
                : null;

                $types = [
                'stock' => 'Акция',
                'bond' => 'Облигация',
                'fund' => 'Фонд',
                'deposit' => 'Депозит',
                'crypto' => 'Криптовалюта',
                'cash' => 'Деньги',
                'other' => 'Другое',
                ];
                @endphp

                <tr>
                    <td>{{ $asset->name }}</td>
                    <td>{{ $asset->ticker ?? '—' }}</td>
                    <td>{{ $types[$asset->type] ?? 'Другое' }}</td>

                    <td class="text-right">
                        {{ number_format($target, 2, ',', ' ') }}%
                    </td>

                    <td class="text-right">
                        {{ number_format($asset->current_value, 2, ',', ' ') }}
                    </td>

                    <td class="text-right">
                        {{ number_format($fact, 2, ',', ' ') }}%
                    </td>

                    <td class="text-right {{ $deviation > 0 ? 'text-success' : ($deviation < 0 ? 'text-danger' : '') }}">
                        {{ number_format($deviation, 2, ',', ' ') }}%
                    </td>

                    <td class="text-right {{ $rebalance > 0 ? 'text-success' : ($rebalance < 0 ? 'text-danger' : '') }}">
                        {{ number_format($rebalance, 2, ',', ' ') }}
                    </td>

                    <td>
                        —
                    </td>

                    <td>
                        {{ $asset->price_updated_at?->format('d.m.Y') ?? '—' }}
                    </td>

                    <td>
                        {{ $days !== null ? $days : '—' }}
                    </td>

                    <td>
                        <a href="{{ route('portfolio-assets.edit', $asset) }}"
                            class="btn btn-warning btn-xs">
                            <i class="fas fa-edit"></i>
                        </a>

                        <form action="{{ route('portfolio-assets.destroy', $asset) }}"
                            method="POST"
                            class="d-inline"
                            onsubmit="return confirm('Удалить актив?')">
                            @csrf
                            @method('DELETE')

                            <button type="submit"
                                class="btn btn-danger btn-xs">
                                <i class="fas fa-trash"></i>
                            </button>
                        </form>
                    </td>
                </tr>

                @empty
                <tr>
                    <td colspan="12" class="text-center text-muted p-4">
                        Активы пока не добавлены
                    </td>
                </tr>
                @endforelse
            </tbody>

            <tfoot>
                <tr class="bg-warning">
                    <th colspan="3">Итого</th>

                    <th class="text-right">
                        {{ number_format($assets->sum('target_percent') * 100, 2, ',', ' ') }}%
                    </th>

                    <th class="text-right">
                        {{ number_format($total, 2, ',', ' ') }}
                    </th>

                    <th class="text-right">
                        {{ $total > 0 ? '100,00%' : '0,00%' }}
                    </th>

                    <th colspan="6"></th>
                </tr>
            </tfoot>
        </table>
    </div>
</div>
<div class="row">

    {{-- Активы --}}
    <div class="col-md-4">
        <div class="small-box bg-success">
            <div class="inner">
                <h3>{{ number_format($totalAssets, 2, '.', ' ') }}</h3>
                <p>Всего активов</p>
            </div>
            <div class="icon">
                <i class="fas fa-wallet"></i>
            </div>
        </div>
    </div>

    {{-- Обязательства --}}
    <div class="col-md-4">
        <div class="small-box bg-danger">
            <div class="inner">
                <h3>{{ number_format($totalLiabilities, 2, '.', ' ') }}</h3>
                <p>Всего обязательств</p>
            </div>
            <div class="icon">
                <i class="fas fa-credit-card"></i>
            </div>
        </div>
    </div>

    {{-- Чистый капитал --}}
    <div class="col-md-4">
        <div class="small-box bg-info">
            <div class="inner">
                <h3>{{ number_format($netWorth, 2, '.', ' ') }}</h3>
                <p>Чистый капитал</p>
            </div>
            <div class="icon">
                <i class="fas fa-chart-line"></i>
            </div>
        </div>
    </div>

</div>

@stop

@extends('adminlte::page')

@section('title', 'Bull Put Spread')

@section('content_header')
    <h1>Bull Put Spread — открытые позиции</h1>
@stop

@section('content')

@if(session('success'))
    <div class="alert alert-success">
        {{ session('success') }}
    </div>
@endif

<div class="row">

    <div class="col-md-3">
        <div class="small-box bg-info">
            <div class="inner">
                <h3>{{ $positions->count() }}</h3>
                <p>Открытых спредов</p>
            </div>
            <div class="icon">
                <i class="fas fa-layer-group"></i>
            </div>
        </div>
    </div>

    <div class="col-md-3">
        <div class="small-box bg-success">
            <div class="inner">
                <h3>{{ number_format($totalCredit, 2, '.', ' ') }}</h3>
                <p>Полученный кредит</p>
            </div>
            <div class="icon">
                <i class="fas fa-coins"></i>
            </div>
        </div>
    </div>

    <div class="col-md-3">
        <div class="small-box bg-warning">
            <div class="inner">
                <h3>{{ number_format($totalMargin, 2, '.', ' ') }}</h3>
                <p>Общее ГО</p>
            </div>
            <div class="icon">
                <i class="fas fa-shield-alt"></i>
            </div>
        </div>
    </div>

    <div class="col-md-3">
        <div class="small-box {{ $totalPnl >= 0 ? 'bg-success' : 'bg-danger' }}">
            <div class="inner">
                <h3>{{ number_format($totalPnl, 2, '.', ' ') }}</h3>
                <p>Плавающий P&L</p>
            </div>
            <div class="icon">
                <i class="fas fa-chart-line"></i>
            </div>
        </div>
    </div>

</div>

<div class="row">

    <div class="col-md-6">
        <div class="info-box">
            <span class="info-box-icon bg-success">
                <i class="fas fa-arrow-up"></i>
            </span>
            <div class="info-box-content">
                <span class="info-box-text">Максимальная прибыль</span>
                <span class="info-box-number">
                    {{ number_format($totalMaxProfit, 2, '.', ' ') }}
                </span>
            </div>
        </div>
    </div>

    <div class="col-md-6">
        <div class="info-box">
            <span class="info-box-icon bg-danger">
                <i class="fas fa-arrow-down"></i>
            </span>
            <div class="info-box-content">
                <span class="info-box-text">Суммарный максимальный риск</span>
                <span class="info-box-number">
                    {{ number_format($totalMaxLoss, 2, '.', ' ') }}
                </span>
            </div>
        </div>
    </div>

</div>

<div class="card">

    <div class="card-header">
        <h3 class="card-title">Открытые Bull Put Spread</h3>

        <div class="card-tools">
            <a href="{{ route('portfolio-put-spreads.create') }}"
               class="btn btn-primary btn-sm">
                <i class="fas fa-plus"></i>
                Добавить спред
            </a>
        </div>
    </div>

    <div class="card-body table-responsive">

        <table class="table table-bordered table-hover">

            <thead>
                <tr>
                    <th>Актив</th>
                    <th>Экспирация</th>
                    <th>Проданный PUT</th>
                    <th>Купленный PUT</th>
                    <th>Чистый кредит</th>
                    <th>Макс. прибыль</th>
                    <th>Макс. убыток</th>
                    <th>Безубыточность</th>
                    <th>ГО</th>
                    <th>P&L</th>
                    <th>Действия</th>
                </tr>
            </thead>

            <tbody>

                @forelse($positions as $position)

                    <tr>
                        <td>
                            <strong>{{ $position->ticker }}</strong>
                            <br>
                            <small class="text-muted">
                                {{ $position->quantity }} спред.
                            </small>
                        </td>

                        <td>
                            {{ $position->expiry?->format('d.m.Y') }}
                        </td>

                        <td>
                            <strong>{{ number_format($position->short_strike, 2, '.', ' ') }}</strong>
                            <br>
                            <small class="text-muted">
                                Продажа: {{ number_format($position->short_entry_price, 2, '.', ' ') }}
                            </small>
                        </td>

                        <td>
                            <strong>{{ number_format($position->long_strike, 2, '.', ' ') }}</strong>
                            <br>
                            <small class="text-muted">
                                Покупка: {{ number_format($position->long_entry_price, 2, '.', ' ') }}
                            </small>
                        </td>

                        <td>
                            {{ number_format($position->gross_credit, 2, '.', ' ') }}
                        </td>

                        <td class="text-success">
                            <strong>
                                {{ number_format($position->max_profit, 2, '.', ' ') }}
                            </strong>
                        </td>

                        <td class="text-danger">
                            {{ number_format($position->max_loss, 2, '.', ' ') }}
                        </td>

                        <td>
                            {{ number_format($position->breakeven, 2, '.', ' ') }}
                        </td>

                        <td>
                            {{ number_format($position->margin, 2, '.', ' ') }}
                        </td>

                        <td class="{{ $position->unrealized_pnl >= 0 ? 'text-success' : 'text-danger' }}">
                            <strong>
                                {{ number_format($position->unrealized_pnl, 2, '.', ' ') }}
                            </strong>
                        </td>

                        <td class="text-nowrap">

                            <a href="{{ route('portfolio-put-spreads.edit', ['put_spread' => $position->id]) }}"
                               class="btn btn-warning btn-sm">
                                <i class="fas fa-edit"></i>
                            </a>

                            <form action="{{ route('portfolio-put-spreads.destroy', ['put_spread' => $position->id]) }}"
                                  method="POST"
                                  class="d-inline"
                                  onsubmit="return confirm('Удалить этот спред?')">

                                @csrf
                                @method('DELETE')

                                <button type="submit" class="btn btn-danger btn-sm">
                                    <i class="fas fa-trash"></i>
                                </button>

                            </form>

                        </td>
                    </tr>

                @empty

                    <tr>
                        <td colspan="11" class="text-center">
                            Открытых Bull Put Spread пока нет.
                        </td>
                    </tr>

                @endforelse

            </tbody>

        </table>

    </div>
</div>

@stop

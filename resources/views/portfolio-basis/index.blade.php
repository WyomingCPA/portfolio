@extends('adminlte::page')

@section('title', 'Базис')

@section('content_header')
    <h1>Базис — открытые позиции</h1>
@stop

@section('content')

@if(session('success'))
    <div class="alert alert-success">
        {{ session('success') }}
    </div>
@endif

<div class="row">

    <div class="col-md-4">
        <div class="small-box bg-info">
            <div class="inner">
                <h3>{{ number_format($positions->count()) }}</h3>
                <p>Открытых пар</p>
            </div>
            <div class="icon">
                <i class="fas fa-layer-group"></i>
            </div>
        </div>
    </div>

    <div class="col-md-4">
        <div class="small-box bg-warning">
            <div class="inner">
                <h3>{{ number_format($totalGo, 2, '.', ' ') }}</h3>
                <p>Общее ГО</p>
            </div>
            <div class="icon">
                <i class="fas fa-coins"></i>
            </div>
        </div>
    </div>

    <div class="col-md-4">
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

<div class="card">

    <div class="card-header">
        <h3 class="card-title">Парные позиции</h3>

        <div class="card-tools">
            <a href="{{ route('portfolio-basis.create') }}"
               class="btn btn-primary btn-sm">
                <i class="fas fa-plus"></i>
                Добавить позицию
            </a>
        </div>
    </div>

    <div class="card-body table-responsive">

        <table class="table table-bordered table-hover">

            <thead>
                <tr>
                    <th>Акция</th>
                    <th>Фьючерс</th>
                    <th>Базис входа</th>
                    <th>Текущий базис</th>
                    <th>Спот</th>
                    <th>Фьючерс</th>
                    <th>ГО</th>
                    <th>P&L</th>
                    <th>Экспирация</th>
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
                                {{ $position->spot_quantity }} шт.
                            </small>
                        </td>

                        <td>
                            {{ $position->futures_ticker }}
                            <br>
                            <small class="text-muted">
                                {{ $position->futures_quantity }} контр.
                            </small>
                        </td>

                        <td>
                            {{ number_format($position->initial_basis, 2, '.', ' ') }}
                        </td>

                        <td>
                            <strong>
                                {{ number_format($position->current_basis, 2, '.', ' ') }}
                            </strong>
                        </td>

                        <td>
                            {{ number_format($position->spot_current_price ?? $position->spot_entry_price, 2, '.', ' ') }}
                        </td>

                        <td>
                            {{ number_format($position->futures_current_price ?? $position->futures_entry_price, 2, '.', ' ') }}
                        </td>

                        <td>
                            {{ number_format($position->total_go, 2, '.', ' ') }}
                        </td>

                        <td class="{{ $position->unrealized_pnl >= 0 ? 'text-success' : 'text-danger' }}">
                            <strong>
                                {{ $position->unrealized_pnl > 0 ? '+' : '' }}{{ number_format($position->unrealized_pnl, 2, '.', ' ') }}
                            </strong>
                        </td>

                        <td>
                            {{ $position->futures_expiry?->format('d.m.Y') ?? '—' }}
                        </td>

                        <td class="text-nowrap">

                            <a href="{{ route('portfolio-basis.edit', $position) }}"
                               class="btn btn-warning btn-sm">
                                <i class="fas fa-edit"></i>
                            </a>

                            <form action="{{ route('portfolio-basis.destroy', $position) }}"
                                  method="POST"
                                  class="d-inline"
                                  onsubmit="return confirm('Удалить эту позицию?')">

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
                        <td colspan="10" class="text-center">
                            Открытых парных позиций пока нет.
                        </td>
                    </tr>

                @endforelse

            </tbody>

        </table>

    </div>
</div>

@stop
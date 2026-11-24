@extends('adminlte::page')

@section('title', 'Статистика портфеля')

@section('content_header')
    <h1>Статистика портфеля</h1>
@stop

@section('content')

@if($latest)

<div class="row">

    <div class="col-md-4">
        <div class="small-box bg-success">
            <div class="inner">
                <h3>{{ number_format($latest->total_assets, 2, '.', ' ') }}</h3>
                <p>Активы</p>
            </div>
            <div class="icon">
                <i class="fas fa-wallet"></i>
            </div>
        </div>
    </div>

    <div class="col-md-4">
        <div class="small-box bg-danger">
            <div class="inner">
                <h3>{{ number_format($latest->total_liabilities, 2, '.', ' ') }}</h3>
                <p>Обязательства</p>
            </div>
            <div class="icon">
                <i class="fas fa-credit-card"></i>
            </div>
        </div>
    </div>

    <div class="col-md-4">
        <div class="small-box bg-info">
            <div class="inner">
                <h3>{{ number_format($latest->net_worth, 2, '.', ' ') }}</h3>
                <p>Чистый капитал</p>
            </div>
            <div class="icon">
                <i class="fas fa-chart-line"></i>
            </div>
        </div>
    </div>

</div>

<div class="card">
    <div class="card-header">
        <h3 class="card-title">Изменения относительно предыдущего слепка</h3>
    </div>

    <div class="card-body">
        <p>
            Активы:
            <strong>
                {{ $assetsChange !== null ? number_format($assetsChange, 2, '.', ' ') : 'Нет данных' }}
            </strong>
        </p>

        <p>
            Обязательства:
            <strong>
                {{ $liabilitiesChange !== null ? number_format($liabilitiesChange, 2, '.', ' ') : 'Нет данных' }}
            </strong>
        </p>

        <p>
            Чистый капитал:
            <strong class="{{ ($netWorthChange ?? 0) >= 0 ? 'text-success' : 'text-danger' }}">
                {{ $netWorthChange !== null
                    ? ($netWorthChange > 0 ? '+' : '') . number_format($netWorthChange, 2, '.', ' ')
                    : 'Нет данных' }}
            </strong>
        </p>
    </div>
</div>

<div class="card">
    <div class="card-header">
        <h3 class="card-title">Динамика чистого капитала</h3>
    </div>

    <div class="card-body">
        <canvas id="netWorthChart" height="100"></canvas>
    </div>
</div>

<div class="card">
    <div class="card-header">
        <h3 class="card-title">История слепков</h3>
    </div>

    <div class="card-body table-responsive">
        <table class="table table-bordered table-hover">
            <thead>
                <tr>
                    <th>Дата</th>
                    <th>Активы</th>
                    <th>Обязательства</th>
                    <th>Чистый капитал</th>
                </tr>
            </thead>

            <tbody>
                @foreach($snapshots->sortByDesc('snapshot_date') as $snapshot)
                    <tr>
                        <td>{{ $snapshot->snapshot_date->format('d.m.Y') }}</td>
                        <td>{{ number_format($snapshot->total_assets, 2, '.', ' ') }}</td>
                        <td class="text-danger">
                            {{ number_format($snapshot->total_liabilities, 2, '.', ' ') }}
                        </td>
                        <td class="font-weight-bold">
                            {{ number_format($snapshot->net_worth, 2, '.', ' ') }}
                        </td>
                    </tr>
                @endforeach
            </tbody>
        </table>
    </div>
</div>

@else

<div class="alert alert-info">
    Пока нет сохранённых слепков. Запусти команду
    <code>php artisan portfolio:snapshot</code>.
</div>

@endif

@stop

@section('js')
@if($snapshots->isNotEmpty())
<script>
    const snapshotLabels = @json(
        $snapshots->map(fn($s) => $s->snapshot_date->format('d.m'))
    );

    const netWorthData = @json(
        $snapshots->pluck('net_worth')->map(fn($v) => (float) $v)
    );

    new Chart(document.getElementById('netWorthChart'), {
        type: 'line',
        data: {
            labels: snapshotLabels,
            datasets: [{
                label: 'Чистый капитал',
                data: netWorthData,
                borderWidth: 2,
                tension: 0.3,
                fill: false
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            scales: {
                y: {
                    beginAtZero: false
                }
            }
        }
    });
</script>
@endif
@stop
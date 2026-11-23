@extends('adminlte::page')

@section('title', 'Журнал начислений')

@section('content_header')
    <h1>Журнал начислений</h1>
@stop

@section('content')

<div class="card">
    <div class="card-header">
        <h3 class="card-title">История ежедневных начислений</h3>

        <div class="card-tools">
            <a href="{{ route('portfolio-taxes.index') }}"
               class="btn btn-secondary btn-sm">
                Назад к налоговым целям
            </a>
        </div>
    </div>

    <div class="card-body table-responsive p-0">
        <table class="table table-bordered table-hover">
            <thead>
                <tr>
                    <th>Дата</th>
                    <th>Налоговая цель</th>
                    <th class="text-right">База начисления</th>
                    <th class="text-right">Ставка</th>
                    <th class="text-right">Начислено</th>
                </tr>
            </thead>

            <tbody>
                @forelse($accruals as $accrual)
                    <tr>
                        <td>
                            {{ $accrual->accrual_date->format('d.m.Y') }}
                        </td>

                        <td>
                            {{ $accrual->portfolioTax?->name ?? 'Удалённая цель' }}
                        </td>

                        <td class="text-right">
                            {{ number_format($accrual->base_amount, 2, ',', ' ') }} ₽
                        </td>

                        <td class="text-right">
                            {{ number_format($accrual->rate * 100, 2, ',', ' ') }}%
                        </td>

                        <td class="text-right text-success">
                            +{{ number_format($accrual->amount, 2, ',', ' ') }} ₽
                        </td>
                    </tr>
                @empty
                    <tr>
                        <td colspan="5" class="text-center">
                            Начислений пока нет
                        </td>
                    </tr>
                @endforelse
            </tbody>
        </table>
    </div>

    <div class="card-footer">
        {{ $accruals->links() }}
    </div>
</div>

@stop
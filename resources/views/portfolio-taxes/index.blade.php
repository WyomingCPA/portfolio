
@extends('adminlte::page')

@section('title', 'Налоговые обязательства')

@section('content_header')
    <h1>Налоговые обязательства</h1>
@stop

@section('content')

<div class="row">
    <div class="col-md-4">
        <div class="small-box bg-info">
            <div class="inner">
                <h3>{{ number_format($total, 2, ',', ' ') }} ₽</h3>
                <p>Всего накоплено</p>
            </div>
            <div class="icon">
                <i class="fas fa-wallet"></i>
            </div>
        </div>
    </div>

    <div class="col-md-4">
        <div class="small-box bg-success">
            <div class="inner">
                <h3>{{ $taxes->where('is_active', true)->count() }}</h3>
                <p>Активных целей</p>
            </div>
            <div class="icon">
                <i class="fas fa-bullseye"></i>
            </div>
        </div>
    </div>
</div>

<div class="card">
    <div class="card-header">
        <h3 class="card-title">Мои цели</h3>

        <div class="card-tools">
            <a href="{{ route('portfolio-taxes.create') }}"
               class="btn btn-success btn-sm">
                <i class="fas fa-plus"></i> Добавить цель
            </a>
        </div>
    </div>

    <div class="card-body table-responsive p-0">
        <table class="table table-hover">
            <thead>
                <tr>
                    <th>Название цели</th>
                    <th>Накоплено</th>
                    <th>Ставка</th>
                    <th>Статус</th>
                    <th>Действия</th>
                </tr>
            </thead>

            <tbody>
                @forelse($taxes as $tax)
                    <tr>
                        <td>
                            <strong>{{ $tax->name }}</strong>
                        </td>

                        <td>
                            {{ number_format($tax->amount, 2, ',', ' ') }} ₽
                        </td>

                        <td>
                            {{ number_format($tax->daily_rate * 100, 2, ',', ' ') }}%
                        </td>

                        <td>
                            @if($tax->is_active)
                                <span class="badge badge-success">Активна</span>
                            @else
                                <span class="badge badge-secondary">Отключена</span>
                            @endif
                        </td>

                        <td>
                            <a href="{{ route('portfolio-taxes.edit', $tax) }}"
                               class="btn btn-warning btn-xs">
                                <i class="fas fa-edit"></i>
                            </a>

                            <form action="{{ route('portfolio-taxes.destroy', $tax) }}"
                                  method="POST"
                                  class="d-inline"
                                  onsubmit="return confirm('Удалить эту цель и историю начислений?')">
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
                        <td colspan="5" class="text-center text-muted p-4">
                            Пока нет налоговых целей.
                        </td>
                    </tr>
                @endforelse
            </tbody>

            <tfoot>
                <tr>
                    <th>Итого</th>
                    <th>{{ number_format($total, 2, ',', ' ') }} ₽</th>
                    <th colspan="3"></th>
                </tr>
            </tfoot>
        </table>
    </div>
</div>

@stop

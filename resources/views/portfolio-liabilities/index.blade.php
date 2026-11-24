
@extends('adminlte::page')

@section('title', 'Обязательства')

@section('content_header')
    <h1>Обязательства</h1>
@stop

@section('content')

<div class="mb-3">
    <a href="{{ route('portfolio-liabilities.create') }}"
       class="btn btn-primary">
        <i class="fas fa-plus"></i> Добавить обязательство
    </a>
</div>

<div class="row">
    <div class="col-md-4">
        <div class="small-box bg-danger">
            <div class="inner">
                <h3>{{ number_format($totalAmount, 2, '.', ' ') }}</h3>
                <p>Общая сумма обязательств</p>
            </div>
            <div class="icon">
                <i class="fas fa-hand-holding-usd"></i>
            </div>
        </div>
    </div>
</div>

@if(session('success'))
    <div class="alert alert-success">
        {{ session('success') }}
    </div>
@endif

<div class="card">
    <div class="card-header">
        <h3 class="card-title">Список обязательств</h3>
    </div>

    <div class="card-body table-responsive">
        <table class="table table-bordered table-hover">
            <thead>
                <tr>
                    <th>Название</th>
                    <th>Тип</th>
                    <th>Кредитор</th>
                    <th>Сумма</th>
                    <th>Ставка</th>
                    <th>Дата погашения</th>
                    <th>Статус</th>
                    <th>Действия</th>
                </tr>
            </thead>

            <tbody>
                @forelse($liabilities as $liability)
                    <tr>
                        <td>{{ $liability->name }}</td>

                        <td>{{ $liability->type }}</td>

                        <td>{{ $liability->creditor ?? '—' }}</td>

                        <td class="text-danger font-weight-bold">
                            {{ number_format($liability->current_amount, 2, '.', ' ') }}
                        </td>

                        <td>
                            {{ $liability->interest_rate !== null
                                ? $liability->interest_rate . '%'
                                : '—' }}
                        </td>

                        <td>
                            {{ $liability->due_date?->format('d.m.Y') ?? '—' }}
                        </td>

                        <td>
                            @if($liability->is_active)
                                <span class="badge badge-danger">Активен</span>
                            @else
                                <span class="badge badge-secondary">Закрыт</span>
                            @endif
                        </td>

                        <td class="text-nowrap">
                            <a href="{{ route('portfolio-liabilities.edit', $liability) }}"
                               class="btn btn-sm btn-warning">
                                <i class="fas fa-edit"></i>
                            </a>

                            <form action="{{ route('portfolio-liabilities.destroy', $liability) }}"
                                  method="POST"
                                  class="d-inline"
                                  onsubmit="return confirm('Удалить обязательство?')">
                                @csrf
                                @method('DELETE')

                                <button type="submit" class="btn btn-sm btn-danger">
                                    <i class="fas fa-trash"></i>
                                </button>
                            </form>
                        </td>
                    </tr>
                @empty
                    <tr>
                        <td colspan="8" class="text-center">
                            Обязательств пока нет.
                        </td>
                    </tr>
                @endforelse
            </tbody>
        </table>
    </div>

    <div class="card-footer">
        {{ $liabilities->links() }}
    </div>
</div>

@stop

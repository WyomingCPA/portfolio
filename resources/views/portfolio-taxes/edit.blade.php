
@extends('adminlte::page')

@section('title', 'Редактировать цель')

@section('content_header')
    <h1>Редактировать налоговую цель</h1>
@stop

@section('content')

<div class="card">
    <div class="card-body">

        <form action="{{ route('portfolio-taxes.update', $portfolioTax) }}"
              method="POST">
            @csrf
            @method('PUT')

            <div class="form-group">
                <label>Название цели</label>

                <input type="text"
                       name="name"
                       class="form-control"
                       value="{{ old('name', $portfolioTax->name) }}"
                       required>
            </div>

            <div class="form-group">
                <label>Накопленная сумма (₽)</label>

                <input type="number"
                       name="amount"
                       class="form-control"
                       value="{{ old('amount', $portfolioTax->amount) }}"
                       min="0"
                       step="0.01"
                       required>

                <small class="text-muted">
                    Можно вручную увеличить или уменьшить накопленную сумму.
                </small>
            </div>

            <div class="form-group">
                <label>Ежедневная ставка</label>

                <input type="text"
                       class="form-control"
                       value="{{ number_format($portfolioTax->daily_rate * 100, 2, ',', ' ') }}%"
                       disabled>
            </div>

            <div class="form-group">
                <div class="custom-control custom-checkbox">
                    <input type="checkbox"
                           name="is_active"
                           value="1"
                           class="custom-control-input"
                           id="is_active"
                           {{ $portfolioTax->is_active ? 'checked' : '' }}>

                    <label class="custom-control-label" for="is_active">
                        Активная цель
                    </label>
                </div>
            </div>

            <button type="submit" class="btn btn-success">
                Сохранить изменения
            </button>

            <a href="{{ route('portfolio-taxes.index') }}"
               class="btn btn-secondary">
                Назад
            </a>
        </form>

    </div>
</div>

@stop

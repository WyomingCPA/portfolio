
@extends('adminlte::page')

@section('title', 'Добавить налоговую цель')

@section('content_header')
    <h1>Добавить налоговую цель</h1>
@stop

@section('content')

<div class="card">
    <div class="card-body">

        <form action="{{ route('portfolio-taxes.store') }}" method="POST">
            @csrf

            <div class="form-group">
                <label>Название цели</label>

                <input type="text"
                       name="name"
                       class="form-control @error('name') is-invalid @enderror"
                       value="{{ old('name') }}"
                       placeholder="Например: Покупка автомобиля"
                       required>

                @error('name')
                    <div class="invalid-feedback">{{ $message }}</div>
                @enderror
            </div>

            <div class="form-group">
                <label>Начальная накопленная сумма (₽)</label>

                <input type="number"
                       name="amount"
                       class="form-control"
                       value="{{ old('amount', 0) }}"
                       min="0"
                       step="0.01"
                       required>
            </div>

            <div class="form-group">
                <label>Ежедневная ставка</label>

                <input type="text"
                       class="form-control"
                       value="0,1%"
                       disabled>

                <small class="text-muted">
                    0,1% от общей стоимости всех активов портфеля.
                </small>
            </div>

            <div class="form-group">
                <div class="custom-control custom-checkbox">
                    <input type="checkbox"
                           name="is_active"
                           value="1"
                           class="custom-control-input"
                           id="is_active"
                           checked>

                    <label class="custom-control-label" for="is_active">
                        Активная цель
                    </label>
                </div>
            </div>

            <button type="submit" class="btn btn-success">
                Сохранить
            </button>

            <a href="{{ route('portfolio-taxes.index') }}"
               class="btn btn-secondary">
                Отмена
            </a>
        </form>

    </div>
</div>

@stop

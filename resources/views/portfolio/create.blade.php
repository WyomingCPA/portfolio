@extends('adminlte::page')

@section('title', 'Добавить актив')

@section('content_header')
    <h1>Добавить актив</h1>
@stop

@section('content')

<div class="row">
    <div class="col-md-8">

        <div class="card card-primary">
            <div class="card-header">
                <h3 class="card-title">Информация об активе</h3>
            </div>

            <form action="{{ route('portfolio-assets.store') }}" method="POST">
                @csrf

                <div class="card-body">

                    <div class="form-group">
                        <label for="name">Название актива</label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            class="form-control @error('name') is-invalid @enderror"
                            value="{{ old('name') }}"
                            placeholder="Например: ОФЗ 26238"
                            required
                        >
                        @error('name')
                            <span class="invalid-feedback">{{ $message }}</span>
                        @enderror
                    </div>

                    <div class="form-group">
                        <label for="ticker">Тикер / ISIN</label>
                        <input
                            type="text"
                            name="ticker"
                            id="ticker"
                            class="form-control @error('ticker') is-invalid @enderror"
                            value="{{ old('ticker') }}"
                            placeholder="Например: RU000A1038V6"
                        >
                        @error('ticker')
                            <span class="invalid-feedback">{{ $message }}</span>
                        @enderror
                    </div>

                    <div class="form-group">
                        <label for="type">Тип актива</label>
                        <select
                            name="type"
                            id="type"
                            class="form-control @error('type') is-invalid @enderror"
                            required
                        >
                            <option value="">Выберите тип</option>
                            <option value="stock" @selected(old('type') == 'stock')>Акция</option>
                            <option value="bond" @selected(old('type') == 'bond')>Облигация</option>
                            <option value="fund" @selected(old('type') == 'fund')>Фонд</option>
                            <option value="deposit" @selected(old('type') == 'deposit')>Депозит</option>
                            <option value="crypto" @selected(old('type') == 'crypto')>Криптовалюта</option>
                            <option value="cash" @selected(old('type') == 'cash')>Денежные средства</option>
                            <option value="other" @selected(old('type') == 'other')>Другое</option>
                        </select>
                        @error('type')
                            <span class="invalid-feedback">{{ $message }}</span>
                        @enderror
                    </div>

                    <div class="row">
                        <div class="col-md-6">
                            <div class="form-group">
                                <label for="target_percent">Целевая доля (%)</label>
                                <div class="input-group">
                                    <input
                                        type="number"
                                        name="target_percent"
                                        id="target_percent"
                                        class="form-control @error('target_percent') is-invalid @enderror"
                                        value="{{ old('target_percent') !== null ? old('target_percent') * 100 : '' }}"
                                        min="0"
                                        max="100"
                                        step="0.01"
                                        placeholder="30"
                                        required
                                    >
                                    <div class="input-group-append">
                                        <span class="input-group-text">%</span>
                                    </div>
                                </div>
                                @error('target_percent')
                                    <span class="text-danger">{{ $message }}</span>
                                @enderror
                                <small class="text-muted">Например: 30 означает 30%</small>
                            </div>
                        </div>

                        <div class="col-md-6">
                            <div class="form-group">
                                <label for="current_value">Текущая стоимость</label>
                                <input
                                    type="number"
                                    name="current_value"
                                    id="current_value"
                                    class="form-control @error('current_value') is-invalid @enderror"
                                    value="{{ old('current_value', 0) }}"
                                    min="0"
                                    step="0.01"
                                    required
                                >
                                @error('current_value')
                                    <span class="invalid-feedback">{{ $message }}</span>
                                @enderror
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-md-6">
                            <div class="form-group">
                                <label for="price_updated_at">Дата обновления стоимости</label>
                                <input
                                    type="date"
                                    name="price_updated_at"
                                    id="price_updated_at"
                                    class="form-control"
                                    value="{{ old('price_updated_at', now()->format('Y-m-d')) }}"
                                >
                            </div>
                        </div>

                        <div class="col-md-6">
                            <div class="form-group">
                                <label for="last_rebalanced_at">Дата последнего ребаланса</label>
                                <input
                                    type="date"
                                    name="last_rebalanced_at"
                                    id="last_rebalanced_at"
                                    class="form-control"
                                    value="{{ old('last_rebalanced_at') }}"
                                >
                            </div>
                        </div>
                    </div>

                </div>

                <div class="card-footer">
                    <button type="submit" class="btn btn-success">
                        <i class="fas fa-save"></i> Сохранить актив
                    </button>

                    <a href="{{ route('portfolio-assets.index') }}"
                       class="btn btn-secondary">
                        Отмена
                    </a>
                </div>

            </form>
        </div>

    </div>
</div>

@stop
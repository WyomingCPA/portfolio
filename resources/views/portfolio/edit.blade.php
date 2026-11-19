@extends('adminlte::page')

@section('title', 'Редактировать актив')

@section('content_header')
    <h1>Редактировать актив</h1>
@stop

@section('content')

<div class="row">
    <div class="col-md-8">

        <div class="card card-warning">
            <div class="card-header">
                <h3 class="card-title">{{ $portfolioAsset->name }}</h3>
            </div>

            <form action="{{ route('portfolio-assets.update', $portfolioAsset) }}" method="POST">
                @csrf
                @method('PUT')

                <div class="card-body">

                    <div class="form-group">
                        <label>Название актива</label>
                        <input
                            type="text"
                            name="name"
                            class="form-control @error('name') is-invalid @enderror"
                            value="{{ old('name', $portfolioAsset->name) }}"
                            required
                        >
                        @error('name')
                            <span class="invalid-feedback">{{ $message }}</span>
                        @enderror
                    </div>

                    <div class="form-group">
                        <label>Тикер / ISIN</label>
                        <input
                            type="text"
                            name="ticker"
                            class="form-control @error('ticker') is-invalid @enderror"
                            value="{{ old('ticker', $portfolioAsset->ticker) }}"
                        >
                        @error('ticker')
                            <span class="invalid-feedback">{{ $message }}</span>
                        @enderror
                    </div>

                    <div class="form-group">
                        <label>Тип актива</label>
                        <select name="type" class="form-control" required>
                            @php
                                $types = [
                                    'stock' => 'Акция',
                                    'bond' => 'Облигация',
                                    'fund' => 'Фонд',
                                    'deposit' => 'Депозит',
                                    'crypto' => 'Криптовалюта',
                                    'cash' => 'Денежные средства',
                                    'other' => 'Другое',
                                ];
                            @endphp

                            @foreach($types as $key => $label)
                                <option value="{{ $key }}"
                                    @selected(old('type', $portfolioAsset->type) == $key)>
                                    {{ $label }}
                                </option>
                            @endforeach
                        </select>
                        @error('type')
                            <span class="text-danger">{{ $message }}</span>
                        @enderror
                    </div>

                    <div class="row">
                        <div class="col-md-6">
                            <div class="form-group">
                                <label>Целевая доля (%)</label>

                                <div class="input-group">
                                    <input
                                        type="number"
                                        name="target_percent"
                                        class="form-control @error('target_percent') is-invalid @enderror"
                                        value="{{ old('target_percent', $portfolioAsset->target_percent * 100) }}"
                                        min="0"
                                        max="100"
                                        step="0.01"
                                        required
                                    >

                                    <div class="input-group-append">
                                        <span class="input-group-text">%</span>
                                    </div>
                                </div>

                                @error('target_percent')
                                    <span class="text-danger">{{ $message }}</span>
                                @enderror
                            </div>
                        </div>

                        <div class="col-md-6">
                            <div class="form-group">
                                <label>Текущая стоимость</label>

                                <input
                                    type="number"
                                    name="current_value"
                                    class="form-control @error('current_value') is-invalid @enderror"
                                    value="{{ old('current_value', $portfolioAsset->current_value) }}"
                                    min="0"
                                    step="0.01"
                                    required
                                >

                                @error('current_value')
                                    <span class="text-danger">{{ $message }}</span>
                                @enderror
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-md-6">
                            <div class="form-group">
                                <label>Дата обновления стоимости</label>

                                <input
                                    type="date"
                                    name="price_updated_at"
                                    class="form-control"
                                    value="{{ old('price_updated_at', $portfolioAsset->price_updated_at?->format('Y-m-d')) }}"
                                >
                            </div>
                        </div>

                        <div class="col-md-6">
                            <div class="form-group">
                                <label>Дата последнего ребаланса</label>

                                <input
                                    type="date"
                                    name="last_rebalanced_at"
                                    class="form-control"
                                    value="{{ old('last_rebalanced_at', $portfolioAsset->last_rebalanced_at?->format('Y-m-d')) }}"
                                >
                            </div>
                        </div>
                    </div>

                </div>

                <div class="card-footer">
                    <button type="submit" class="btn btn-warning">
                        <i class="fas fa-save"></i> Сохранить изменения
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

@php
    $position = $position ?? null;
@endphp

@if($errors->any())
    <div class="alert alert-danger">
        <ul class="mb-0">
            @foreach($errors->all() as $error)
                <li>{{ $error }}</li>
            @endforeach
        </ul>
    </div>
@endif

<div class="card">
    <div class="card-header">
        <h3 class="card-title">Информация о паре</h3>
    </div>

    <div class="card-body">

        <div class="row">

            <div class="col-md-6">
                <label>Тикер акции</label>
                <input type="text" name="ticker"
                       class="form-control"
                       value="{{ old('ticker', $position?->ticker) }}"
                       placeholder="MGNT" required>
            </div>

            <div class="col-md-6">
                <label>Тикер фьючерса</label>
                <input type="text" name="futures_ticker"
                       class="form-control"
                       value="{{ old('futures_ticker', $position?->futures_ticker) }}"
                       placeholder="MGNT-12.26" required>
            </div>

        </div>

        <hr>

        <h5>Спотовая позиция — LONG</h5>

        <div class="row">

            <div class="col-md-4">
                <label>Количество акций</label>
                <input type="number" step="0.0001" min="0.0001"
                       name="spot_quantity" class="form-control"
                       value="{{ old('spot_quantity', $position?->spot_quantity) }}"
                       required>
            </div>

            <div class="col-md-4">
                <label>Цена покупки</label>
                <input type="number" step="0.0001" min="0.0001"
                       name="spot_entry_price" class="form-control"
                       value="{{ old('spot_entry_price', $position?->spot_entry_price) }}"
                       required>
            </div>

            <div class="col-md-4">
                <label>Текущая цена</label>
                <input type="number" step="0.0001" min="0.0001"
                       name="spot_current_price" class="form-control"
                       value="{{ old('spot_current_price', $position?->spot_current_price) }}">
            </div>

        </div>

        <hr>

        <h5>Фьючерсная позиция — SHORT</h5>

        <div class="row">

            <div class="col-md-3">
                <label>Количество контрактов</label>
                <input type="number" min="1"
                       name="futures_quantity" class="form-control"
                       value="{{ old('futures_quantity', $position?->futures_quantity ?? 1) }}"
                       required>
            </div>

            <div class="col-md-3">
                <label>Размер контракта</label>
                <input type="number" step="0.0001" min="0.0001"
                       name="contract_size" class="form-control"
                       value="{{ old('contract_size', $position?->contract_size ?? 1) }}"
                       required>
            </div>

            <div class="col-md-3">
                <label>Цена продажи</label>
                <input type="number" step="0.0001" min="0.0001"
                       name="futures_entry_price" class="form-control"
                       value="{{ old('futures_entry_price', $position?->futures_entry_price) }}"
                       required>
            </div>

            <div class="col-md-3">
                <label>Текущая цена</label>
                <input type="number" step="0.0001" min="0.0001"
                       name="futures_current_price" class="form-control"
                       value="{{ old('futures_current_price', $position?->futures_current_price) }}">
            </div>

        </div>

        <hr>

        <h5>Дополнительные параметры</h5>

        <div class="row">

            <div class="col-md-4">
                <label>Дата экспирации</label>
                <input type="date" name="futures_expiry"
                       class="form-control"
                       value="{{ old('futures_expiry', $position?->futures_expiry?->format('Y-m-d')) }}">
            </div>

            <div class="col-md-4">
                <label>ГО на один контракт</label>
                <input type="number" step="0.01" min="0"
                       name="go_per_contract" class="form-control"
                       value="{{ old('go_per_contract', $position?->go_per_contract ?? 0) }}"
                       required>
            </div>

            <div class="col-md-4">
                <label>Комиссия, %</label>
                <input type="number" step="0.0001" min="0"
                       name="commission" class="form-control"
                       value="{{ old('commission', $position?->commission ?? 0) }}"
                       required>
            </div>

        </div>

        <div class="form-group mt-3">
            <label>Комментарий</label>
            <textarea name="notes" class="form-control"
                      rows="3">{{ old('notes', $position?->notes) }}</textarea>
        </div>

    </div>

    <div class="card-footer">
        <button type="submit" class="btn btn-success">
            <i class="fas fa-save"></i>
            Сохранить
        </button>

        <a href="{{ route('portfolio-basis.index') }}"
           class="btn btn-secondary">
            Назад
        </a>
    </div>
</div>

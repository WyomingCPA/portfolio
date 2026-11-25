
<div class="row">
    <div class="col-md-6">
        <div class="form-group">
            <label>Тикер базового актива</label>
            <input type="text" name="ticker" class="form-control"
                   value="{{ old('ticker', $position->ticker ?? '') }}"
                   placeholder="Например, SBER" required>
            @error('ticker') <span class="text-danger">{{ $message }}</span> @enderror
        </div>
    </div>

    <div class="col-md-6">
        <div class="form-group">
            <label>Дата экспирации</label>
            <input type="date" name="expiry" class="form-control"
                   value="{{ old('expiry', isset($position) ? $position->expiry->format('Y-m-d') : '') }}"
                   required>
            @error('expiry') <span class="text-danger">{{ $message }}</span> @enderror
        </div>
    </div>
</div>

<hr>
<h5>Проданный PUT (Short)</h5>

<div class="row">
    <div class="col-md-4">
        <label>Страйк</label>
        <input type="number" step="0.0001" min="0" name="short_strike"
               class="form-control"
               value="{{ old('short_strike', $position->short_strike ?? '') }}" required>
        @error('short_strike') <span class="text-danger">{{ $message }}</span> @enderror
    </div>

    <div class="col-md-4">
        <label>Цена продажи</label>
        <input type="number" step="0.0001" min="0" name="short_entry_price"
               class="form-control"
               value="{{ old('short_entry_price', $position->short_entry_price ?? '') }}" required>
        @error('short_entry_price') <span class="text-danger">{{ $message }}</span> @enderror
    </div>

    <div class="col-md-4">
        <label>Текущая цена</label>
        <input type="number" step="0.0001" min="0" name="short_current_price"
               class="form-control"
               value="{{ old('short_current_price', $position->short_current_price ?? '') }}">
        @error('short_current_price') <span class="text-danger">{{ $message }}</span> @enderror
    </div>
</div>

<hr>
<h5>Купленный PUT (Long)</h5>

<div class="row">
    <div class="col-md-4">
        <label>Страйк</label>
        <input type="number" step="0.0001" min="0" name="long_strike"
               class="form-control"
               value="{{ old('long_strike', $position->long_strike ?? '') }}" required>
        @error('long_strike') <span class="text-danger">{{ $message }}</span> @enderror
    </div>

    <div class="col-md-4">
        <label>Цена покупки</label>
        <input type="number" step="0.0001" min="0" name="long_entry_price"
               class="form-control"
               value="{{ old('long_entry_price', $position->long_entry_price ?? '') }}" required>
        @error('long_entry_price') <span class="text-danger">{{ $message }}</span> @enderror
    </div>

    <div class="col-md-4">
        <label>Текущая цена</label>
        <input type="number" step="0.0001" min="0" name="long_current_price"
               class="form-control"
               value="{{ old('long_current_price', $position->long_current_price ?? '') }}">
        @error('long_current_price') <span class="text-danger">{{ $message }}</span> @enderror
    </div>
</div>

<hr>
<h5>Параметры позиции</h5>

<div class="row">
    <div class="col-md-3">
        <label>Количество спредов</label>
        <input type="number" min="1" name="quantity" class="form-control"
               value="{{ old('quantity', $position->quantity ?? 1) }}" required>
        @error('quantity') <span class="text-danger">{{ $message }}</span> @enderror
    </div>

    <div class="col-md-3">
        <label>Множитель контракта</label>
        <input type="number" step="0.0001" min="0.0001" name="contract_size"
               class="form-control"
               value="{{ old('contract_size', $position->contract_size ?? 1) }}" required>
        @error('contract_size') <span class="text-danger">{{ $message }}</span> @enderror
    </div>

    <div class="col-md-3">
        <label>Комиссия</label>
        <input type="number" step="0.01" min="0" name="commission"
               class="form-control"
               value="{{ old('commission', $position->commission ?? 0) }}">
        @error('commission') <span class="text-danger">{{ $message }}</span> @enderror
    </div>

    <div class="col-md-3">
        <label>ГО / Маржа</label>
        <input type="number" step="0.01" min="0" name="margin"
               class="form-control"
               value="{{ old('margin', $position->margin ?? 0) }}">
        @error('margin') <span class="text-danger">{{ $message }}</span> @enderror
    </div>
</div>

<div class="form-group mt-3">
    <label>Заметки</label>
    <textarea name="notes" class="form-control" rows="3">{{ old('notes', $position->notes ?? '') }}</textarea>
    @error('notes') <span class="text-danger">{{ $message }}</span> @enderror
</div>

<div class="mt-3">
    <button type="submit" class="btn btn-primary">Сохранить</button>
    <a href="{{ route('portfolio-put-spreads.index') }}" class="btn btn-secondary">Отмена</a>
</div>

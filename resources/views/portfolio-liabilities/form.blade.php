
<div class="form-group">
    <label>Название обязательства</label>
    <input type="text"
           name="name"
           class="form-control @error('name') is-invalid @enderror"
           value="{{ old('name', $portfolioLiability->name ?? '') }}"
           required>
    @error('name')
        <div class="invalid-feedback">{{ $message }}</div>
    @enderror
</div>

<div class="form-group">
    <label>Тип</label>
    <select name="type" class="form-control" required>
        @php
            $types = [
                'credit' => 'Кредит',
                'crypto_loan' => 'Криптозайм',
                'personal' => 'Личный долг',
                'mortgage' => 'Ипотека',
                'tax' => 'Налоговая задолженность',
                'other' => 'Другое',
            ];

            $selectedType = old('type', $portfolioLiability->type ?? 'other');
        @endphp

        @foreach($types as $value => $label)
            <option value="{{ $value }}"
                {{ $selectedType == $value ? 'selected' : '' }}>
                {{ $label }}
            </option>
        @endforeach
    </select>
</div>

<div class="form-group">
    <label>Текущая сумма долга</label>
    <input type="number"
           name="current_amount"
           step="0.01"
           min="0"
           class="form-control"
           value="{{ old('current_amount', $portfolioLiability->current_amount ?? 0) }}"
           required>
</div>

<div class="form-group">
    <label>Процентная ставка годовых (%)</label>
    <input type="number"
           name="interest_rate"
           step="0.0001"
           min="0"
           max="100"
           class="form-control"
           value="{{ old('interest_rate', $portfolioLiability->interest_rate ?? '') }}">
</div>

<div class="form-group">
    <label>Кому должен / Кредитор</label>
    <input type="text"
           name="creditor"
           class="form-control"
           value="{{ old('creditor', $portfolioLiability->creditor ?? '') }}">
</div>

<div class="form-group">
    <label>Дата погашения</label>
    <input type="date"
           name="due_date"
           class="form-control"
           value="{{ old('due_date', isset($portfolioLiability) ? $portfolioLiability->due_date?->format('Y-m-d') : '') }}">
</div>

<div class="form-group">
    <label>Примечание</label>
    <textarea name="notes"
              class="form-control"
              rows="3">{{ old('notes', $portfolioLiability->notes ?? '') }}</textarea>
</div>

<div class="form-group">
    <div class="custom-control custom-checkbox">
        <input type="checkbox"
               name="is_active"
               value="1"
               class="custom-control-input"
               id="is_active"
               {{ old('is_active', $portfolioLiability->is_active ?? true) ? 'checked' : '' }}>

        <label class="custom-control-label" for="is_active">
            Обязательство активно
        </label>
    </div>
</div>


@extends('adminlte::page')

@section('title', 'Редактировать обязательство')

@section('content_header')
    <h1>Редактировать обязательство</h1>
@stop

@section('content')

<div class="card">
    <div class="card-body">

        <form action="{{ route('portfolio-liabilities.update', $portfolioLiability) }}"
              method="POST">
            @csrf
            @method('PUT')

            @include('portfolio-liabilities.form')

            <button type="submit" class="btn btn-primary">
                Сохранить изменения
            </button>

            <a href="{{ route('portfolio-liabilities.index') }}"
               class="btn btn-secondary">
                Назад
            </a>
        </form>

    </div>
</div>

@stop

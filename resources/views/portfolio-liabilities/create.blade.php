
@extends('adminlte::page')

@section('title', 'Добавить обязательство')

@section('content_header')
    <h1>Добавить обязательство</h1>
@stop

@section('content')

<div class="card">
    <div class="card-body">

        <form action="{{ route('portfolio-liabilities.store') }}" method="POST">
            @csrf

            @include('portfolio-liabilities.form')

            <button type="submit" class="btn btn-primary">
                Сохранить
            </button>

            <a href="{{ route('portfolio-liabilities.index') }}"
               class="btn btn-secondary">
                Назад
            </a>
        </form>

    </div>
</div>

@stop

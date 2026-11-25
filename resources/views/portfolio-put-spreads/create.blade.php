
@extends('adminlte::page')

@section('title', 'Добавить Bull Put Spread')

@section('content_header')
    <h1>Добавить Bull Put Spread</h1>
@stop

@section('content')
    <div class="card">
        <div class="card-body">
            <form action="{{ route('portfolio-put-spreads.store') }}" method="POST">
                @csrf
                @include('portfolio-put-spreads.form')
            </form>
        </div>
    </div>
@stop

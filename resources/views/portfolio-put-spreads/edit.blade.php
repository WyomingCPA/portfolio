
@extends('adminlte::page')

@section('title', 'Редактировать Bull Put Spread')

@section('content_header')
    <h1>Редактировать Bull Put Spread: {{ $position->ticker }}</h1>
@stop

@section('content')
    <div class="card">
        <div class="card-body">
            <form action="{{ route('portfolio-put-spreads.update', ['put_spread' => $position->id]) }}"
                  method="POST">
                @csrf
                @method('PUT')

                @include('portfolio-put-spreads.form')
            </form>
        </div>
    </div>
@stop

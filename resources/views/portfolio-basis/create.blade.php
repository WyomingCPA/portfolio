
@extends('adminlte::page')

@section('title', 'Добавить пару')

@section('content_header')
    <h1>Добавить парную позицию</h1>
@stop

@section('content')

<form action="{{ route('portfolio-basis.store') }}" method="POST">
    @csrf

    @include('portfolio-basis.forms')

</form>

@stop

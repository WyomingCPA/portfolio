@extends('adminlte::page')

@section('title', 'Редактировать пару')

@section('content_header')
    <h1>Редактировать парную позицию</h1>
@stop

@section('content')

<form action="{{ route('portfolio-basis.update', ['position' => $position]) }}" method="POST">
    @csrf
    @method('PUT')

    @include('portfolio-basis.forms', ['position' => $position])

</form>

@stop

<?php

use Illuminate\Support\Facades\Schedule;

Schedule::command('portfolio:accrue-taxes')
    ->dailyAt('23:59')
    ->withoutOverlapping();

Schedule::command('portfolio:snapshot')
    ->dailyAt('23:59')
    ->withoutOverlapping();
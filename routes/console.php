
<?php

use Illuminate\Support\Facades\Schedule;

Schedule::command('portfolio:accrue-taxes')
    ->dailyAt('23:59')
    ->withoutOverlapping();


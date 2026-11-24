<?php

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\PortfolioAssetController;
use App\Http\Controllers\PortfolioTaxController;
use App\Http\Controllers\PortfolioLiabilityController;

Route::get('/', function () {
    return view('welcome');
});

Auth::routes();

Route::group(['prefix' => 'dashboard', 'middleware' => 'auth:sanctum'], function () {
    Route::get('', [DashboardController::class, 'index'])->name('main');
    Route::resource('portfolio-assets', PortfolioAssetController::class);
    Route::resource('portfolio-taxes', PortfolioTaxController::class);
    Route::get('/portfolio-tax-accruals', [\App\Http\Controllers\PortfolioTaxAccrualController::class, 'index'])->name('portfolio-tax-accruals.index');
    Route::resource('portfolio-liabilities', PortfolioLiabilityController::class);
});

Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');

<?php

use App\Http\Controllers\productsController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
    Route::get('/products', [productsController::class, 'index'])->name('products.index');
    Route::post('/product/store', [productsController::class, 'store'])->name('products.store');
    Route::get('/products/create', [productsController::class, 'create'])->name('products.create');
    Route::delete('/product/{product}', [productsController::class, 'destroy'])->name('products.destroy');
    Route::get('/products/{product}/edit', [productsController::class, 'edit'])->name('products.edit');
    Route::put('/product/{product}', [productsController::class, 'update'])->name('products.update');
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';

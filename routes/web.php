<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\AuthController;

Route::get('/', [AuthController::class, 'showLogin'])->name('login');
Route::post('/login', [AuthController::class, 'login'])->name('login.post');

Route::middleware('auth')->group(function () {
    Route::get('/dashboard', [AuthController::class, 'dashboard'])->name('dashboard');
      Route::get('/bagian', [AuthController::class, 'bagian'])->name('bagian');
         Route::get('/level', [AuthController::class, 'level'])->name('level');
    Route::post('/logout', [AuthController::class, 'logout'])->name('logout');
});
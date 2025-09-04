<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\AuthController;

Route::get('/', [AuthController::class, 'showLogin'])->name('login');
Route::get('/login', [AuthController::class, 'showLogin'])->name('login.get');
Route::post('/login', [AuthController::class, 'login'])->name('login.post');

Route::get('/register', [AuthController::class, 'showRegister'])->name('register');
Route::post('/register', [AuthController::class, 'register'])->name('register.post');

Route::middleware('auth')->group(function () {
    Route::get('/dashboard', [AuthController::class, 'dashboard'])->name('dashboard');
    Route::get('/bagian', [AuthController::class, 'bagian'])->name('bagian');
    Route::get('/level', [AuthController::class, 'level'])->name('level');
    Route::get('/statuses', [AuthController::class, 'statuses'])->name('statuses');
    Route::get('/users', [AuthController::class, 'users'])->name('users');
    Route::get('/users-profile', [AuthController::class, 'usersProfile'])->name('users-profile');
    Route::get('/proyek', [AuthController::class, 'proyek'])->name('proyek');
    Route::get('/proyek-user', [AuthController::class, 'proyekUser'])->name('proyek-user');

    // File upload endpoints (session-authenticated)
    Route::post('/user-profile', [AuthController::class, 'storeUserProfile'])->name('user-profile.store');
    Route::put('/user-profile/{id}', [AuthController::class, 'updateUserProfile'])->name('user-profile.update');

    Route::post('/logout', [AuthController::class, 'logout'])->name('logout');
});

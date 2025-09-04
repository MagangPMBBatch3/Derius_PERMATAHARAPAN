<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\AuthController;

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/user-profile', [AuthController::class, 'storeUserProfile']);
    Route::post('/user-profile/{id}', [AuthController::class, 'updateUserProfile']);
}); 
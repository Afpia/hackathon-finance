<?php

use App\Http\Controllers\FinanceController;
use App\Http\Controllers\ProfileController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/register', [RegisteredUserController::class, 'store'])->middleware('guest');
Route::post('/login', [AuthenticatedSessionController::class, 'store'])->middleware('guest');
Route::post('/logout', [AuthenticatedSessionController::class, 'destroy'])->middleware('auth:sanctum');

Route::get('/profile', [ProfileController::class, 'show'])->middleware('auth:sanctum');;
// Route::put('/profile', [ProfileController::class, 'update']);
// Route::delete('/profile', [ProfileController::class, 'destroy']);

Route::get('/finance', [FinanceController::class, 'index']);
Route::get('/finance/{id}', [FinanceController::class, 'show']);
Route::post('/finance', [FinanceController::class, 'store']);
Route::put('/finance/{id}', [FinanceController::class, 'update']);
Route::delete('/finance/{id}', [FinanceController::class, 'destroy']);


<?php

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\DebtsController;
use App\Http\Controllers\FinanceController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\GoalController;
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

Route::post('/register', [RegisteredUserController::class, 'store']);
Route::post('/login', [AuthenticatedSessionController::class, 'store'])->middleware('guest');
Route::post('/logout', [AuthenticatedSessionController::class, 'destroy'])->middleware('auth:sanctum');

Route::get('/profile', [ProfileController::class, 'show'])->middleware('auth:sanctum');
// Route::put('/profile', [ProfileController::class, 'update']);
// Route::delete('/profile', [ProfileController::class, 'destroy']);

Route::get('/finance', [FinanceController::class, 'index'])->middleware('auth:sanctum');
Route::get('/finance/{id}', [FinanceController::class, 'show'])->middleware('auth:sanctum');
Route::post('/finance', [FinanceController::class, 'store'])->middleware('auth:sanctum');
Route::put('/finance/{id}', [FinanceController::class, 'update'])->middleware('auth:sanctum');
Route::delete('/finance/{id}', [FinanceController::class, 'destroy'])->middleware('auth:sanctum');

//Route::get('/finance/statistics/{id}', [FinanceController::class, 'statistics']); //python
//Route::get('/finance/category', [FinanceController::class, 'expenseORincome']);


Route::get('/goal', [GoalController::class, 'index'])->middleware('auth:sanctum');
Route::post('/goals', [GoalController::class, 'store'])->middleware('auth:sanctum');
Route::patch('/goals/{id}', [GoalController::class, 'update'])->middleware('auth:sanctum');

Route::post('/debts', [DebtsController::class, 'store'])->middleware('auth:sanctum');
Route::get('/debts', [DebtsController::class, 'index'])->middleware('auth:sanctum');
<?php

use App\Http\Controllers\AnalyticsController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\CategoriesController;
use App\Http\Controllers\DebtsController;
use App\Http\Controllers\FinanceController;
use App\Http\Controllers\GoalController;
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

Route::post('/register', [RegisteredUserController::class, 'store']);
Route::post('/login', [AuthenticatedSessionController::class, 'store'])->middleware('guest');

Route::middleware('auth:sanctum')->group(function () {

    Route::post('/logout', [AuthenticatedSessionController::class, 'destroy']);

    Route::get('/profile', [ProfileController::class, 'show']);
    // Route::put('/profile', [ProfileController::class, 'update']);
    // Route::delete('/profile', [ProfileController::class, 'destroy']);

    Route::get('/finance', [FinanceController::class, 'index']);
    Route::get('/finance/{id}', [FinanceController::class, 'show']);
    Route::post('/finance', [FinanceController::class, 'store']);
    Route::put('/finance/{id}', [FinanceController::class, 'update']);
    Route::delete('/finance/{id}', [FinanceController::class, 'destroy']);
    Route::get('/finance/analytic/year', [FinanceController::class, 'yearlyAnalytics']);

    Route::get('/analytics', [AnalyticsController::class, 'index']);

    Route::get('/categories', [CategoriesController::class, 'index']);
    Route::get('/categories/analytic', [CategoriesController::class, 'analytic']);

    Route::get('/categories/{id}', [CategoriesController::class, 'show']);

    //Route::get('/finance/statistics/{id}', [FinanceController::class, 'statistics']); //python
    //Route::get('/finance/category', [FinanceController::class, 'expenseORincome']);

});
Route::get('/goal', [GoalController::class, 'index'])->middleware('auth:sanctum');
Route::post('/goals', [GoalController::class, 'store'])->middleware('auth:sanctum');
Route::patch('/goals/{id}', [GoalController::class, 'update'])->middleware('auth:sanctum');
Route::delete('/goals/{id}', [GoalController::class, 'destroy'])->middleware('auth:sanctum');

Route::post('/debts', [DebtsController::class, 'store'])->middleware('auth:sanctum');
Route::get('/debts', [DebtsController::class, 'index'])->middleware('auth:sanctum');

Route::put('/debts/{id}', [DebtsController::class, 'update'])->middleware('auth:sanctum');
Route::delete('/debts/{id}', [DebtsController::class, 'destroy'])->middleware('auth:sanctum');


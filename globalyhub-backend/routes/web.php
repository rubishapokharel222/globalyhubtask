<?php

use App\Http\Controllers\Frontend\ClientsController;
use Illuminate\Support\Facades\Route;

// Route::get('/', function () {
//     return view('welcome');
// });
Route::get('/api/csrf-token', function () {
    return response()->json(['success' => true, 'message' => 'CSRF token fetched successfully', 'data' => ['csrf_token' => csrf_token()]]);
});


Route::prefix('api')->group(function () {
    Route::get('/clients', [ClientsController::class, 'index']);
    Route::post('/clients', [ClientsController::class, 'store']);
    Route::get('/clients/{id}', [ClientsController::class, 'show']);
    Route::put('/clients/{id}', [ClientsController::class, 'update']);
    Route::delete('/clients/{id}', [ClientsController::class, 'destroy']);
});



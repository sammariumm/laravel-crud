<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\TaskApiController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('/save-task', [TaskApiController::class, 'saveTask']);

Route::get('/get-tasks', [TaskApiController::class, 'getAllTasks']);

Route::put('/done/{id}', [TaskApiController::class, 'markAsDone']);
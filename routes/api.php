<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\TaskApiController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

// TASK-RELATED ROUTES

// POST /api/save-task
Route::post('/save-task', [TaskApiController::class, 'saveTask']);

// GET /api/get-tasks
Route::get('/get-tasks', [TaskApiController::class, 'getAllTasks']);

// PUT /api/done/{id}
Route::put('/done/{id}', [TaskApiController::class, 'markAsDone']);

// DELETE /api/delete/{id}
Route::delete('/delete/{id}', [TaskApiController::class, 'deleteTask']);

// PUT /api/edit/{id}
Route::put('/edit/{id}', [TaskApiController::class, 'editTask']);


// SUBJECT-RELATED ROUTES

// GET /api/subjects
Route::get('/subjects', [TaskApiController::class, 'getSubjects']);

// POST /api/save-subject
Route::post('/save-subject', [TaskApiController::class, 'saveSubject']);
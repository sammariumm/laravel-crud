<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class TaskApiController extends Controller
{
    protected $todoModel;

    public function saveTask(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:25',
            'description' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors(),
            ], 422);
        }

        $task = Task::create([
            'title' => $request->title,
            'description' => $request->description,
        ]);

        return response()->json([
            'message' => 'Task created successfully',
            'task' => $task,
        ], 201);
    }

    public function getAllTasks()
    {
        $tasks = Task::latest()->get();

        return response()->json([
            'data' => $tasks,
        ], 200);
    }

    public function markAsDone($taskId)
    {
        $task = Task::find($taskId);

        if (!$task) {
            return response() -> json([
                'error' => 'Task not found'
            ], 404);
        }

        $task->is_completed = true;
        $task->save();

        return response() -> json([
            'message' => 'Marked as done'
        ], 200); 
    }

    public function deleteTask($taskId)
    {
        $isDeleted = Task::find($taskId);

        if (!$isDeleted) {
            return response() -> json([
                'error' => 'Task not found'
            ], 404);
        }

        $isDeleted->delete();

        return response() -> json([
            'message' => 'Deleted'
        ], 200);
    }
}
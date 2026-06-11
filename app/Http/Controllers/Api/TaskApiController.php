<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Task;
use App\Models\Subject;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class TaskApiController extends Controller
{
    protected $todoModel;

    // FOR TASK-RELATED FUNCTIONS
    public function saveTask(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:25',
            'subject_id' => 'nullable|exists:subjects,id',
            'description' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors(),
            ], 422);
        }

        $task = Task::create([
            'title' => $request->title,
            'subject_id' => $request->subject_id,
            'description' => $request->description,
        ]);

        return response()->json([
            'message' => 'Task created successfully',
            'task' => $task,
        ], 201);
    }

    public function getAllTasks()
    {
        $tasks = Task::with('subject')->latest()->get();

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

    public function editTask(Request $request, $taskId)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:25',
            'subject_id' => 'nullable|exists:subjects,id',
            'description' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors(),
            ], 422);
        }

        $task = Task::find($taskId);

        if (!$task) {
            return response()-json([
                'error' => 'Task not found',
            ], 404);
        }

        $task->update([
            'title' => $request->title,
            'subject_id' => $request->subject_id,
            'description' => $request->description,
        ]);

        return response()->json([
            'message' => 'Task edited successfully',
            'task' => $task,
        ], 200);
    }

    // FOR SUBJECT-RELATED FUNCTIONS
    public function getSubjects() 
    {
        $subjects = Subject::latest()->get();

        return response()->json([
            'data' => $subjects
        ], 200);
    }

    public function saveSubject(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:50'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors(),
            ], 422);
        }

        $subject = Subject::create([
            'name' => $request->name,
        ]);

        return response()->json([
            'message' => 'Subject created',
            'subject' => $subject,
        ], 201);
    }
}
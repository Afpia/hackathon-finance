<?php

namespace App\Http\Controllers;

use App\Models\Goal;
use App\Services\GoalService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class GoalController extends Controller
{
    protected $GoalService;

    public function __construct(GoalService $GoalService)
    {
        $this->GoalService = $GoalService;
    }

    public function index()
    {
        $user = Auth::user();
        $GoalData = $this->GoalService->getId($user->id);

        return response()->json(['Debts' => $GoalData]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'goal' => 'required',
            'total_amount' => 'required',
            'curently_amount' => 'required',
            'deadlines' => 'required',
            'status' => 'required',
        ]);
        $this->GoalService->create([
            'user_id' => $request->user()->id,
            'goal' => $request->goal,
            'total_amount' => $request->total_amount,
            'curently_amount' => $request->curently_amount,
            'deadlines' => $request->deadlines,
            'status' => $request->status,
        ]);
    }

    public function update(Request $request, $id)
    {
        $user = Auth::user();
        $DebtsRecord = Goal::find($id);
        if (! $DebtsRecord || $DebtsRecord->user_id !== $user->id) {
            return response()->json(['message' => 'Unauthorized or record not found'], 403);
        }
        $this->GoalService->update($id, [
            'curently_amount' => $request->curently_amount,
        ]);

        return response()->json(['message' => 'Record updated successfully']);
    }
    public function destroy($id)
    {
        $user = Auth::user();
        $GoalRecord = Goal::find($id);
        if (!$GoalRecord || $GoalRecord->user_id !== $user->id) {
            return response()->json(['message' => 'Unauthorized or record not found'], 403);
        }
        $this->GoalService->destroy($id);   
        return response()->json(['message' => 'Record deleted successfully']);
    }
}

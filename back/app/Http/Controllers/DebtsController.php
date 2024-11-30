<?php

namespace App\Http\Controllers;

use App\Models\Goal;
use App\Services\DebtsServices;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
class DebtsController extends Controller
{
    protected $debtsServices;
    public function __construct(DebtsServices $debtsServices){
            $this->debtsServices = $debtsServices;
    }
    public function index(){
        $user = Auth::user();
        $debtsData = $this->debtsServices->getId($user->id);
        return response()->json(['Debts' => $debtsData]);
    }
    public function store(Request $request){
            $request ->validate([
                'goal' => 'required',
                'total_amount' => 'required',
                'curently_amount' => 'required',
                'deadlines' => 'required',
                'status' => 'required',
            ]);
            $this->debtsServices->create([
                'user_id' => $request->user()->id,
                'goal' => $request->goal,
                'total_amount' => $request->total_amount,
                'curently_amount' => $request->curently_amount,
                'deadlines' => $request->deadlines,
                'status' => $request->status
            ]);
    }
    public function update(Request $request, $id){
        $user = Auth::user();
        $DebtsRecord = Goal::find($id);
        if (!$DebtsRecord || $DebtsRecord->user_id !== $user->id) {
            return response()->json(['message' => 'Unauthorized or record not found'], 403);
        }
        $this->debtsServices->update($id, [
            'curently_amount' => $request->curently_amount,
        ]);  
        return response()->json(['message' => 'Record updated successfully']);
    }
}

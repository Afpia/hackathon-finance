<?php

namespace App\Http\Controllers;

use App\Models\Debts;
use App\Models\Goal;
use App\Services\DebtsServices;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
class DebtsController extends Controller
{
    protected $DebtsServices;
    public function __construct(DebtsServices $DebtsServices){
            $this->DebtsServices = $DebtsServices;
    }
    public function index(){
        $user = Auth::user();
        $debtsData = $this->DebtsServices->getId($user->id);
        return response()->json(['Debts' => $debtsData]);
    }
    public function store(Request $request){
        $request ->validate([
            'amount' => 'required',
            'description' => 'required',
            'due_date' => 'required',
            'status' => 'required',
        ]);
        $this->DebtsServices->create([
            'user_id' => $request->user()->id,
            'amount' => $request->amount,
            'description' => $request->description,
            'due_date' => $request->due_date,
            'status' => $request->status,
        ]);

}
public function update(Request $request, $id)
{
    $user = Auth::user();
    $DebtsRecord = Debts::find($id);
    if (!$DebtsRecord || $DebtsRecord->user_id !== $user->id) {
        return response()->json(['message' => 'Unauthorized or record not found'], 403);
    }
    $this->DebtsServices->update($id, [
        'amount' => $request->amount,
        'description' => $request->description	,
        'due_date' => $request->due_date,
        'status' => $request->status, 
    ]);  
    return response()->json(['message' => 'Record updated successfully']);
}
public function destroy($id)
{
    $user = Auth::user();
    $financeRecord = Debts::find($id);
    if (!$financeRecord || $financeRecord->user_id !== $user->id) {
        return response()->json(['message' => 'Unauthorized or record not found'], 403);
    }
    $this->DebtsServices->destroy($id);   
    return response()->json(['message' => 'Record deleted successfully']);
}
}

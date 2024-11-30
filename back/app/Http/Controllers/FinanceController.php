<?php

namespace App\Http\Controllers;

use App\Models\Finance;
use App\Services\FinanceService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class FinanceController extends Controller
{
    private $financeService;

    public function __construct(FinanceService $financeService)
    {
        $this->financeService = $financeService;
    }


public function index()
{
    $user = Auth::user();
    $financeData = $this->financeService->getid($user->id);

    return response()->json(['finance' => $financeData]);
}


    public function show($id)
    {
        $user = Auth::user();
        $financeData = $this->financeService->getid($user->id);
        return response()->json(['finance' =>$financeData->find($id)]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'category_id' => 'required',
            'incomeORexpense' => 'required',
            'type' => 'required',
        ]);
        $this->financeService->create([
            'user_id' => $request->user()->id,
            'category_id' => $request->category_id,
            'incomeORexpense' => $request->incomeORexpense,
            'type' => $request->type,
            'description' => $request->description,
        ]);
      
    }
    public function update(Request $request, $id)
    {
        $user = Auth::user();
        $financeRecord = Finance::find($id);
        if (!$financeRecord || $financeRecord->user_id !== $user->id) {
            return response()->json(['message' => 'Unauthorized or record not found'], 403);
        }
        $this->financeService->update($id, [
            'category_id' => $request->category_id,
            'incomeORexpense' => $request->incomeORexpense,
            'type' => $request->type,
            'description' => $request->description, 
        ]);  
        return response()->json(['message' => 'Record updated successfully']);
    }
    public function destroy($id)
    {
        $user = Auth::user();
        $financeRecord = Finance::find($id);
        if (!$financeRecord || $financeRecord->user_id !== $user->id) {
            return response()->json(['message' => 'Unauthorized or record not found'], 403);
        }
        $this->financeService->destroy($id);   
        return response()->json(['message' => 'Record deleted successfully']);
    }
    
}

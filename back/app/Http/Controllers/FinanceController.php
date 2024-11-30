<?php

namespace App\Http\Controllers;

use App\Services\FinanceService;
use Auth;
use Illuminate\Http\Request;

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
        return response()->json(['finance' => $this->financeService->find($id)]);
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

        return response()->json('success', 201);
    }

    public function update(Request $request, $id)
    {
        $this->financeService->update($id, [
            'incomeORexpense' => $request->incomeORexpense,
            'description' => $request->description,
        ]);

        return response()->json('success', 202);

    }

    public function destroy($id)
    {
        $this->financeService->destroy($id);

        return response()->json('success', 203);

    }
}

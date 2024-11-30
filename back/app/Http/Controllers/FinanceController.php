<?php

namespace App\Http\Controllers;

use App\Models\Finance;
use App\Services\CategoriesService;
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
        $user = Auth::user();
        $financeData = $this->financeService->getid($user->id);

        return response()->json(['finance' => $financeData->find($id)]);
    }

    public function store(Request $request, CategoriesService $categoryService)
    {
        $validate = $request->validate([
            'category_id' => 'nullable|exists:categories,id',
            'incomeORexpense' => 'required|numeric',
            'type' => 'required|in:income,expence',
            'description' => 'nullable|string',
        ]);

        if (empty($validate['category_id']) && !empty($validate['description'])) {
            $validate['category_id'] = $categoryService->classifyTransaction($validate['description']);
        }

        $validate['user_id'] = $request->user()->id;

        $this->financeService->create($validate);

        return response()->json('success', 201);
    }

    public function update(Request $request, $id)
    {
        $user = Auth::user();
        $financeRecord = Finance::find($id);
        if (! $financeRecord || $financeRecord->user_id !== $user->id) {
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
        if (! $financeRecord || $financeRecord->user_id !== $user->id) {
            return response()->json(['message' => 'Unauthorized or record not found'], 403);
        }
        $this->financeService->destroy($id);

        return response()->json(['message' => 'Record deleted successfully']);
    }
}

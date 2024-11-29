<?php

namespace App\Http\Controllers;

use App\Models\Finance;
use App\Services\FinanceService;
use Illuminate\Http\Request;

class FinanceController extends Controller
{
    private $financeService;
    public function __construct(FinanceService $financeService){
        $this->financeService = $financeService;
    }

    public function index()
    {
        return response()->json(['finance' => $this->financeService->all()]);
    }
    public function store(Request $request){
        $request->validate([
            'incomeORexpense' => 'required',
            'description' => 'reqiured',
        ]);
        Finance::create([
            'incomeORexpense' => $request->incomeORexpense,
            'description' => $request->description,
        ]);
    }
}

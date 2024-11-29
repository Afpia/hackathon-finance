<?php

namespace App\Http\Controllers;

use App\Services\FinanceService;

class FinanceController extends Controller
{
    private $financeService;

    public function __construct(FinanceService $financeService)
    {
        $this->financeService = $financeService;
    }

    public function index()
    {
        return response()->json(['finance' => $this->financeService->all()]);
    }
}

<?php

namespace App\Http\Controllers;

use App\Services\FinanceService;

class AnalyticsController extends Controller
{
    private $financeService;

    public function __construct(FinanceService $financeService)
    {
        $this->financeService = $financeService;
    }

    public function index()
    {
        return response()->json($this->financeService->analytic());
    }
}

<?php

namespace App\Http\Controllers;

use App\Services\FinanceService;
use Illuminate\Http\Request;

class AnalyticsController extends Controller
{
    private $financeService;

    public function __construct(FinanceService $financeService)
    {
        $this->financeService = $financeService;
    }

    public function index(Request $request)
    {
        $period = $request->input('period', 'all');

        return response()->json($this->financeService->analytic($period));
    }
}

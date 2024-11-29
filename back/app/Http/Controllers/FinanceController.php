<?php

namespace App\Http\Controllers;

use App\Services\FinanceService;
use Illuminate\Http\Request;

class FinanceController extends Controller
{   
    private $financeService;
    public function __construct(FinanceService $financeService){
            $this->financeService = $financeService;
    }
    public function index(FinanceService $financeService){

        return response()->json(['finance' => $financeService->all()]);
        
    }
}

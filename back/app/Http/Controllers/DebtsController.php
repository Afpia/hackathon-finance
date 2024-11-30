<?php

namespace App\Http\Controllers;

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
}

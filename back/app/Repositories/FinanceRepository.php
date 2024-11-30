<?php

namespace App\Repositories;

use App\Models\Finance;
use Auth;
use DB;

class FinanceRepository extends BaseRepository
{
    protected $model;

    public function __construct(Finance $finans)
    {
        $this->model = $finans;
    }

    public function TotalIncome()
    {
        return $this->model
        ->where('user_id', Auth::id())
        ->where('type', 'income')
        ->sum('incomeORexpense');
    }

    public function TotalExpense()
    {
        return $this->model
        ->where('user_id', Auth::id())
        ->where('type', 'expence')
        ->sum('incomeORexpense');
    }

    public function TopCategories()
    {
        return $this->model
        ->select('categories.category_name', DB::raw('SUM(finances.incomeORexpense) as total'))
        ->join('categories', 'finances.category_id', '=', 'categories.id')
        ->where('finances.user_id', Auth::id())
        ->groupBy('categories.category_name')
        ->orderByDesc('total')
        ->take(3)
        ->get();
    }

    public function LargestExpense()
    {
        return $this->model
        ->where('user_id', Auth::id())
        ->where('type', 'expence')
        ->orderByDesc('incomeORexpense')
        ->first();
    }
}

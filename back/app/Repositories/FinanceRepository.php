<?php

namespace App\Repositories;

use App\Models\Finance;
use Auth;
use Carbon\Carbon;
use DB;

class FinanceRepository extends BaseRepository
{
    protected $model;

    public function __construct(Finance $finans)
    {
        $this->model = $finans;
    }

    private function applyPeriodFilter($query, $period)
    {
        switch ($period) {
            case 'day':
                return $query->whereDate('finances.created_at', Carbon::today());

            case 'week':
                return $query->whereBetween('finances.created_at', [Carbon::now()->startOfWeek(), Carbon::now()->endOfWeek()]);

            case 'month':
                return $query->whereBetween('finances.created_at', [Carbon::now()->startOfMonth(), Carbon::now()->endOfMonth()]);

            case 'year':
                return $query->whereBetween('finances.created_at', [Carbon::now()->startOfYear(), Carbon::now()->endOfYear()]);

            default:
                return $query;
        }
    }

    public function TotalIncome($period = 'all')
    {
        $query = $this->model
            ->where('user_id', Auth::id())
            ->where('type', 'income');

        $query = $this->applyPeriodFilter($query, $period);

        return $query->sum('incomeORexpense');
    }

    public function TotalExpense($period = 'all')
    {
        $query = $this->model
            ->where('user_id', Auth::id())
            ->where('type', 'expence');

        $query = $this->applyPeriodFilter($query, $period);

        return $query->sum('incomeORexpense');
    }

    public function TopCategories($period = 'all')
    {
        $query = $this->model
            ->select('categories.category_name', DB::raw('SUM(finances.incomeORexpense) as total'))
            ->join('categories', 'finances.category_id', '=', 'categories.id')
            ->where('finances.user_id', Auth::id())
            ->groupBy('categories.category_name')
            ->orderByDesc('total');

        $query = $this->applyPeriodFilter($query, $period);

        return $query->take(3)->get();
    }

    public function LargestExpense($period = 'all')
    {
        $query = $this->model
            ->where('user_id', Auth::id())
            ->where('type', 'expence');

        $query = $this->applyPeriodFilter($query, $period);

        return $query->orderByDesc('incomeORexpense')->first();
    }
}

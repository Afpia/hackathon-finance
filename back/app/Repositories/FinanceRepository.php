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

    public function getUserOperations()
    {
        $operations = $this->model
            ->where('user_id', Auth::id())
            ->with('category')
            ->orderBy('created_at', 'desc')
            ->get();
    
        return $operations->map(function ($operation) {
            return [
                'id' => $operation->id,
                'incomeORexpense' => $operation->incomeORexpense,
                'type' => $operation->type,
                'description' => $operation->description,
                'category_name' => $operation->category->category_name ?? 'Не указано',
                'created_at' => $operation->created_at,
            ];
        });
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

    public function topCategories($period = 'all', $limit = 7)
    {
        $query = $this->model
            ->select(
                'categories.category_name',
                'categories.id',
                DB::raw('SUM(finances.incomeORexpense) as total')
            )
            ->join('categories', 'finances.category_id', '=', 'categories.id')
            ->where('finances.user_id', Auth::id())
            ->groupBy('categories.category_name', 'categories.id')
            ->orderByDesc('total');

        $query = $this->applyPeriodFilter($query, $period);

        return $query->take($limit)->get();
    }

    public function LargestExpense($period = 'all')
    {
        $query = $this->model
            ->where('user_id', Auth::id())
            ->where('type', 'expence');

        $query = $this->applyPeriodFilter($query, $period);

        return $query->orderByDesc('incomeORexpense')->first();
    }

    public function getMonthlySummary($year = null)
    {
        $year = $year ?? now()->year;

        return $this->model
            ->select(
                DB::raw('MONTH(created_at) as month'),
                DB::raw('SUM(CASE WHEN type = "income" THEN incomeORexpense ELSE 0 END) as total_income'),
                DB::raw('SUM(CASE WHEN type = "expence" THEN incomeORexpense ELSE 0 END) as total_expense')
            )
            ->where('user_id', Auth::id())
            ->whereYear('created_at', $year)
            ->groupBy(DB::raw('MONTH(created_at)'))
            ->orderBy(DB::raw('MONTH(created_at)'))
            ->get();
    }
}

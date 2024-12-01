<?php

namespace App\Services;

use App\Models\Finance;
use App\Repositories\FinanceRepository;

class FinanceService extends BaseService
{
    private $financeRepository;

    public function __construct(FinanceRepository $financeRepository)
    {
        $this->repo = $financeRepository;
    }

    public function analytic($period = 'all')
    {
        return [
            'total_income' => $this->repo->TotalIncome($period),
            'total_expense' => $this->repo->TotalExpense($period),
            'top_categories' => $this->repo->TopCategories($period),
            'largest_expense' => $this->repo->LargestExpense($period),
        ];
    }

    public function getid()
    {
        return $this->repo->getUserOperations();
    }

    public function destroy($id)
    {
        $financeRecord = Finance::find($id);

        if ($financeRecord) {
            $financeRecord->delete();
        }
    }

    public function update($id, array $data)
    {
        $financeRecord = Finance::find($id);

        if ($financeRecord) {
            $financeRecord->update($data);
        }
    }

    public function getYearlyAnalytics($year = null)
    {
        $data = $this->repo->getMonthlySummary($year);

        $result = array_fill(1, 12, ['total_income' => 0, 'total_expense' => 0]);

        foreach ($data as $row) {
            $result[$row->month] = [
                'total_income' => $row->total_income,
                'total_expense' => $row->total_expense,
            ];
        }

        return $result;
    }
}

<?php

namespace App\Services;

use App\Repositories\FinanceRepository;

class FinanceService extends BaseService
{
    private $financeRepository;

    public function __construct(FinanceRepository $financeRepository)
    {
        $this->repo = $financeRepository;
    }

    public function analytic()
    {
        return [
            'total_income' => $this->repo->TotalIncome(),
            'total_expense' => $this->repo->TotalExpense(),
            'top_categories' => $this->repo->TopCategories(),
            'largest_expense' => $this->repo->LargestExpense(),
        ];
    }
}

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
}

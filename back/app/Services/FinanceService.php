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
    public function getid($userId)
{
    return Finance::where('user_id', $userId)->get();
}

}

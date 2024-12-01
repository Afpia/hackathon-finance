<?php

namespace App\Services;

use App\Models\Debts;
use App\Repositories\DebtsRepository;

class DebtsServices extends BaseService
{
    protected $DebtsRepository;

    public function __construct(DebtsRepository $debtsRepository)
    {
        $this->repo = $debtsRepository;
    }

    public function getId($userId)
    {
        return Debts::where('user_id', $userId)->get();
    }
}

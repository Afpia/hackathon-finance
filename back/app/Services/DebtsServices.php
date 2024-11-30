<?php

namespace App\Services;

use App\Models\Goal;
use App\Repositories\DebtsRepository;

class DebtsServices extends BaseService
{
    protected $DebtsRepository;
    public function __construct(DebtsRepository $debtsRepository){
        $this->repo = $debtsRepository;
    }

    public function getId($userId){
            return Goal::where('user_id', $userId)->get();
    }
}
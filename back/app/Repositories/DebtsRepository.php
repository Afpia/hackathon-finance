<?php

namespace App\Repositories;

use App\Models\Debts;

class DebtsRepository extends BaseRepository
{
    protected $model;

    public function __construct(Debts $Debts)
    {
        $this->model = $Debts;
    }
}

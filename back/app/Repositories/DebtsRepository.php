<?php

namespace App\Repositories;

use App\Models\Goal;

class DebtsRepository extends BaseRepository
{
    protected $model;

    public function __construct(Goal $goal)
    {
        $this->model = $goal;
    }
}

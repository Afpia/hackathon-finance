<?php

namespace App\Repositories;

use App\Models\Goal;

class GoalRepository extends BaseRepository
{
    protected $model; 
    public function __construct(Goal $goal){
            $this->model = $goal;
    }
}
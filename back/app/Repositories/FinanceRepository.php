<?php

namespace App\Repositories;

use App\Models\Finance;

class FinanceRepository extends BaseRepository
{
   protected $model;

   public function __construct(Finance $finans)
   {
       $this->model = $finans;
   }
}


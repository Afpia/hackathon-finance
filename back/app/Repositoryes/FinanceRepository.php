<?php

namespace App\Repositories;

class FinanceRepository extends BaseRepository
{
   protected $model;

   public function __construct(Finance $finans)
   {
       $this->model = $finans;
   }
}


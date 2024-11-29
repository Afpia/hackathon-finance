<?php

namespace App\Services;

use App\Repositories\FinanceRepository;

class FinanceService extends BaseService
{
   private $pizzaRepository;

   public function __construct(FinanceRepository $financeRepository)
   {
       $this->pizzaRepository = $financeRepository;
   }
}
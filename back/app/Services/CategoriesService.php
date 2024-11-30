<?php

namespace App\Services;

use App\Repositories\CategoriesRepository;

class CategoriesService extends BaseService
{
    private $categoriesRepository;

    public function __construct(CategoriesRepository $categoriesRepository)
    {
        $this->repo = $categoriesRepository;
    }
}

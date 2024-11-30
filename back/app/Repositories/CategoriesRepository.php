<?php

namespace App\Repositories;

use App\Models\category;

class CategoriesRepository extends BaseRepository
{
    protected $model;

    public function __construct(category $category)
    {
        $this->model = $category;
    }
}

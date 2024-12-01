<?php

namespace App\Repositories;

use App\Models\category;
use DB;

class CategoriesRepository extends BaseRepository
{
    protected $model;

    public function __construct(category $category)
    {
        $this->model = $category;
    }

    public function getRandomCategories($excludeIds, $limit)
    {
        return DB::table('categories')
            ->whereNotIn('id', $excludeIds)
            ->inRandomOrder()
            ->limit($limit)
            ->get(['id', 'category_name']);
    }
}

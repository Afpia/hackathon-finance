<?php

namespace App\Http\Controllers;

use App\Services\CategoriesService;

class CategoriesController extends Controller
{
    private $categoriesService;

    public function __construct(CategoriesService $categoriesService)
    {
        $this->categoriesService = $categoriesService;
    }

    public function index()
    {
        return response()->json($this->categoriesService->all());
    }
}

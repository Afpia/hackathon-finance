<?php

namespace App\Http\Controllers;

use App\Services\CategoriesService;
use Illuminate\Http\Request;

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

    public function show($id)
    {
        return response()->json($this->categoriesService->find($id));
    }

    public function analytic(Request $request)
    {
        $period = $request->input('period', default: 'year');
        $top = $request->input('top', 7);

        return response()->json($this->categoriesService->analytic($period, $top));
    }
}

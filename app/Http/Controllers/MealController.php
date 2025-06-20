<?php

namespace App\Http\Controllers;

use App\Models\Meal;
use App\Services\MealService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class MealController extends Controller
{
    protected MealService $mealService;

    public function __construct(MealService $mealService)
    {
        $this->mealService = $mealService;
    }

    public function index(Request $request): Response
    {
        $search = $request->input('search', '');
        $meals = $this->mealService->getPaginatedMeals($search);

        return Inertia::render('Meals/Index', [
            'meals' => $meals,
            'filters' => [
                'search' => $search,
            ],
        ]);
    }

    public function show(Meal $meal): Response
    {
        $meal = $this->mealService->getMealWithComments($meal);

        return Inertia::render('Meals/Show', [
            'meal' => $meal,
        ]);
    }

    public function favorites(): Response
    {
        $meals = Meal::all();

        return Inertia::render('Meals/Favorites', [
            'meals' => $meals,
        ]);
    }
}

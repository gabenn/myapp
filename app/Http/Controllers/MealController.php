<?php

namespace App\Http\Controllers;

use App\Models\Meal;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MealController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->input('search', '');

        $meals = Meal::when($search, function ($query, $search) {
                return $query->where('title', 'like', "%{$search}%");
            })
            ->orderBy('title')
            ->paginate(21)
            ->withQueryString();

        return Inertia::render('Meals/Index', [
            'meals' => $meals,
            'filters' => [
                'search' => $search
            ]
        ]);
    }

    public function show(Meal $meal)
    {
        $meal->load(['comments' => function ($query) {
            $query->with('user')
                  ->latest()
                  ->take(20);
        }]);

        return Inertia::render('Meals/Show', [
            'meal' => $meal
        ]);
    }

    public function favorites()
    {
        $meals = Meal::all();

        return Inertia::render('Meals/Favorites', [
            'meals' => $meals
        ]);
    }
}

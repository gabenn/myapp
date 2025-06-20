<?php

namespace App\Services;

use App\Models\Meal;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Builder;

class MealService
{
    public function getPaginatedMeals(?string $search = null): LengthAwarePaginator
    {
        return Meal::when($search, function (Builder $query, string $search): Builder {
                return $query->where('title', 'like', "%{$search}%");
            })
            ->orderBy('title')
            ->paginate(21)
            ->withQueryString();
    }

    public function getMealWithComments(Meal $meal): Meal
    {
        return $meal->load(['comments' => function ($query): void {
            $query->with('user')
                ->latest()
                ->take(20);
        }]);
    }
}

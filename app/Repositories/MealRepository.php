<?php

namespace App\Repositories;

use App\Models\Meal;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Http;

class MealRepository
{
    public function getCategories(): Collection
    {
        $response = Http::get('https://www.themealdb.com/api/json/v1/1/categories.php');

        return collect($response->json()['categories'] ?? []);
    }

    public function getMealsByCategory(string $category): Collection
    {
        $response = Http::get('https://www.themealdb.com/api/json/v1/1/filter.php', [
            'c' => $category,
        ]);

        return collect($response->json()['meals'] ?? []);
    }

    public function getMealDetails(string $mealId): ?array
    {
        $response = Http::get('https://www.themealdb.com/api/json/v1/1/lookup.php', [
            'i' => $mealId,
        ]);

        return $response->json()['meals'][0] ?? null;
    }

    public function saveMeal(string $mealId, array $data): Meal
    {
        return Meal::updateOrCreate(
            ['meal_id' => $mealId],
            $data
        );
    }

    public function formatIngredients(array $mealData): array
    {
        $ingredients = [];
        for ($i = 1; $i <= 20; $i++) {
            $ingredient = $mealData["strIngredient{$i}"] ?? null;
            $measure = $mealData["strMeasure{$i}"] ?? null;

            if ($ingredient && '' !== mb_trim($ingredient)) {
                $ingredients[] = [
                    'name' => $ingredient,
                    'measure' => $measure,
                ];
            }
        }

        return $ingredients;
    }
}

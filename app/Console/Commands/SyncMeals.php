<?php

namespace App\Console\Commands;

use App\Models\Meal;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class SyncMeals extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:sync-meals {--category=}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Synchronizes recipes from TheMealDB API';

    /**
     * Execute the console command.
     */
    public function handle(): void
    {
        $this->info('Starting recipe synchronization...');

        $category = $this->option('category');

        try {
            if ($category) {
                $this->syncByCategory($category);
            } else {
                $response = Http::get('https://www.themealdb.com/api/json/v1/1/categories.php');
                $categories = $response->json()['categories'] ?? [];

                $bar = $this->output->createProgressBar(count($categories));
                $bar->start();

                foreach ($categories as $category) {
                    $this->syncByCategory($category['strCategory']);
                    $bar->advance();
                }

                $bar->finish();
                $this->newLine();
            }

            $this->info('Synchronization completed successfully!');
        } catch (\Exception $e) {
            $this->error('An error occurred during synchronization: ' . $e->getMessage());
            Log::error('Recipe synchronization error: ' . $e->getMessage());
        }
    }

    /**
     * Synchronizes recipes for a given category
     */
    private function syncByCategory(string $category): void
    {
        $this->info("Fetching recipes from category: $category");

        $response = Http::get("https://www.themealdb.com/api/json/v1/1/filter.php", [
            'c' => $category
        ]);

        $meals = $response->json()['meals'] ?? [];

        foreach ($meals as $mealData) {
            $this->syncMealDetails($mealData['idMeal']);
        }
    }

    /**
     * Retrieves and saves recipe details
     */
    private function syncMealDetails(string $mealId): void
    {
        $response = Http::get("https://www.themealdb.com/api/json/v1/1/lookup.php", [
            'i' => $mealId
        ]);

        $mealData = $response->json()['meals'][0] ?? null;

        if (!$mealData) {
            $this->warn("Recipe not found with ID: $mealId");
            return;
        }

        $ingredients = [];
        for ($i = 1; $i <= 20; $i++) {
            $ingredient = $mealData["strIngredient$i"] ?? null;
            $measure = $mealData["strMeasure$i"] ?? null;

            if ($ingredient && trim($ingredient) !== '') {
                $ingredients[] = [
                    'name' => $ingredient,
                    'measure' => $measure
                ];
            }
        }

        Meal::updateOrCreate(
            ['meal_id' => $mealId],
            [
                'title' => $mealData['strMeal'],
                'instructions' => $mealData['strInstructions'],
                'category' => $mealData['strCategory'],
                'area' => $mealData['strArea'],
                'thumbnail' => $mealData['strMealThumb'],
                'youtube' => $mealData['strYoutube'],
                'tags' => $mealData['strTags'],
                'ingredients' => $ingredients
            ]
        );

        $this->line("Synchronized recipe: {$mealData['strMeal']}");
    }
}

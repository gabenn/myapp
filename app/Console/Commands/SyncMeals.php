<?php

namespace App\Console\Commands;

use App\Repositories\MealRepository;
use Exception;
use Illuminate\Console\Command;
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

    protected MealRepository $mealRepository;

    /**
     * Create a new command instance.
     */
    public function __construct(MealRepository $mealRepository)
    {
        parent::__construct();
        $this->mealRepository = $mealRepository;
    }

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
                $categories = $this->mealRepository->getCategories();

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
        } catch (Exception $e) {
            $this->error('An error occurred during synchronization: ' . $e->getMessage());
            Log::error('Recipe synchronization error: ' . $e->getMessage());
        }
    }

    /**
     * Synchronizes recipes for a given category
     */
    private function syncByCategory(string $category): void
    {
        $this->info("Fetching recipes from category: {$category}");

        $meals = $this->mealRepository->getMealsByCategory($category);

        foreach ($meals as $mealData) {
            $this->syncMealDetails($mealData['idMeal']);
        }
    }

    /**
     * Retrieves and saves recipe details
     */
    private function syncMealDetails(string $mealId): void
    {
        $mealData = $this->mealRepository->getMealDetails($mealId);

        if ( ! $mealData) {
            $this->warn("Recipe not found with ID: {$mealId}");

            return;
        }

        $ingredients = $this->mealRepository->formatIngredients($mealData);

        $this->mealRepository->saveMeal($mealId, [
            'title' => $mealData['strMeal'],
            'instructions' => $mealData['strInstructions'],
            'category' => $mealData['strCategory'],
            'area' => $mealData['strArea'],
            'thumbnail' => $mealData['strMealThumb'],
            'youtube' => $mealData['strYoutube'],
            'tags' => $mealData['strTags'],
            'ingredients' => $ingredients,
        ]);

        $this->line("Synchronized recipe: {$mealData['strMeal']}");
    }
}

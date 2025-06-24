<?php

namespace App\Services;

use Illuminate\Http\Client\PendingRequest;
use Illuminate\Http\Client\RequestException;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class MealApiService
{
    private const MAX_RETRIES = 3;
    private const RETRY_DELAY_MS = 1000;
    private const BASE_URL = 'https://www.themealdb.com/api/json/v1/1';

    private PendingRequest $client;

    public function __construct()
    {
        $this->client = Http::baseUrl(self::BASE_URL)
            ->timeout(15)
            ->retry(self::MAX_RETRIES, self::RETRY_DELAY_MS, function ($exception) {
                return $exception instanceof RequestException &&
                       $exception->response->status() >= 500;
            })
            ->withUserAgent('MyApp/1.0');
    }

    public function getCategories()
    {
        return $this->makeRequest('get', '/categories.php');
    }

    public function getMealsByCategory(string $category)
    {
        return $this->makeRequest('get', '/filter.php', ['c' => $category]);
    }

    public function getMealDetails(string $mealId)
    {
        return $this->makeRequest('get', '/lookup.php', ['i' => $mealId]);
    }

    private function makeRequest(string $method, string $endpoint, array $params = [])
    {
        static $lastRequestTime = 0;
        $currentTime = microtime(true);
        $throttleDelay = 0.5;

        if (($currentTime - $lastRequestTime) < $throttleDelay) {
            $sleepTime = ($throttleDelay - ($currentTime - $lastRequestTime)) * 1000000;
            usleep((int) $sleepTime);
        }

        $lastRequestTime = microtime(true);

        try {
            $response = $this->client->$method($endpoint, $params);

            if ($response->successful()) {
                return $response->json();
            } else {
                Log::error('API request failed', [
                    'endpoint' => $endpoint,
                    'params' => $params,
                    'status' => $response->status(),
                    'response' => $response->body(),
                ]);

                return null;
            }
        } catch (RequestException $e) {
            Log::error('API request exception', [
                'endpoint' => $endpoint,
                'params' => $params,
                'message' => $e->getMessage(),
                'code' => $e->getCode(),
            ]);

            return null;
        }
    }
}

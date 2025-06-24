import React from 'react';

export default function MealCard({ meal }) {
    return (
        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 text-gray-900">
                <div className="flex justify-between items-start">
                    <div>
                        <h1 className="text-2xl font-bold mb-2">{meal.title}</h1>
                        <div className="text-sm text-gray-600 mb-4">
                            <span className="mr-4">
                                <span className="sr-only">Category:</span> {meal.category}
                            </span>
                            {meal.area && (
                                <span className="mr-4">
                                    <span className="sr-only">Cuisine:</span> {meal.area}
                                </span>
                            )}
                            {meal.tags && (
                                <span>
                                    <span className="sr-only">Tags:</span> {meal.tags}
                                </span>
                            )}
                        </div>
                    </div>
                </div>

                <div className="md:flex mt-6">
                    <div className="md:w-1/3 mb-6 md:mb-0 md:pr-6">
                        <img
                            src={meal.thumbnail}
                            alt={`Dish: ${meal.title}`}
                            className="w-full rounded-lg shadow-md"
                        />

                        {meal.youtube && (
                            <div className="mt-4">
                                <a
                                    href={meal.youtube}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-600 hover:underline"
                                    aria-label={`Watch ${meal.title} preparation video on YouTube`}
                                >
                                    Watch on YouTube
                                </a>
                            </div>
                        )}
                    </div>

                    <div className="md:w-2/3">
                        <h2 className="text-xl font-semibold mb-4" id="preparation-method">Preparation Method</h2>
                        <div className="whitespace-pre-line" aria-labelledby="preparation-method">
                            {meal.instructions}
                        </div>
                    </div>
                </div>

                <div className="mt-8">
                    <h2 className="text-xl font-semibold mb-4" id="ingredients-list">Ingredients</h2>
                    <ul
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2"
                        aria-labelledby="ingredients-list"
                        role="list"
                    >
                        {meal.ingredients && meal.ingredients.map((ingredient, index) => (
                            <li key={index} className="flex items-center" role="listitem">
                                <span className="mr-2" aria-hidden="true">•</span>
                                <span>
                                    {ingredient.name} {ingredient.measure && `(${ingredient.measure})`}
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

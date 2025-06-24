import React from 'react';
import { Link } from '@inertiajs/react';
import FavoriteButton from '@/Components/FavoriteButton';

export default function MealItem({ meal, onFavoriteToggle = null }) {
    return (
        <div className="border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition duration-300" role="listitem">
            <Link href={route('meals.show', meal.id)} className="block h-full" aria-label={`View recipe: ${meal.title}`}>
                <div className="relative">
                    <img
                        src={meal.thumbnail}
                        alt={`Dish: ${meal.title}`}
                        className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-2 right-2 z-10" onClick={(e) => e.preventDefault()}>
                        <FavoriteButton
                            mealId={meal.id}
                            className="text-2xl"
                            onToggle={onFavoriteToggle}
                        />
                    </div>
                </div>
                <div className="p-4">
                    <h3 className="text-lg font-semibold">
                        {meal.title}
                    </h3>
                    <p className="text-sm text-gray-600 mt-2">
                        <span className="sr-only">Category:</span> {meal.category}
                    </p>
                    {meal.area && (
                        <p className="text-sm text-gray-600">
                            <span className="sr-only">Cuisine:</span> {meal.area}
                        </p>
                    )}
                </div>
            </Link>
        </div>
    );
}

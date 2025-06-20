import React, { useState, useEffect } from 'react';
import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import MealItem from '@/Components/MealItem';

export default function Favorites({ auth, meals }) {
    const [favoriteMeals, setFavoriteMeals] = useState([]);

    useEffect(() => {
        const favoriteIds = JSON.parse(localStorage.getItem('favoriteMeals') || '[]');

        if (favoriteIds.length === 0) {
            setFavoriteMeals([]);
            return;
        }

        const favorites = meals.filter(meal => favoriteIds.includes(meal.id));
        setFavoriteMeals(favorites);
    }, [meals]);

    const handleFavoriteRemoved = (mealId) => {
        setFavoriteMeals(prevMeals => prevMeals.filter(meal => meal.id !== mealId));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Favorite Recipes</h2>}
        >
            <Head title="Favorite Recipes" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {favoriteMeals.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {favoriteMeals.map((meal) => (
                                <MealItem
                                    key={meal.id}
                                    meal={meal}
                                    onFavoriteToggle={() => handleFavoriteRemoved(meal.id)}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-10 bg-white rounded-lg shadow-sm">
                            <p className="text-gray-500 mb-4">You don't have any favorite recipes yet</p>
                            <Link
                                href={route('meals.index')}
                                className="text-blue-600 hover:underline"
                            >
                                Browse recipes
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

import React, { useState, useEffect } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import MealItem from '@/Components/MealItem';

export default function Favorites({ auth, meals }) {
    const [favoriteMeals, setFavoriteMeals] = useState([]);

    useEffect(() => {
        const favoriteIds = JSON.parse(localStorage.getItem('favoriteMeals') || '[]');

        if (meals.length === 0 && favoriteIds.length > 0) {
            router.visit(route('meals.favorites'), {
                data: { favoriteIds },
                only: ['meals'],
                preserveState: true,
            });
        }

        setFavoriteMeals(meals);
    }, [meals]);

    const handleFavoriteRemoved = (mealId) => {
        const favoriteIds = JSON.parse(localStorage.getItem('favoriteMeals') || '[]');
        const updatedFavorites = favoriteIds.filter(id => id !== mealId);
        localStorage.setItem('favoriteMeals', JSON.stringify(updatedFavorites));

        setFavoriteMeals(prevMeals => prevMeals.filter(meal => meal.id !== mealId));

        if (updatedFavorites.length > 0) {
            router.visit(route('meals.favorites'), {
                data: { favoriteIds: updatedFavorites },
                only: ['meals'],
                preserveState: true,
            });
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight" id="page-heading">Favorite Recipes</h2>}
        >
            <Head title="Favorite Recipes" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {favoriteMeals.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" role="list" aria-labelledby="page-heading">
                            {favoriteMeals.map((meal) => (
                                <MealItem
                                    key={meal.id}
                                    meal={meal}
                                    onFavoriteToggle={() => handleFavoriteRemoved(meal.id)}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-10 bg-white rounded-lg shadow-sm" role="status" aria-live="polite">
                            <p className="text-gray-500 mb-4">You don't have any favorite recipes yet</p>
                            <Link
                                href={route('meals.index')}
                                className="text-blue-600 hover:underline"
                                aria-label="Browse recipes"
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

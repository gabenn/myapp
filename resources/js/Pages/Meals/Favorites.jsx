import React, { useState, useEffect } from 'react';
import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

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

    const removeFromFavorites = (mealId) => {
        const favoriteIds = JSON.parse(localStorage.getItem('favoriteMeals') || '[]');

        const updatedFavoriteIds = favoriteIds.filter(id => id !== mealId);
        localStorage.setItem('favoriteMeals', JSON.stringify(updatedFavoriteIds));

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
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            {favoriteMeals.length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {favoriteMeals.map((meal) => (
                                        <div key={meal.id} className="border rounded-lg overflow-hidden shadow-md">
                                            <img
                                                src={meal.thumbnail}
                                                alt={meal.title}
                                                className="w-full h-48 object-cover"
                                            />
                                            <div className="p-4">
                                                <div className="flex justify-between items-center">
                                                    <h3 className="text-lg font-semibold">
                                                        <Link href={route('meals.show', meal.id)}>
                                                            {meal.title}
                                                        </Link>
                                                    </h3>

                                                    <button
                                                        onClick={() => removeFromFavorites(meal.id)}
                                                        className="text-2xl focus:outline-none"
                                                        title="Remove from favorites"
                                                    >
                                                        ❤️
                                                    </button>
                                                </div>
                                                <p className="text-sm text-gray-600 mt-2">
                                                    Category: {meal.category}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-10">
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
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

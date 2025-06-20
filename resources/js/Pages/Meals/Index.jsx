import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Pagination from '@/Components/Pagination';
import { debounce } from 'lodash';

export default function Index({ auth, meals, filters }) {
    const { data, setData, get, processing } = useForm({
        search: filters.search || '',
    });

    const handleSearch = debounce((e) => {
        setData('search', e.target.value);
        get(route('meals.index'), {
            preserveState: true,
            preserveScroll: true,
        });
    }, 300);

    const toggleFavorite = (mealId) => {
        const favorites = JSON.parse(localStorage.getItem('favoriteMeals') || '[]');

        const isFavorite = favorites.includes(mealId);

        if (isFavorite) {
            const updatedFavorites = favorites.filter(id => id !== mealId);
            localStorage.setItem('favoriteMeals', JSON.stringify(updatedFavorites));
        } else {
            favorites.push(mealId);
            localStorage.setItem('favoriteMeals', JSON.stringify(favorites));
        }

        setData({...data});
    };

    const isFavoriteMeal = (mealId) => {
        const favorites = JSON.parse(localStorage.getItem('favoriteMeals') || '[]');
        return favorites.includes(mealId);
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Recipes</h2>}
        >
            <Head title="Recipes" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div className="mb-6">
                                <input
                                    type="text"
                                    name="search"
                                    value={data.search}
                                    onChange={(e) => {
                                        setData('search', e.target.value);
                                        handleSearch(e);
                                    }}
                                    className="rounded-md border-gray-300 shadow-sm w-full"
                                    placeholder="Search recipes..."
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {meals.data.map((meal) => (
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
                                                    onClick={() => toggleFavorite(meal.id)}
                                                    className="text-2xl focus:outline-none"
                                                >
                                                    {isFavoriteMeal(meal.id) ? '❤️' : '🤍'}
                                                </button>
                                            </div>
                                            <p className="text-sm text-gray-600 mt-2">
                                                Category: {meal.category}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-6">
                                <Pagination links={meals.links} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

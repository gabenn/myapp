import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Pagination from '@/Components/Pagination';
import MealItem from '@/Components/MealItem';
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

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight" id="page-heading">Recipes</h2>}
        >
            <Head title="Recipes" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div className="mb-6">
                                <label htmlFor="search-input" className="sr-only">Search recipes</label>
                                <input
                                    id="search-input"
                                    type="search"
                                    name="search"
                                    value={data.search}
                                    onChange={(e) => {
                                        setData('search', e.target.value);
                                        handleSearch(e);
                                    }}
                                    className="rounded-md border-gray-300 shadow-sm w-full"
                                    placeholder="Search recipes..."
                                    aria-label="Search recipes"
                                    aria-describedby="search-description"
                                    disabled={processing}
                                />
                                <div id="search-description" className="sr-only">
                                    Type to search for recipes, results will update automatically as you type
                                </div>
                            </div>

                            <div
                                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                                role="list"
                                aria-labelledby="page-heading"
                                aria-live="polite"
                                aria-busy={processing}
                            >
                                {meals.data.map((meal) => (
                                    <MealItem key={meal.id} meal={meal} />
                                ))}
                            </div>

                            {meals.data.length === 0 && (
                                <div className="text-center py-6" role="status">
                                    <p>No recipes found matching your search criteria.</p>
                                </div>
                            )}

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

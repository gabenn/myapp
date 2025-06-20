import React from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import MealCard from '@/Components/MealCard';
import CommentSection from '@/Components/CommentSection';
import FavoriteButton from '@/Components/FavoriteButton';

export default function Show({ auth, meal }) {
    const handleGoBack = () => {
        if (window.history.length > 1) {
            window.history.back();
        } else {
            router.visit(route('meals.index'));
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">{meal.title}</h2>}
        >
            <Head title={meal.title} />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="flex justify-between mb-6">
                        <button
                            onClick={handleGoBack}
                            className="inline-flex items-center px-4 py-2.5 bg-white border border-gray-300 rounded-lg shadow-sm text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 ease-in-out"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                            <span className="font-medium">Go Back</span>
                        </button>

                        <FavoriteButton
                            mealId={meal.id}
                            showText={true}
                            className="text-3xl"
                        />
                    </div>

                    <MealCard meal={meal} />

                    <div className="mt-8">
                        <CommentSection meal={meal} auth={auth} />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

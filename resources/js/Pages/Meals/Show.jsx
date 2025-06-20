import React, { useState, useEffect } from 'react';
import { Head, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';

export default function Show({ auth, meal }) {
    const [isFavorite, setIsFavorite] = useState(false);
    const { data, setData, post, processing, reset, errors } = useForm({
        content: '',
    });

    useEffect(() => {
        const favorites = JSON.parse(localStorage.getItem('favoriteMeals') || '[]');
        setIsFavorite(favorites.includes(meal.id));
    }, [meal.id]);

    const toggleFavorite = () => {
        const favorites = JSON.parse(localStorage.getItem('favoriteMeals') || '[]');

        if (isFavorite) {
            const updatedFavorites = favorites.filter(id => id !== meal.id);
            localStorage.setItem('favoriteMeals', JSON.stringify(updatedFavorites));
            setIsFavorite(false);
        } else {
            favorites.push(meal.id);
            localStorage.setItem('favoriteMeals', JSON.stringify(favorites));
            setIsFavorite(true);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('comments.store', meal.id), {
            onSuccess: () => reset(),
        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">{meal.title}</h2>}
        >
            <Head title={meal.title} />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h1 className="text-2xl font-bold mb-2">{meal.title}</h1>
                                    <div className="text-sm text-gray-600 mb-4">
                                        <span className="mr-4">Category: {meal.category}</span>
                                        {meal.area && <span className="mr-4">Cuisine: {meal.area}</span>}
                                        {meal.tags && <span>Tags: {meal.tags}</span>}
                                    </div>
                                </div>

                                <button
                                    onClick={toggleFavorite}
                                    className="text-3xl focus:outline-none"
                                >
                                    {isFavorite ? '❤️' : '🤍'}
                                </button>
                            </div>

                            <div className="md:flex mt-6">
                                <div className="md:w-1/3 mb-6 md:mb-0 md:pr-6">
                                    <img
                                        src={meal.thumbnail}
                                        alt={meal.title}
                                        className="w-full rounded-lg shadow-md"
                                    />

                                    {meal.youtube && (
                                        <div className="mt-4">
                                            <a
                                                href={meal.youtube}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-blue-600 hover:underline"
                                            >
                                                Watch on YouTube
                                            </a>
                                        </div>
                                    )}
                                </div>

                                <div className="md:w-2/3">
                                    <h2 className="text-xl font-semibold mb-4">Preparation Method</h2>
                                    <div className="whitespace-pre-line">
                                        {meal.instructions}
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8">
                                <h2 className="text-xl font-semibold mb-4">Ingredients</h2>
                                <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                                    {meal.ingredients && meal.ingredients.map((ingredient, index) => (
                                        <li key={index} className="flex items-center">
                                            <span className="mr-2">•</span>
                                            <span>
                                                {ingredient.name} {ingredient.measure && `(${ingredient.measure})`}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="mt-12 border-t pt-8">
                                <h2 className="text-xl font-semibold mb-6">Comments</h2>

                                <form onSubmit={handleSubmit} className="mb-8">
                                    <textarea
                                        value={data.content}
                                        onChange={e => setData('content', e.target.value)}
                                        className="w-full rounded-md border-gray-300 shadow-sm"
                                        rows="3"
                                        placeholder="Add a comment..."
                                    />
                                    <InputError message={errors.content} className="mt-2" />

                                    <div className="mt-4 flex justify-end">
                                        <PrimaryButton disabled={processing}>
                                            Add Comment
                                        </PrimaryButton>
                                    </div>
                                </form>

                                <div>
                                    {meal.comments && meal.comments.length > 0 ? (
                                        meal.comments.map(comment => (
                                            <div key={comment.id} className="mb-4 p-4 border rounded-lg">
                                                <div className="flex justify-between items-center mb-2">
                                                    <div className="font-semibold">
                                                        {comment.user.name}
                                                    </div>
                                                    <div className="text-sm text-gray-500">
                                                        {new Date(comment.created_at).toLocaleString()}
                                                    </div>
                                                </div>
                                                <div className="text-gray-700">{comment.content}</div>
                                            </div>
                                        ))
                                    ) : (
                                        <p className="text-gray-500 text-center py-4">
                                            No comments yet. Be the first!
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

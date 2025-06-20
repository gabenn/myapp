import React from 'react';
import { useForm, router } from '@inertiajs/react';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import DangerButton from '@/Components/DangerButton';

export default function CommentSection({ meal, auth }) {
    const { data, setData, post, processing, reset, errors } = useForm({
        content: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('comments.store', meal.id), {
            onSuccess: () => reset(),
        });
    };

    const handleDelete = (commentId) => {
        if (confirm('Are you sure you want to delete this comment?')) {
            router.delete(route('comments.destroy', commentId));
        }
    };

    return (
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

                            {auth.user.id === comment.user_id && (
                                <div className="mt-2 flex justify-end">
                                    <DangerButton
                                        onClick={() => handleDelete(comment.id)}
                                        className="ml-2"
                                    >
                                        Delete
                                    </DangerButton>
                                </div>
                            )}
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500 text-center py-4">
                        No comments yet. Be the first!
                    </p>
                )}
            </div>
        </div>
    );
}

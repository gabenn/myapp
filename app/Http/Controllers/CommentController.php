<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use App\Models\Meal;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CommentController extends Controller
{
    public function store(Request $request, Meal $meal): RedirectResponse
    {
        $request->validate([
            'content' => 'required|string|min:3|max:1000|not_regex:/^\s*$/',
        ], [
            'content.required' => 'Comment content is required.',
            'content.min' => 'Comment must be at least 3 characters long.',
            'content.max' => 'Comment cannot exceed 1000 characters.',
            'content.not_regex' => 'Comment cannot consist of only whitespace characters.',
        ]);

        $comment = new Comment([
            'user_id' => Auth::id(),
            'meal_id' => $meal->id,
            'content' => trim($request->input('content')),
        ]);

        $comment->save();

        return back()->with('success', 'Comment added successfully.');
    }

    public function destroy(Comment $comment): RedirectResponse
    {
        if (Auth::id() === $comment->user_id) {
            $comment->delete();
            return back()->with('success', 'Comment deleted successfully.');
        }

        return back()->with('error', 'You do not have permission to delete this comment.');
    }
}

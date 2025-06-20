<?php

namespace App\Http\Controllers;

use App\DTO\CommentDTO;
use App\Models\Comment;
use App\Models\Meal;
use App\Services\CommentService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CommentController extends Controller
{
    protected CommentService $commentService;

    public function __construct(CommentService $commentService)
    {
        $this->commentService = $commentService;
    }

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

        $commentDTO = CommentDTO::fromRequest(
            $request->only('content'),
            Auth::id(),
            $meal->id
        );

        $this->commentService->createComment($commentDTO);

        return back()->with('success', 'Comment added successfully.');
    }

    public function destroy(Comment $comment): RedirectResponse
    {
        if ($this->commentService->deleteComment($comment)) {
            return back()->with('success', 'Comment deleted successfully.');
        }

        return back()->with('error', 'You do not have permission to delete this comment.');
    }
}

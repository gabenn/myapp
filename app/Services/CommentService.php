<?php

namespace App\Services;

use App\DTO\CommentDTO;
use App\Models\Comment;
use Illuminate\Support\Facades\Auth;

class CommentService
{
    public function createComment(CommentDTO $commentDTO): Comment
    {
        return Comment::create($commentDTO->toArray());
    }

    public function deleteComment(Comment $comment): bool
    {
        if (Auth::id() !== $comment->user_id) {
            return false;
        }

        return $comment->delete();
    }
}

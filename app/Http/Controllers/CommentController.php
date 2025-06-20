<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use App\Models\Meal;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CommentController extends Controller
{
    public function store(Request $request, Meal $meal)
    {
        $request->validate([
            'content' => 'required|string|max:1000',
        ]);

        $comment = new Comment([
            'user_id' => Auth::id(),
            'meal_id' => $meal->id,
            'content' => $request->input('content')
        ]);

        $comment->save();

        return back();
    }
}

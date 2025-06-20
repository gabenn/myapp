<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Meal extends Model
{
    use HasFactory;

    protected $fillable = [
        'meal_id',
        'title',
        'instructions',
        'category',
        'area',
        'thumbnail',
        'youtube',
        'tags',
        'ingredients',
    ];

    protected $casts = [
        'ingredients' => 'array',
    ];

    public function comments(): HasMany
    {
        return $this->hasMany(Comment::class)->orderBy('created_at', 'desc');
    }
}

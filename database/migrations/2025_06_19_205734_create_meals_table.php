<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class() extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('meals', function (Blueprint $table): void {
            $table->id();
            $table->string('meal_id')->unique();
            $table->string('title');
            $table->text('instructions');
            $table->string('category')->nullable();
            $table->string('area')->nullable();
            $table->string('thumbnail')->nullable();
            $table->string('youtube')->nullable();
            $table->string('tags')->nullable();
            $table->json('ingredients')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('meals');
    }
};

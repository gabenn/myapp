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
        Schema::table('meals', function (Blueprint $table): void {
            $table->index('title');
        });

        Schema::table('comments', function (Blueprint $table): void {
            $table->index('meal_id');
            $table->index('created_at');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('meals', function (Blueprint $table): void {
            $table->dropIndex(['title']);
        });

        Schema::table('comments', function (Blueprint $table): void {
            $table->dropIndex(['meal_id']);
            $table->dropIndex(['created_at']);
        });
    }
};

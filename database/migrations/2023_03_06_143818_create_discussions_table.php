<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class() extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void {
        Schema::create('discussions', function(Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('category_id'); // Category of the discussion
            $table->unsignedBigInteger('user_id'); // User who created the discussion
            $table->string('title'); // Title of the discussion
            $table->string('slug'); // Slug of the discussion
            $table->text('content'); // Content of the discussion
            $table->boolean('pinned')->default(false); // Is the discussion pinned?
            $table->boolean('locked')->default(false); // Is the discussion locked?
            $table->boolean('solvable')->default(false); // Is the discussion solvable?
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void {
        Schema::dropIfExists('discussions');
    }
};

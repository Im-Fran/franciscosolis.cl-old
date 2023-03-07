<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class() extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void {
        Schema::create('discussion_comment_votes', function(Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('comment_id'); // Comment that the vote belongs to
            $table->unsignedBigInteger('user_id'); // User who created the vote
            $table->boolean('upvote'); // Is the vote an upvote? (If not, it's a downvote.)
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void {
        Schema::dropIfExists('discussion_comment_votes');
    }
};

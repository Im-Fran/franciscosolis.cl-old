<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class() extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void {
        Schema::create('discussion_comments', function(Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('discussion_id'); // Discussion that the comment belongs to
            $table->unsignedBigInteger('user_id'); // User who created the comment
            $table->text('content'); // Content of the comment
            $table->boolean('solution')->default(false); // Is the comment the solution
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void {
        Schema::dropIfExists('discussion_comments');
    }
};

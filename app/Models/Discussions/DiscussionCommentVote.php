<?php

namespace App\Models\Discussions;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DiscussionCommentVote extends Model {
    use HasFactory;

    protected $fillable = [
        'comment_id',
        'user_id',
        'upvote',
    ];

    public function comment() {
        return $this->belongsTo(DiscussionComment::class);
    }

    public function user() {
        return $this->belongsTo(User::class);
    }
}

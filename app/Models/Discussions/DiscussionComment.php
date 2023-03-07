<?php

namespace App\Models\Discussions;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Qirolab\Laravel\Reactions\Traits\Reactable;

class DiscussionComment extends Model {
    use HasFactory,
        Reactable,
        SoftDeletes;

    protected $fillable = [
        'discussion_id',
        'user_id',
        'content',
        'solution',
    ];

    protected $appends = [
        'upvotes_count',
        'downvotes_count',
        'votes_count',
    ];

    public function discussion() {
        return $this->belongsTo(Discussion::class);
    }

    public function user() {
        return $this->belongsTo(User::class);
    }

    public function votes() {
        return $this->hasMany(DiscussionCommentVote::class);
    }

    public function getUpvotesCountAttribute() {
        return $this->votes()->where('upvote', true)->count();
    }

    public function getDownvotesCountAttribute() {
        return $this->votes()->where('upvote', false)->count();
    }

    public function getVotesCountAttribute() {
        return $this->upvotes_count - $this->downvotes_count;
    }
}

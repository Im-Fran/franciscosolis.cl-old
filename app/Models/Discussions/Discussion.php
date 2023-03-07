<?php

namespace App\Models\Discussions;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Qirolab\Laravel\Reactions\Traits\Reactable;
use Spatie\Sluggable\HasSlug;
use Spatie\Sluggable\SlugOptions;

class Discussion extends Model {
    use HasFactory,
        HasSlug,
        Reactable,
        SoftDeletes;

    protected $fillable = [
        'category_id',
        'user_id',
        'title',
        'slug',
        'content',
        'pinned',
        'locked',
        'solvable',
    ];

    public function getSlugOptions(): SlugOptions {
        return SlugOptions::create()
            ->generateSlugsFrom('title')
            ->saveSlugsTo('slug');
    }

    public function category() {
        return $this->belongsTo(DiscussionCategory::class, 'category_id');
    }

    public function user() {
        return $this->belongsTo(\App\Models\User::class, 'user_id');
    }

    public function comments() {
        return $this->hasMany(DiscussionComment::class, 'discussion_id');
    }

    public function getRouteKeyName() {
        return 'slug';
    }
}

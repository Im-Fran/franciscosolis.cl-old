<?php

namespace App\Models\Discussions;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Spatie\Sluggable\HasSlug;
use Spatie\Sluggable\SlugOptions;

class DiscussionCategory extends Model {
    use HasFactory, HasSlug, SoftDeletes;

    protected $fillable = [
        'title',
        'slug',
        'color',
        'icon',
    ];

    public function getSlugOptions(): SlugOptions {
        return SlugOptions::create()
            ->generateSlugsFrom('title')
            ->saveSlugsTo('slug');
    }
}

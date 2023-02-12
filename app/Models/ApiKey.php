<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Collection;
use Illuminate\Support\Str;
use Silber\Bouncer\Database\HasRolesAndAbilities;

class ApiKey extends Model {
    use HasFactory,
        HasRolesAndAbilities;

    protected $fillable = [
        'user_id',
        'api_key',
        'label',
    ];

    protected $appends = [
        'permissions',
    ];

    private static function generateLabel(): string {
        return implode('-', [Str::random(4), Str::random(6), Str::random(4)]);
    }

    protected static function booted() {
        parent::booted();

        static::retrieved(function(ApiKey $apiKey) {
            if ($apiKey->label == null) {
                $apiKey->update([
                    'label' => self::generateLabel(),
                ]);
            }
        });
    }

    public function user(): BelongsTo {
        return $this->belongsTo(User::class);
    }

    /* Gets the available abilities that the API key can use. This is limited to the owner of the key */
    public function availableAbilities(): Collection {
        $user = $this->user();

        return $user->abilities->pluck('name')->merge($user->roles->flatMap(fn ($it) => $it->abilities->pluck('name')));
    }

    /* Gets the current permissions of the api key */
    public function getPermissionsAttribute() {
        return $this->abilities->pluck('name')->merge($this->roles->flatMap(fn ($it) => $it->abilities->pluck('name')));
    }
}

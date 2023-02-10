<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Collection;
use Silber\Bouncer\Database\HasRolesAndAbilities;

class ApiKey extends Model {
    use HasFactory,
        HasRolesAndAbilities;

    protected $fillable = [
        'user_id',
        'api_key',
        'label',
    ];

    public function label(): Attribute {
        return new Attribute(
            get: fn ($value) => $value ?? $this->api_key,
            set: fn ($value) => $value,
        );
    }

    public function user(): BelongsTo {
        return $this->belongsTo(User::class);
    }

    /* Gets the available abilities that the API key can use. This is limited to the owner of the key */
    public function availableAbilities(): Collection {
        $user = $this->user();

        return $user->abilities->pluck('name')->merge($user->roles->flatMap(fn ($it) => $it->abilities->pluck('name')));
    }
}

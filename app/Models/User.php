<?php

namespace App\Models;

use App\Traits\HasProfilePhoto;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Spatie\Permission\Traits\HasPermissions;
use Spatie\Permission\Traits\HasRoles;
use Spatie\Sluggable\HasSlug;
use Spatie\Sluggable\SlugOptions;

class User extends Authenticatable implements MustVerifyEmail {
    use HasFactory,
        HasSlug,
        HasApiTokens,
        Notifiable,
        HasRoles,
        HasPermissions,
        HasProfilePhoto;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'profile_photo_path',
        'gravatar_email',
	    'last_activity_at',
	    'two_factor_secret',
	    'two_factor_recovery_codes',
	    'two_factor_verified_at'
    ];

    /**
     * The attributes that should be appended to arrays.
     *
     * @var array<int, string>
     */
    protected $appends = [
        'profile_photo_url',
	    'two_factor_enabled',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
	    'two_factor_secret',
	    'two_factor_recovery_codes',
	    'two_factor_verified_at',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
	    'last_activity_at' => 'datetime',
	    'two_factor_verified_at' => 'datetime',
    ];

    public function getSlugOptions(): SlugOptions {
        return SlugOptions::create()
            ->generateSlugsFrom('name')
            ->saveSlugsTo('slug');
    }

    public function receivesBroadcastNotificationsOn(): string {
        return "User.$this->id";
    }

	public function getTwoFactorEnabledAttribute() {
		return !is_null($this->two_factor_secret);
	}

	/**
	 * Interact with the user's two-factor secret.
	 *
	 * @return Attribute
	 */
	protected function twoFactorSecret(): Attribute {
		return new Attribute(
			get: fn ($value) => $value != null ? decrypt($value) : null,
			set: fn ($value) => encrypt($value),
		);
	}

	/**
	 * Interact with the user's two-factor recovery codes.
	 *
	 * @return Attribute
	 */
	protected function twoFactorRecoveryCodes(): Attribute {
		return new Attribute(
			get: fn ($value) => $value != null ? decrypt($value) : null,
			set: fn ($value) => encrypt($value),
		);
	}

	public function validate2FA($input) {
		$google2fa = new \PragmaRX\Google2FA\Google2FA();
		return $google2fa->verifyKey($this->two_factor_secret, $input);
	}

}

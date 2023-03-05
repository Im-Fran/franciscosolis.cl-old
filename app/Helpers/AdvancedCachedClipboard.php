<?php

namespace App\Helpers;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Cache;
use Silber\Bouncer\CachedClipboard;

/* Credits: https://github.com/JosephSilber/bouncer/issues/430#issuecomment-488839014 */

class AdvancedCachedClipboard extends CachedClipboard {
    public function __construct() {
        parent::__construct(cache()->getStore());
    }

    protected $abilities = [];

    protected $roles = [];

    /**
     * Get the given authority's abilities.
     *
     * @param bool $allowed
     *
     * @return \Illuminate\Database\Eloquent\Collection
     */
    public function getAbilities(Model $authority, $allowed = true) {
        $key = $this->getCacheKey($authority, 'abilities', $allowed);

        return Cache::tags(['bouncer_abilities'])->remember($key, now()->addMinutes(5), function() use ($authority, $allowed) {
            return parent::getAbilities($authority, $allowed);
        });
    }

    /**
     * Get the given authority's roles.
     *
     * @return Collection
     */
    public function getRoles(Model $authority) {
        $key = $this->getCacheKey($authority, 'roles');

        return Cache::tags(['bouncer_roles'])->remember($key, now()->addMinutes(5), function() use ($authority) {
            return parent::getRoles($authority);
        });
    }

    /**
     * Clear the cache.
     *
     * @param null|Model $authority
     *
     * @return $this
     */
    public function refresh($authority = null) {
        parent::refresh($authority);

        if (is_null($authority)) {
            Cache::tags(['bouncer_abilities'])->flush();
            Cache::tags(['bouncer_roles'])->flush();
        }

        return $this;
    }

    /**
     * Clear the cache for the given authority.
     *
     * @return $this
     */
    public function refreshFor(Model $authority) {
        parent::refreshFor($authority);

        Cache::tags(['bouncer_abilities'])->forget($this->getCacheKey($authority, 'abilities', true));
        Cache::tags(['bouncer_abilities'])->forget($this->getCacheKey($authority, 'abilities', false));
        Cache::tags(['bouncer_roles'])->forget($this->getCacheKey($authority, 'roles'));

        return $this;
    }
}

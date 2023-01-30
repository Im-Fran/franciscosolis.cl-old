<?php

namespace App\Http\Middleware;

use Auth;
use Illuminate\Http\Request;
use Inertia\Middleware;
use Session;
use Silber\Bouncer\Database\Ability;
use Tightenco\Ziggy\Ziggy;

class HandleInertiaRequests extends Middleware {
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     *
     * @param \Illuminate\Http\Request $request
     *
     * @return null|string
     */
    public function version(Request $request) {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @param \Illuminate\Http\Request $request
     *
     * @return array
     */
    public function share(Request $request) {
        return array_merge(parent::share($request), [
            'auth' => function() use ($request) {
                $user = $request->user();

                return [
                    'user' => $user,
                    'check' => $user != null,
                    'can' => $user == null ? fn () => array_fill_keys(Ability::query()->select(['name'])->pluck('name')->toArray(), false) : \Cache::tags('abilities-check')->remember('abilities-check-'.Auth::id(), now()->addMinutes(15), function() use ($user) {
                        if ($user == null) {
                            return array_fill_keys(Ability::query()->select(['name'])->pluck('name')->toArray(), false);
                        }

                        return array_fill_keys($user->abilities->merge($user->roles->pluck('abilities')->flatten())->unique('name')->pluck('name')->toArray(), true) + array_fill_keys(Ability::query()->select(['name'])->pluck('name')->toArray(), false);
                    }),
                ];
            },
            'flash' => function() {
                if (flash()->message) {
                    $flash = flash();

                    return [
                        ['type' => $flash->class, 'message' => $flash->message],
                    ];
                }

                $filtered = array_filter([
                    'success' => Session::get('success'),
                    'error' => Session::get('errors') ? Session::get('errors')->getBag('default')->first() : null,
                ]);

                $data = [];
                if (isset($filtered['success'])) {
                    $data[] = [
                        'type' => 'success',
                        'message' => $filtered['success'],
                    ];
                }

                if (isset($filtered['error'])) {
                    $data[] = [
                        'type' => 'error',
                        'message' => $filtered['error'],
                    ];
                }

                return $data;
            },
            'utils' => [
                'global_warning' => 'This is a global warning!',
                'env' => app()->environment(),
            ],
            'ziggy' => function() use ($request) {
                return array_merge((new Ziggy())->toArray(), [
                    'location' => $request->url(),
                ]);
            },
        ]);
    }
}

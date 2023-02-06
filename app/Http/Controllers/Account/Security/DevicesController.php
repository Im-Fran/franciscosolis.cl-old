<?php

namespace App\Http\Controllers\Account\Security;

use App\Http\Controllers\Controller;
use App\Models\IpLocation;
use Cache;
use Carbon\Carbon;
use DB;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Response;
use Inertia\ResponseFactory;
use Jenssegers\Agent\Agent;

class DevicesController extends Controller {
    public function index(Request $request): Response|ResponseFactory {
        $user = $request->user();

        return inertia('Account/Security/Devices', [
            'meta' => [
                ['name' => 'og:title', 'content' => 'Account > Security > Devices'],
                ['name' => 'og:description', 'content' => 'Manage your devices'],
            ],
            'sessions' => fn () => DB::connection(config('session.connection'))->table(config('session.table', 'session'))
                ->where('user_id', $request->user()->id)
                ->whereNotIn('id', Cache::rememberForever("logout-{$user->id}", fn () => collect()))
                ->orderByDesc('last_activity')
                ->get(['id', 'user_agent', 'ip_address', 'last_activity'])
                ->map(function($session) use ($request) {
                    $agent = $this->createAgent($session);

                    return (object) [
                        'id' => $session->id,
                        'agent' => [
                            'platform' => $agent->platform(),
                            'browser' => $agent->browser(),
                            'type' => $this->getType($agent),
                        ],
                        'ip_address' => $session->ip_address,
                        'is_current_device' => $session->id === $request->session()->getId(),
                        'location' => IpLocation::get($session->ip_address)->location_string,
                        'last_active' => Carbon::parse($session->last_activity),
                    ];
                }),
        ]);
    }

    public function destroy(Request $request): RedirectResponse {
        $user = $request->user();
        $sessionId = $request->session_id;

        if ($sessionId === 'all') {
            $logouts = Cache::rememberForever("logout-{$user->id}", fn () => collect());
            $ids = DB::connection(config('session.connection'))->table(config('session.table', 'session'))
                ->where('user_id', $user->id)
                ->where('id', '!=', $request->session()->getId())
                ->whereNotIn('id', $logouts->toArray())
                ->pluck('id');
            $logouts->push(...$ids);
            Cache::forever("logout-{$user->id}", $logouts);

            return back()->with('success', 'All other devices have been logged out.');
        }

        $session = DB::connection(config('session.connection'))->table(config('session.table', 'session'))
            ->where('id', $sessionId)
            ->where('user_id', $user->id)
            ->first();

        if ($session) {
            $logouts = Cache::rememberForever("logout-{$user->id}", fn () => collect());
            if (!$logouts->contains($sessionId)) {
                $logouts->push($sessionId);
                Cache::forever("logout-{$user->id}", $logouts);
            }

            return back()->with('success', 'Device has been logged out.');
        }

        return back()->with('error', 'Device not found.');
    }

    protected function getType($agent): string {
        if ($agent->isDesktop()) {
            return 'Desktop';
        } elseif ($agent->isTablet()) {
            return 'Tablet';
        } elseif ($agent->isTV()) {
            return 'TV';
        }

        return 'Phone';
    }

    protected function createAgent($session) {
        return tap(new Agent(), fn ($agent) => $agent->setUserAgent($session->user_agent));
    }
}

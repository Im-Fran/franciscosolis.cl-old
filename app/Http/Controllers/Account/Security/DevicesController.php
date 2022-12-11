<?php

namespace App\Http\Controllers\Account\Security;

use App\Http\Controllers\Controller;
use Carbon\Carbon;
use DB;
use Illuminate\Http\Request;
use Jenssegers\Agent\Agent;

class DevicesController extends Controller {

    public function index(Request $request) {
        $sessions = collect(
            DB::connection(config('session.connection'))->table(config('session.table', 'session'))
                ->where('user_id', $request->user()->id)
                ->orderByDesc('last_activity')
                ->get()
        )->map(function($session) use ($request) {
            $agent = $this->createAgent($session);

            return (object) [
                'agent' => [
                    'is_desktop' => $agent->isDesktop(),
                    'platform' => $agent->platform(),
                    'browser' => $agent->browser(),
                ],
                'ip_address' => $session->ip_address,
                'is_current_device' => $session->id === $request->session()->getId(),
                'last_active' => Carbon::createFromTimestamp($session->last_activity)->diffForHumans(),
            ];
        });

        return inertia('Account/Security/Devices', [
            'sessions' => $sessions,
        ]);
    }

    protected function createAgent($session) {
        return tap(new Agent, fn($agent) => $agent->setUserAgent($session->user_agent));
    }
}

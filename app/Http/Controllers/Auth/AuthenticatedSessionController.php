<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Notifications\Account\LoginNotification;
use App\Providers\RouteServiceProvider;
use DeviceDetector\DeviceDetector;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Stevebauman\Location\Facades\Location;

class AuthenticatedSessionController extends Controller
{
    /**
     * Display the login view.
     *
     * @return \Inertia\Response
     */
    public function create()
    {
        return Inertia::render('Auth/Login', [
            'canResetPassword' => Route::has('password.request'),
            'status' => session('status'),
        ]);
    }

    /**
     * Handle an incoming authentication request.
     *
     * @param  \App\Http\Requests\Auth\LoginRequest  $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function store(LoginRequest $request) {
        $request->authenticate();

        $request->session()->regenerate();

        $ip = $request->ip();
        $location = Location::get($ip);
        if($location == null) {
            $location = 'Unknown Location';
        } else {
            $location = $location->cityName . ', ' . $location->regionName . ', ' . $location->countryName;
        }
        $device = $request->header('User-Agent') ?? 'Unknown Device';
        if($device != 'Unknown Device') {
            $deviceDetector = new DeviceDetector($device);
            $deviceDetector->parse();
            if($deviceDetector->isBot()) {
                $device = 'Bot';
            } else {
                $browserClient = $deviceDetector->getClient('name') . ' (' . $deviceDetector->getClient('version') . ')';
                $deviceClient = $deviceDetector->getOs('name');
                $device = $browserClient . ' on ' . $deviceClient;
            }
        }
        $request->user()->notify(new LoginNotification($ip, $device, $location));

        return redirect()->intended(RouteServiceProvider::HOME);
    }

    /**
     * Destroy an authenticated session.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function destroy(Request $request)
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return redirect('/');
    }
}

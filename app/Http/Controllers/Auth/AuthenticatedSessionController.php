<?php

namespace App\Http\Controllers\Auth;

use App\Contracts\TwoFactorAuthenticationProvider;
use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Models\User;
use App\Notifications\Account\LoginNotification;
use App\Providers\RouteServiceProvider;
use DeviceDetector\DeviceDetector;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Inertia\Response;
use Stevebauman\Location\Facades\Location;

class AuthenticatedSessionController extends Controller {
	
	private function authenticate(Request $request){
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
	}
	
    /**
     * Display the login view.
     *
     * @return Response
     */
    public function create() {
        return Inertia::render('Auth/Login', [
            'canResetPassword' => Route::has('password.request'),
            'status' => session('status'),
        ]);
    }

    /**
     * Handle an incoming authentication request.
     *
     * @param LoginRequest $request
     * @return RedirectResponse
     */
    public function store(LoginRequest $request) {
		$user = User::whereEmail($request->email)->first();
		
		// Check that the user requires 2FA
	    if($user->two_factor_secret){
			session()->put('auth.user.id', $user->id);
		    return redirect()->route('2fa');
	    } else {
		    $this->authenticate($request);
		    return redirect()->intended(RouteServiceProvider::HOME);
	    }
    }

    /**
     * Destroy an authenticated session.
     *
     * @param Request $request
     * @return RedirectResponse
     */
    public function destroy(Request $request) {
        Auth::guard('web')->logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return redirect('/');
    }
}

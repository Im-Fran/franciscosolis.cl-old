<?php

namespace App\Http\Controllers\Auth;

use App\Helpers\Helpers;
use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\TwoFactorAuthRequest;
use App\Models\User;
use App\Providers\RouteServiceProvider;
use Illuminate\Http\Request;
use Psr\Container\ContainerExceptionInterface;
use Psr\Container\NotFoundExceptionInterface;

class TwoFactorAuthController extends Controller {

	public function show(Request $request) {
        if(!session()->has('auth.user.id')) {
            return redirect()->route('login')->withErrors(['Your session has expired! Please try again.']);
        }

        $user = User::find(session()->get('auth.user.id'));
        if(!$user->two_factor_enabled) { // Authenticate if user has no 2fa
            Helpers::authenticate($request);
            return redirect()->intended(RouteServiceProvider::HOME);
        }

		return inertia('Auth/TwoFactorAuth');
	}

	public function store(TwoFactorAuthRequest $request) {
		try {
			if(!session()->has('auth.user.id')) {
				return redirect()->route('login')->withErrors(['Your session has expired! Please try again.']);
			}

			$user = User::find(session()->get('auth.user.id'));
			if($user->validate2FA($request->one_time_password)) {
				Helpers::authenticate($request);
				return redirect()->intended(RouteServiceProvider::HOME);
			} else {
				return redirect()->back()->withErrors(['Invalid 2FA code.']);
			}
		}catch(\Exception|NotFoundExceptionInterface|ContainerExceptionInterface $e) {
			return redirect()->route('login')->withErrors([$e->getMessage()]);
		}
	}
}

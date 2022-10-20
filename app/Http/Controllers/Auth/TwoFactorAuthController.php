<?php

namespace App\Http\Controllers\Auth;

use App\Contracts\TwoFactorAuthenticationProvider;
use App\Helpers\Helpers;
use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\TwoFactorAuthRequest;
use App\Models\User;
use App\Providers\RouteServiceProvider;
use Illuminate\Http\Request;
use Psr\Container\ContainerExceptionInterface;
use Psr\Container\NotFoundExceptionInterface;

class TwoFactorAuthController extends Controller {

	public function show() {
		return inertia('Auth/TwoFactorAuth');
	}

	public function store(TwoFactorAuthRequest $request) {
		try {
			if(!session()->has('auth.user.id')) {
				return redirect()->route('login')->withErrors(['Your session has expired! Please try again.']);
			}

			$code = $request->one_time_password;
			$user = User::find(session()->get('auth.user.id'));
			if(app(TwoFactorAuthenticationProvider::class)->verify($user->two_factor_secret, $code)) {
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

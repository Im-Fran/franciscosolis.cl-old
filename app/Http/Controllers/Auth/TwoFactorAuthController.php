<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\TwoFactorAuthRequest;
use App\Providers\RouteServiceProvider;
use Illuminate\Http\Request;

class TwoFactorAuthController extends Controller {
 
	public function show() {
		return inertia('Auth/TwoFactorAuth');
	}
	
	public function store(TwoFactorAuthRequest $request) {
		if(!session()->has('auth.user.id')) {
			return redirect()->route('login')->withErrors(['Your session has expired! Please try again.']);
		}
		
		$code = $request->one_time_password;
	}
}

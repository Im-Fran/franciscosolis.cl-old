<?php

namespace App\Http\Controllers\Auth;

use App\Helpers\Helpers;
use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Models\User;
use App\Providers\RouteServiceProvider;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Response;
use function inertia;

class AuthenticatedSessionController extends Controller {

    /**
     * Display the login view.
     *
     * @return Response
     */
    public function create() {
        return inertia('Auth/Login', [
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

        session()->put('auth.user.id', $user->id);
        session()->put('auth.user.remember', $request->boolean('remember'));

        // Check that the user requires 2FA
	    if($user->two_factor_secret){
		    return redirect()->route('2fa');
	    } else {
		    Helpers::authenticate($request);
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

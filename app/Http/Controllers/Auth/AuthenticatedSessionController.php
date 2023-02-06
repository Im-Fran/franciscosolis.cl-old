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
use Illuminate\Validation\ValidationException;
use function inertia;
use Inertia\Response;

class AuthenticatedSessionController extends Controller {
    /**
     * Display the login view.
     *
     * @return Response
     */
    public function create(): Response {
        return inertia('Auth/Login', [
            'meta' => [
                ['name' => 'og:title', 'content' => 'Auth > Login'],
                ['name' => 'og:description', 'content' => 'Login to your account'],
            ],
            'canResetPassword' => Route::has('password.request'),
            'status' => session('status'),
        ]);
    }

    /**
     * Handle an incoming authentication request.
     *
     * @param LoginRequest $request
     *
     * @throws ValidationException
     *
     * @return RedirectResponse
     */
    public function store(LoginRequest $request): RedirectResponse {
        $user = User::whereEmail($request->email)->first();
        $request->authenticate(); // Just make sure is not rate limited and that the credentials are valid

        session()->put('auth.user.id', $user->id);
        session()->put('auth.user.remember', $request->boolean('remember'));

        // Check that the user requires 2FA
        if ($user->two_factor_secret) {
            return redirect()->route('2fa');
        }
        Helpers::authenticate($request);

        return redirect()->intended(RouteServiceProvider::HOME);
    }

    /**
     * Destroy an authenticated session.
     *
     * @param Request $request
     *
     * @return RedirectResponse
     */
    public function destroy(Request $request): RedirectResponse {
        Auth::guard('web')->logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return redirect('/');
    }
}

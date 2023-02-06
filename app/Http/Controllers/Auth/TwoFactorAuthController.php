<?php

namespace App\Http\Controllers\Auth;

use App\Helpers\Helpers;
use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\TwoFactorAuthRequest;
use App\Models\User;
use App\Providers\RouteServiceProvider;
use Exception;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Response;
use Inertia\ResponseFactory;
use Psr\Container\ContainerExceptionInterface;
use Psr\Container\NotFoundExceptionInterface;

class TwoFactorAuthController extends Controller {
    public function show(Request $request): Response|ResponseFactory|RedirectResponse {
        if (!session()->has('auth.user.id')) {
            return redirect()->route('login')->withErrors(['Your session has expired! Please try again.']);
        }

        $user = User::find(session()->get('auth.user.id'));
        if (!$user->two_factor_enabled) { // Authenticate if user has no 2fa
            Helpers::authenticate($request);

            return redirect()->intended(RouteServiceProvider::HOME);
        }

        return inertia('Auth/TwoFactorAuth', [
            'meta' => [
                ['name' => 'og:title', 'content' => 'Auth > 2FA Verification'],
                ['name' => 'og:description', 'content' => 'Confirm your identity with a 2FA code or a recovery code.'],
            ],
        ]);
    }

    public function store(TwoFactorAuthRequest $request): RedirectResponse {
        try {
            if (!session()->has('auth.user.id')) {
                return redirect(route('login'))->withErrors(['Your session has expired! Please try again.']);
            }

            $user = User::find(session()->get('auth.user.id'));
            if ($user->validate2FA($request->one_time_password)) {
                Helpers::authenticate($request);

                return redirect()->intended(RouteServiceProvider::HOME);
            }

            return redirect(route('2fa'))->withErrors(['one_time_password' => 'Invalid 2FA code.']);
        } catch (Exception|NotFoundExceptionInterface|ContainerExceptionInterface $e) {
            return redirect(route('login'))->withErrors([$e->getMessage()]);
        }
    }
}

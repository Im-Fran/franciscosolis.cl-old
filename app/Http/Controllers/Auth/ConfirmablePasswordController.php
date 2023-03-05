<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Providers\RouteServiceProvider;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;
use Inertia\Response;

class ConfirmablePasswordController extends Controller {
    /**
     * Show the confirm password view.
     */
    public function show(): Response {
        return inertia('Auth/ConfirmPassword', [
            'meta' => [
                ['name' => 'og:title', 'content' => 'Auth > Confirm Password'],
                ['name' => 'og:description', 'content' => 'Confirm your password before continuing'],
            ],
        ]);
    }

    /**
     * Confirm the user's password.
     *
     * @throws ValidationException
     */
    public function store(Request $request): RedirectResponse {
        if (!Auth::guard('web')->validate([
            'email' => $request->user()->email,
            'password' => $request->password,
        ])) {
            throw ValidationException::withMessages(['password' => __('auth.password')]);
        }

        $request->session()->put('auth.password_confirmed_at', time());

        return redirect()->intended(RouteServiceProvider::HOME);
    }
}

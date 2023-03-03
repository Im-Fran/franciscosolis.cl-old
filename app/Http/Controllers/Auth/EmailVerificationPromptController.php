<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Providers\RouteServiceProvider;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Response;
use Inertia\ResponseFactory;

class EmailVerificationPromptController extends Controller {
    /**
     * Display the email verification prompt.
     */
    public function __invoke(Request $request): RedirectResponse|ResponseFactory|Response {
        if ($request->user()->hasVerifiedEmail()) {
            return redirect()->intended(RouteServiceProvider::HOME);
        }

        return inertia('Auth/VerifyEmail', [
            'meta' => [
                ['name' => 'og:title', 'content' => 'Auth > Email Verification'],
                ['name' => 'og:description', 'content' => 'Please check your email for a verification link.'],
            ],
            'status' => session('status'),
        ]);
    }
}

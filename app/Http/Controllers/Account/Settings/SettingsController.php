<?php

namespace App\Http\Controllers\Account\Settings;

use App\Http\Controllers\Controller;
use App\Http\Requests\Account\UpdateProfileRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Response;
use Inertia\ResponseFactory;

class SettingsController extends Controller {
    /* Show the settings page */
    public function index(Request $request): Response|ResponseFactory {
        return inertia('Account/Settings', [
            'meta' => [
                ['name' => 'og:title', 'content' => 'Account > Settings'],
                ['name' => 'og:description', 'content' => 'Update your account settings'],
            ],
        ]);
    }

    /* Update the user's settings */
    public function update(UpdateProfileRequest $request): RedirectResponse {
        $data = $request->only('name', 'email', 'gravatar_email');
        $request->user()->update($data);

        return back();
    }
}

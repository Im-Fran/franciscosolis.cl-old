<?php

namespace App\Http\Controllers\Account\Settings;

use App\Http\Controllers\Controller;
use App\Http\Requests\Account\UpdateProfileRequest;
use Illuminate\Http\Request;

class SettingsController extends Controller {
    /* Show the settings page */
    public function index(Request $request) {
        return inertia('Account/Settings');
    }

    /* Update the user's settings */
    public function update(UpdateProfileRequest $request) {
        $data = $request->only('name', 'email', 'gravatar_email');
        $request->user()->update($data);

        return back();
    }
}

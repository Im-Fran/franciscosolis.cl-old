<?php

namespace App\Http\Controllers\Account\Settings;

use App\Helpers\UserSettings;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class PrivacyController extends Controller {

    /* Updates the Privacy Settings */
    public function update(Request $request) {
        $request->validate(UserSettings::$validation);

        $request->user()->updateSettings($request->all());
    }
}

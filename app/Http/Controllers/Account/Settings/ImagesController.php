<?php

namespace App\Http\Controllers\Account\Settings;

use App\Http\Controllers\Controller;
use App\Http\Requests\Account\ProfilePhotoUpdateRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class ImagesController extends Controller {
    /* Update the profile photo for the current user */
    public function uploadProfilePhoto(ProfilePhotoUpdateRequest $request): RedirectResponse {
        $user = $request->user();
        $user->updateProfilePhoto($request->type === 'file' ? $request->profile_photo : $request->type);

        return back();
    }

    /* Clears the profile photo for the current user */
    public function clearProfilePhoto(Request $request): RedirectResponse {
        $user = $request->user();
        $user->deleteProfilePhoto();

        return back();
    }
}

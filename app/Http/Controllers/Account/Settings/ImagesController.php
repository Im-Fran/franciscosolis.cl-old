<?php

namespace App\Http\Controllers\Account\Settings;

use App\Http\Controllers\Controller;
use App\Http\Requests\Account\ProfilePhotoUpdateRequest;
use Illuminate\Http\Request;

class ImagesController extends Controller {
    /* Update the profile photo for the current user */
    public function uploadProfilePhoto(ProfilePhotoUpdateRequest $request) {
        $user = $request->user();
        $photo = $request->gravatar ? 'gravatar' : $request->profile_photo;
        if ($photo === 'gravatar' && $user->profile_photo_path === 'gravatar') {
            return back()->withErrors(['You already have a gravatar set as your profile photo.']);
        }
        $user->updateProfilePhoto($photo);

        return back();
    }

    /* Clears the profile photo for the current user */
    public function clearProfilePhoto(Request $request) {
        $user = $request->user();
        $user->deleteProfilePhoto();

        return back();
    }
}

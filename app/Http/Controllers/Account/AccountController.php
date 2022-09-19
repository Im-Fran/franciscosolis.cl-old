<?php

namespace App\Http\Controllers\Account;

use App\Http\Controllers\Controller;
use App\Http\Requests\Account\ProfilePhotoUpdateRequest;
use App\Http\Requests\Account\UpdateProfileRequest;
use Illuminate\Http\Request;

class AccountController extends Controller {

    /* Show the account overview page */
    public function index(Request $request) {
        return inertia('Account/Index');
    }

    /* Show the settings page */
    public function settings(Request $request) {
        return inertia('Account/Settings');
    }

    /* Update the user's settings */
    public function update(UpdateProfileRequest $request) {
        $data = $request->only('name', 'email');
        $request->user()->update($data);

        return back();
    }

    /* Update the profile photo for the current user */
    public function uploadProfilePhoto(ProfilePhotoUpdateRequest $request) {
        $user = $request->user();
        $file = $request->profile_photo;
        $user->updateProfilePhoto($file);
        return back();
    }

    /* Clears the profile photo for the current user */
    public function clearProfilePhoto(Request $request){
        $user = $request->user();
        $user->deleteProfilePhoto();
        return back();
    }

}

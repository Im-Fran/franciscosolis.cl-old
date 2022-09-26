<?php

namespace App\Http\Controllers\Account;

use App\Http\Controllers\Controller;
use App\Http\Requests\Account\ProfilePhotoUpdateRequest;
use App\Http\Requests\Account\UpdateProfileRequest;
use Illuminate\Http\Request;

class AccountController extends Controller {

    /* Show the account overview page */
    public function index(Request $request) {
        return inertia('Account/Index', [
            'notifications' => fn() => $request->user()->unreadNotifications()->get(),
        ]);
    }

    /* Mark the given notification as read */
    public function markAsRead($notification){
        \Auth::user()->notifications()->find($notification)->markAsRead();
        return redirect()->back();
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
        $photo = $request->gravatar ? 'gravatar' : $request->profile_photo;
        if($photo === 'gravatar' && $user->profile_photo_path === 'gravatar') {
            return back()->withErrors(['You already have a gravatar set as your profile photo.']);
        }
        $user->updateProfilePhoto($photo);
        return back();
    }

    /* Clears the profile photo for the current user */
    public function clearProfilePhoto(Request $request){
        $user = $request->user();
        $user->deleteProfilePhoto();
        return back();
    }

}

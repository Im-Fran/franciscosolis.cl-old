<?php

namespace App\Http\Controllers\Account;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Auth;

class NotificationsController extends Controller {

    /* Shows the notifications page */
    public function index(Request $request) {
        $user = $request->user();
        return inertia('Account/Notifications', [
            'notifications' => fn() => $user->readNotifications()->paginate(),
            'unreadNotifications' => fn() => $user->unreadNotifications()->get(),
        ]);
    }

    /* Mark the given notification as read */
    public function markAsRead($notification){
        \Auth::user()->notifications()->find($notification)->markAsRead();
        return redirect()->back();
    }

    /* Delete the given notification */
    public function delete($notification){
        \Auth::user()->notifications()->find($notification)->delete();
        return redirect()->back();
    }
}

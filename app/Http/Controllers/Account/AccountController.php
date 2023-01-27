<?php

namespace App\Http\Controllers\Account;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;

class AccountController extends Controller {
    /* Show the account overview page */
    public function index(Request $request) {
		$user = $request->user();
        return inertia('Account/Index', [
            'notifications' => fn () => $user->unreadNotifications()->select(['id', 'type', 'data', 'created_at'])->orderByDesc('created_at')->limit(5)->get(),
            'notificationsCount' => fn () => \DB::table('notifications')
	            ->where('notifiable_type', '=', User::class)
	            ->where('notifiable_id', '=', $user->id)
	            ->count(['id']),
        ]);
    }
}

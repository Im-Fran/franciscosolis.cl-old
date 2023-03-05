<?php

namespace App\Http\Controllers\Account;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Response;
use Inertia\ResponseFactory;

class NotificationsController extends Controller {
    /* Shows the notifications page */
    public function index(Request $request): Response|ResponseFactory {
        $user = $request->user();

        return inertia('Account/Notifications', [
            'meta' => [
                ['name' => 'og:title', 'content' => 'Account > Notifications'],
                ['name' => 'og:description', 'content' => 'Account notifications'],
            ],
            'notifications' => fn () => $user->readNotifications()->paginate(
                $request->input('notifications_per_page', 5) ?? 5,
                ['*'],
                'notifications_page',
            ),
            'unreadNotifications' => fn () => $user->unreadNotifications()->paginate(
                $request->input('unread_notifications_per_page', 5) ?? 5,
                ['*'],
                'unread_notifications_page',
            ),
        ]);
    }

    /* Mark the given notification as read */
    public function markAsRead($notification): RedirectResponse {
        Auth::user()->notifications()->find($notification)->markAsRead();

        return redirect()->back();
    }

    /* Delete the given notification */
    public function delete($notification): RedirectResponse {
        Auth::user()->notifications()->find($notification)->delete();

        return redirect()->back();
    }
}

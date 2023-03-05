<?php

namespace App\Http\Controllers\Account;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Response;
use Inertia\ResponseFactory;

class AccountController extends Controller {
    /* Show the account overview page */
    public function index(Request $request): Response|ResponseFactory {
        $user = $request->user();

        return inertia('Account/Index', [
            'meta' => [
                ['name' => 'og:title', 'content' => 'Account > Overview'],
                ['name' => 'og:description', 'content' => 'Account overview'],
            ],
            'notifications' => fn () => $user->unreadNotifications()->select(['id', 'type', 'data', 'created_at'])->orderByDesc('created_at')->limit(5)->get(),
            'notificationsCount' => fn () => DB::table('notifications')
                ->where('notifiable_type', '=', User::class)
                ->where('notifiable_id', '=', $user->id)
                ->count(['id']),
        ]);
    }
}

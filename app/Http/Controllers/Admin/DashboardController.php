<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Inertia\Response;
use Inertia\ResponseFactory;
use Silber\Bouncer\Database\Ability;
use Silber\Bouncer\Database\Role;

class DashboardController extends Controller {
    public function index(): Response|ResponseFactory {
        return inertia('Admin/Dashboard', [
            'registeredUsers' => fn () => User::withTrashed()->count(),
            'abilities' => fn () => Ability::query()->count(),
            'roles' => fn () => Role::query()->count(),
        ]);
    }
}

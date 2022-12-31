<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;

class DashboardController extends Controller {
    public function index() {
        return inertia('Admin/Dashboard', [
            'registeredUsers' => fn () => User::count(),
        ]);
    }
}

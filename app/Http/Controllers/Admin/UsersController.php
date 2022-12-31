<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;

class UsersController extends Controller {
    public function index() {
        return inertia('Admin/Users/Index', [
            'users' => fn () => User::paginate(10),
        ]);
    }
}

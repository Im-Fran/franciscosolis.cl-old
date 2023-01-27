<?php

namespace App\Http\Controllers\Admin\Access;

use App\Http\Controllers\Controller;
use Inertia\Response;
use Silber\Bouncer\Database\Role;

class RolesController extends Controller {
    public function index(): Response {
        $roles = Role::all();
        dd($roles);
    }
}

<?php

namespace App\Http\Controllers\Admin\Access;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Access\CreateRoleRequest;
use App\Http\Requests\Admin\Access\EditRoleRequest;
use Illuminate\Http\Request;
use Inertia\Response;
use Silber\Bouncer\Database\Role;

class RolesController extends Controller {
    public function index(Request $request): Response {
        $search = '%'.strtolower($request->input('search', '')).'%';
        $roles = Role::query()
            ->select(['id', 'name', 'title', 'created_at'])
            ->where(function($query) use ($search) {
                $query->whereRaw('LOWER(name) LIKE ?', [$search])
                    ->orWhereRaw('LOWER(title) LIKE ?', [$search]);
            })
            ->withCount('abilities')
            ->withCount('users')
            ->orderBy('name')
            ->paginate();

        return inertia('Admin/Roles/Index', [
            'roles' => $roles,
        ]);
    }

    public function store(CreateRoleRequest $request) {
        Role::create([
            'name' => $request->input('name'),
            'title' => $request->input('title'),
        ]);

        return back()->with('success', 'Role created successfully');
    }

    public function edit(Role $role) {
        return inertia('Admin/Roles/Edit', [
            'role' => $role,
        ]);
    }

    public function update(Role $role, EditRoleRequest $request) {
        $role->update([
            'name' => $request->input('name'),
            'title' => $request->input('title'),
        ]);

        return back()->with('success', 'Role updated successfully');
    }

    public function destroy(Role $role) {
        $title = $role->title;
        $role->delete();

        return back()->with('success', "Role {$title} deleted successfully");
    }
}

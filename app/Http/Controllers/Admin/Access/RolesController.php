<?php

namespace App\Http\Controllers\Admin\Access;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Access\CreateRoleRequest;
use App\Http\Requests\Admin\Access\EditRoleRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Response;
use Inertia\ResponseFactory;
use Silber\Bouncer\Database\Ability;
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
            'meta' => [
                ['name' => 'og:title', 'content' => 'Admin > Roles'],
                ['name' => 'og:description', 'content' => 'Manage roles'],
            ],
            'roles' => $roles,
        ]);
    }

    public function store(CreateRoleRequest $request): RedirectResponse {
        Role::create([
            'name' => $request->input('name'),
            'title' => $request->input('title'),
        ]);

        return back()->with('success', 'Role created successfully');
    }

    public function edit(Role $role): Response|ResponseFactory {
        $role->load('abilities');

        return inertia('Admin/Roles/Edit', [
            'meta' => [
                ['name' => 'og:title', 'content' => "Admin > Roles > Edit {$role->title}"],
                ['name' => 'og:description', 'content' => "Edit role {$role->title}"],
            ],
            'role' => $role,
            'abilities' => Ability::query()->select(['id', 'name', 'title'])->get(),
        ]);
    }

    public function update(Role $role, EditRoleRequest $request): RedirectResponse {
        $role->update([
            'name' => $request->input('name'),
            'title' => $request->input('title'),
        ]);
        $role->abilities()->sync(Ability::query()->whereIn('name', $request->permissions)->select(['id'])->pluck('id')->toArray());

        return back()->with('success', 'Role updated successfully');
    }

    public function destroy(Role $role): RedirectResponse {
        $title = $role->title;
        $role->delete();

        return back()->with('success', "Role {$title} deleted successfully");
    }
}

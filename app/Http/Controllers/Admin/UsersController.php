<?php

namespace App\Http\Controllers\Admin;

use App\Helpers\UserSettings;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Users\EditUserRequest;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Response;
use Inertia\ResponseFactory;
use Silber\Bouncer\Database\Ability;
use Silber\Bouncer\Database\Role;

class UsersController extends Controller {
    /* Shows the user list */
    public function index(): Response|ResponseFactory {
        $search = '%'.strtolower(request('search', '')).'%';
        $order = request('order', 'created_at');
        $orderBy = request('orderBy', 'asc');
        $users = User::withTrashed()
            ->whereRaw('LOWER(name) LIKE ?', [$search])
            ->orWhereRaw('LOWER(email) LIKE ?', [$search])
            ->orderBy($order, $orderBy)
            ->paginate(10);

        return inertia('Admin/Users/Index', [
            'meta' => [
                ['name' => 'og:title', 'content' => 'Admin > Users'],
                ['name' => 'og:description', 'content' => 'Manage users'],
            ],
            'users' => $users,
        ]);
    }

    /* Restores a deleted user */
    public function restore(User $user): RedirectResponse {
        $user->restore();

        return back()->with('success', "{$user->name}'s account has been restored!");
    }

    /* Marks the given user as deleted */
    public function delete(User $user): RedirectResponse {
        $user->delete();

        return back()->with('success', "{$user->name} has been deleted!");
    }

    /* Show edit form for the given user */
    public function edit(User $user): Response|ResponseFactory {
        $user->load(['abilities', 'roles']);

        return inertia('Admin/Users/Edit', [
            'meta' => [
                ['name' => 'og:title', 'content' => "Admin > Users > Edit {$user->name}"],
                ['name' => 'og:description', 'content' => "Edit {$user->name}'s account"],
            ],
            'user' => fn () => $user,
            'abilities' => fn () => Ability::query()->select(['title', 'name'])->get(),
            'roles' => fn () => Role::query()->select(['title', 'name'])->get(),
        ]);
    }

    /* Updates the given user and synchronizes the abilities and roles */
    public function update(EditUserRequest $request, User $user): RedirectResponse {
        $data = $request->only(['name', 'email']);
        $user->update($data);

        $abilities = Ability::query()->select(['id'])->whereIn('name', $request->abilities)->pluck('id')->toArray();
        $user->abilities()->sync($abilities);

        $roles = Role::query()->select(['id'])->whereIn('name', $request->roles)->pluck('id')->toArray();
        $user->roles()->sync($roles);

        return redirect(route('admin.users.edit', ['user' => $user->slug]));
    }

    /* Updates the privacy settings for the given user */
    public function updatePrivacy(Request $request, User $user): RedirectResponse {
        $request->validate(UserSettings::$validation);

        $user->updateSettings($request->all());

        return redirect(route('admin.users.edit', ['user' => $user->slug]));
    }

    /* Resets the profile photo */
    public function resetImage(User $user): RedirectResponse {
        $user->deleteProfilePhoto();

        return redirect(route('admin.users.edit', ['user' => $user->slug]));
    }
}

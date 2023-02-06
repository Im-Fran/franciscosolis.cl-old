<?php

namespace App\Http\Controllers\Admin\Access;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Access\CreatePermissionRequest;
use App\Http\Requests\Admin\Access\EditPermissionRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Response;
use Inertia\ResponseFactory;
use Silber\Bouncer\Database\Ability;

class PermissionsController extends Controller {
    public function index(Request $request): Response|ResponseFactory {
        $search = '%'.strtolower($request->input('search', '')).'%';

        return inertia('Admin/Permissions/Index', [
            'meta' => [
                ['name' => 'og:title', 'content' => 'Admin > Permissions'],
                ['name' => 'og:description', 'content' => 'Manage permissions'],
            ],
            'permissions' => fn () => Ability::query()->where(function($query) use ($search) {
                $query->whereRaw('LOWER(name) LIKE ?', $search)
                    ->orWhereRaw('LOWER(title) LIKE ?', $search);
            })->paginate(),
        ]);
    }

    public function store(CreatePermissionRequest $request): RedirectResponse {
        Ability::create([
            'name' => $request->input('name'),
            'title' => $request->input('title'),
        ]);

        return back()->with('success', 'Permission created successfully');
    }

    public function update(Ability $ability, EditPermissionRequest $request): RedirectResponse {
        $ability->update([
            'name' => $request->input('name'),
            'title' => $request->input('title'),
        ]);

        return back()->with('success', 'Permission updated successfully');
    }

    public function destroy(Ability $ability): RedirectResponse {
        $title = $ability->title;
        $ability->delete();

        return back()->with('success', "Permission {$title} deleted successfully");
    }
}

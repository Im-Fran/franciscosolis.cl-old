<?php

namespace App\Http\Controllers\Admin\Access;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Access\CreatePermissionRequest;
use Bouncer;
use DB;
use Illuminate\Http\Request;
use Silber\Bouncer\Database\Ability;

class PermissionsController extends Controller {

    public function index(Request $request){
        $search = '%' . strtolower($request->input('query', '')) . '%';

        return inertia('Admin/Permissions/Index', [
            'permissions' => fn() => Ability::query()->where(function($query) use($search) {
                $query->whereRaw('LOWER(name) LIKE ?', $search)
                    ->orWhereRaw('LOWER(title) LIKE ?', $search);
            })->paginate(),
        ]);
    }

    public function store(CreatePermissionRequest $request) {
        Ability::create([
            'name' => $request->input('name'),
            'title' => $request->input('title'),
        ]);

        return back()->with('success', 'Permission created successfully');
    }

    public function edit(Ability $ability) {
        return inertia('Admin/Permissions/Edit', [
            'permission' => $ability,
        ]);
    }

    public function update(Ability $ability, CreatePermissionRequest $request) {
        $ability->update([
            'name' => $request->input('name'),
            'title' => $request->input('title'),
        ]);

        return back()->with('success', 'Permission updated successfully');
    }

    public function destroy(Ability $ability) {
        $title = $ability->title;
        $ability->delete();

        return back()->with('success', "Permission $title deleted successfully");
    }
}

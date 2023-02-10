<?php

namespace App\Http\Controllers\Account\Security;

use App\Http\Controllers\Controller;
use App\Models\ApiKey;
use Auth;
use Illuminate\Http\Request;
use Inertia\Response;
use Inertia\ResponseFactory;
use Silber\Bouncer\Database\Role;

class ApiKeysController extends Controller {
 
	/* Get the list of API Keys */
	public function index(Request $request): Response|ResponseFactory {
		return inertia('Account/ApiKeys', [
			'meta' => [
				['name' => 'og:title', 'content' => 'Account > API Keys'],
				['name' => 'og:title', 'content' => 'List of your API Keys'],
			],
			'apiKeys' => function() use ($request) {
				$user = Auth::user();
				$search = '%' . strtolower($request->input('search', '')) . '%';
				$order = $request->input('order', 'created_at');
				$orderBy = $request->input('orderBy', 'asc');
				return ApiKey::query()
					->whereUserId($user->id)
					->where(
						fn($query) => $query->whereRaw('LOWER(api_key) LIKE ?', [$search])
							->whereRaw('LOWER(label) LIKE ?', [$search])
					)
					->orderBy($order, $orderBy)
					->paginate();
			},
			'abilities' => function() {
				$user = Auth::user();
				return $user->abilities()->get(['title', 'name'])->map(fn($it) => ['name' => $it['name'], 'title' => $it['title']])->merge($user->roles->flatMap(fn(Role $role) => $role->abilities()->get(['title', 'name'])->map(fn($it) => ['name' => $it['name'], 'title' => $it['title']]))->toArray());
			}
		]);
	}
}

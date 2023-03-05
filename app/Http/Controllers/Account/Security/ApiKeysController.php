<?php

namespace App\Http\Controllers\Account\Security;

use App\Http\Controllers\Controller;
use App\Http\Requests\Account\Security\CreateApiKeyRequest;
use App\Http\Requests\Account\Security\UpdateApiKeyRequest;
use App\Models\ApiKey;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Inertia\Response;
use Inertia\ResponseFactory;
use Silber\Bouncer\Database\Ability;
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
                $search = '%'.strtolower($request->input('search', '')).'%';
                $order = $request->input('order', 'created_at');
                $orderBy = $request->input('orderBy', 'asc');

                return ApiKey::query()
                    ->whereUserId($user->id)
                    ->where(
                        fn ($query) => $query->whereRaw('LOWER(api_key) LIKE ?', [$search])
                            ->orWhereRaw('LOWER(label) LIKE ?', [$search])
                    )
                    ->orWhereHas('abilities', fn ($query) => $query->whereRaw('LOWER(name) LIKE ?', [$search]))
                    ->orderBy($order, $orderBy)
                    ->paginate();
            },
            'abilities' => function() {
                $user = Auth::user();

                return $user->abilities()->get(['title', 'name'])->map(fn ($it) => ['name' => $it['name'], 'title' => $it['title']])->merge($user->roles->flatMap(fn (Role $role) => $role->abilities()->get(['title', 'name'])->map(fn ($it) => ['name' => $it['name'], 'title' => $it['title']]))->toArray());
            },
        ]);
    }

    /* Creates a new api key */
    public function create(CreateApiKeyRequest $request): RedirectResponse {
        $key = ApiKey::create([
            'user_id' => $request->user()->id,
            'api_key' => implode('.', [Str::random(6), Str::random(8), Str::random(4), Str::random(12)]),
            'label' => $request->input('label', implode('-', [Str::random(4), Str::random(6), Str::random(4)])),
        ]);

        $key->abilities()->sync(Ability::query()->whereIn('name', $request->permissions)->pluck('id'));

        return back();
    }

    /* Updates the label and permissions of the given api key */
    public function update(UpdateApiKeyRequest $request, ApiKey $apiKey): RedirectResponse {
        $apiKey->update([
            'label' => $request->label,
        ]);
        $apiKey->abilities()->sync(Ability::query()->whereIn('name', $request->permissions)->pluck('id'));

        return back();
    }

    /* Regenerates the key of the given api key */
    public function regenerateKey(ApiKey $apiKey): RedirectResponse {
        $apiKey->update([
            'api_key' => implode('.', [Str::random(6), Str::random(8), Str::random(4), Str::random(12)]),
        ]);

        return back();
    }

    /* Removes the given api key from the database */
    public function delete(ApiKey $apiKey): RedirectResponse {
        $apiKey->delete();

        return back();
    }
}

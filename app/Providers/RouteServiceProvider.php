<?php

namespace App\Providers;

use App\Models\ApiKey;
use App\Models\User;
use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Foundation\Support\Providers\RouteServiceProvider as ServiceProvider;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\Facades\Route;
use Silber\Bouncer\Database\Ability;
use Silber\Bouncer\Database\Role;

class RouteServiceProvider extends ServiceProvider {
    /**
     * The path to the "home" route for your application.
     *
     * Typically, users are redirected here after authentication.
     *
     * @var string
     */
    public const HOME = '/account';

    /**
     * Define your route model bindings, pattern filters, and other route configuration.
     */
    public function boot() {
        $this->configureRateLimiting();
        $this->configureAliases();

        $this->routes(function() {
            Route::middleware('api')
                ->prefix('api')
                ->group(base_path('routes/api.php'));

            Route::middleware('web')
                ->group(base_path('routes/web.php'));
        });
    }

    /**
     * Configure the rate limiters for the application.
     */
    protected function configureRateLimiting() {
        RateLimiter::for('api', function(Request $request) {
            $id = optional($request->user())->id ?: $request->ip();

            return Limit::perMinute(60)->by($id);
        });
    }

    /**
     * Configure the module aliases to be used in the application.
     *
     * @noinspection PhpMethodParametersCountMismatchInspection
     */
    protected function configureAliases() {
        Route::bind('user', fn ($value) => User::withTrashed(strpos(request()->route()->uri, 'admin/') == 0)->whereRaw('LOWER(slug) = ?', [is_string($value) ? strtolower($value) : ''])->firstOrFail());
        Route::bind('ability', fn ($value) => Ability::query()->whereRaw('LOWER(name) = ?', [is_string($value) ? strtolower($value) : ''])->firstOrFail());
        Route::bind('role', fn ($value) => Role::query()->whereRaw('LOWER(name) = ?', [is_string($value) ? strtolower($value) : ''])->firstOrFail());
		Route::bind('apiKey', fn($value) => ApiKey::whereRaw('LOWER(label) = ?', [is_string($value) ? strtolower($value) : ''])->first());
    }
}

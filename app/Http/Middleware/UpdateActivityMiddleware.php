<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class UpdateActivityMiddleware {
    /**
     * Handle an incoming request.
     *
     * @param \Illuminate\Http\Request $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     *
     * @return \Illuminate\Http\RedirectResponse|\Illuminate\Http\Response
     */
    public function handle(Request $request, Closure $next)
    {
        if ($user = $request->user()) {
            $user->update(['last_activity_at' => now()]);
        }

        return $next($request);
    }
}

<?php

namespace App\Http\Middleware;

use Illuminate\Auth\Middleware\Authenticate as Middleware;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class Authenticate extends Middleware {
    /**
     * Get the path the user should be redirected to when they are not authenticated.
     *
     * @param Request $request
     *
     * @return null|JsonResponse|string
     */
    protected function redirectTo($request): JsonResponse|string|null {
        if ($request->expectsJson()) {
            return response()->json(['message' => 'Authentication is required to continue.'], 401);
        }

        return route('login');
    }
}

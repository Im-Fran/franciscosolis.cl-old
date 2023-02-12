<?php

namespace App\Http\Middleware;

use App\Models\ApiKey;
use App\Models\User;
use Auth;
use Closure;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Str;

class TokenAuthenticationMiddleware {
    /**
     * Handle an incoming request.
     *
     * @param Request $request
     * @param Closure $next
     *
     * @return JsonResponse|RedirectResponse|Response
     */
    public function handle(Request $request, Closure $next): Response|RedirectResponse|JsonResponse {
        if (!$request->hasHeader('authorization')) {
            return response()->json(['error' => 'Unauthorized', 'message' => "Missing 'Authorization' header!"], 401);
        }

        $token = trim(Str::replaceFirst('Bearer', '', $request->header('authorization', '')));
        if (empty($token)) {
            return response()->json(['error' => 'Unauthorized', 'message' => 'Invalid token!'], 401);
        }

        $id = ApiKey::whereApiKey($token)->orderByDesc('created_at')->limit(1)->first(['user_id'])->user_id;
        if (!$id || !User::whereId($id)->exists()) {
            return response()->json(['error' => 'Unauthorized', 'message' => 'Invalid token!'], 401);
        }

        Auth::loginUsingId($id);

        return $next($request);
    }
}

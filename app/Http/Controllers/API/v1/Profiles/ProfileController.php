<?php

namespace App\Http\Controllers\API\v1\Profiles;

use App\Helpers\ResourceHelpers;
use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\JsonResponse;

class ProfileController extends Controller {
    public function show(User $user): JsonResponse {
        return ResourceHelpers::generate(UserResource::class, $user);
    }
}

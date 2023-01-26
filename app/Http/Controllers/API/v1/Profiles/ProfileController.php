<?php

namespace App\Http\Controllers\API\v1\Profiles;

use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use App\Models\User;

class ProfileController extends Controller {
    public function show(User $user): UserResource {
        return new UserResource($user);
    }
}

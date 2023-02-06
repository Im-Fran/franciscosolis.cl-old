<?php

use App\Models\User;
use Illuminate\Support\Facades\Broadcast;

/*
|--------------------------------------------------------------------------
| Broadcast Channels
|--------------------------------------------------------------------------
|
| Here you may register all of the event broadcasting channels that your
| application supports. The given channel authorization callbacks are
| used to check if an authenticated user can listen to the channel.
|
*/

Broadcast::channel('User.{id}', fn ($user, $id) => (int) $user->id === (int) $id);
Broadcast::channel('UserActivity', fn ($user) => $user != null);

<?php

use App\Models\User;
use Illuminate\Support\Facades\Artisan;
use Silber\Bouncer\Database\Role;
use Symfony\Component\Console\Output\BufferedOutput;

/*
|--------------------------------------------------------------------------
| Console Routes
|--------------------------------------------------------------------------
|
| This file is where you may define all of your Closure based console
| commands. Each Closure is bound to a command instance allowing a
| simple approach to interacting with each command's IO methods.
|
*/

Artisan::command('app:assign-roles', function() {
    $user = User::whereName($this->anticipate('Write the user name', User::pluck('name')->toArray()))->firstOrFail();

    do {
        $user->assign(Bouncer::role()->where('name', '=', $this->anticipate('Write the role name', Bouncer::role()->pluck('name')->toArray()))->firstOrFail());

        $continue = $this->confirm('Do you want to assign another role?');
    } while ($continue);

    Bouncer::refreshFor($user);
})->describe('Assigns the given roles.');

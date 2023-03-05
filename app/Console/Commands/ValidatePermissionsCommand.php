<?php

namespace App\Console\Commands;

use Bouncer;
use Illuminate\Console\Command;

class ValidatePermissionsCommand extends Command {
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'validate:permissions';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Validate that all permissions and roles exist and are linked to the correct permissions.';

    /**
     * Execute the console command.
     */
    public function handle(): int {
        $this->info('Validating permissions...');
        $abilitites = [];
        foreach (config('permissions.permissions') as $permission => $name) {
            $abilitites[$permission] = Bouncer::ability()->firstOrCreate([
                'name' => $permission,
                'title' => $name,
            ]);
        }

        $this->info('Validating roles...');
        foreach (config('permissions.roles') as $name => $data) {
            $role = Bouncer::role()->firstOrCreate([
                'name' => $name,
                'title' => $data['name'],
            ]);

            Bouncer::disallow($role)->everything();
            foreach ($data['permissions'] ?? [] as $permission) {
                Bouncer::allow($role)->to($abilitites[$permission]);
            }
        }

        $this->info('Done!');

        return self::SUCCESS;
    }
}

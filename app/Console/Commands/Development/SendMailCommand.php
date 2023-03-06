<?php

namespace App\Console\Commands\Development;

use App\Models\User;
use Illuminate\Console\Command;

class SendMailCommand extends Command {
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'development:send-mail {--class=} {--user=} {--args=}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Sends the given mail';

    /**
     * Execute the console command.
     */
    public function handle(): void {
        $class = '\App\Notifications\\';
        $opt = str_replace('/', '\\', $this->option('class'));
        $class .= str_starts_with($opt, '\\') ? substr($opt, 1) : $opt;

        // Get arguments required by the class
        $ref = new \ReflectionClass($class);
        $constructor = $ref->getConstructor();
        $params = $constructor->getParameters();
        if ($this->option('args') == null || collect($params)->filter(fn ($it) => !$it->isOptional())->count() != count(explode(';', $this->option('args')))) {
            $args = [];
            foreach ($params as $param) {
                $args[$param->getPosition()] = $this->ask("Please input the value for \${$param->getName()} ({$param->getType()})", $param->isOptional() ? $param->getDefaultValue() : null);
            }
        } else {
            $args = explode(';', $this->option('args'));
        }

        $notification = $ref->newInstanceArgs($args);

        $user = User::whereRaw('id = ? OR name = ?', [$this->option('user'), $this->option('user')])->first();

        if ($user === null) {
            $this->error('Could not find user with the given ID/Name');

            return;
        }

        $user->notify($notification);

        $this->info('Mail sent!');
    }
}

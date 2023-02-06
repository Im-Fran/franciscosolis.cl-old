<?php

namespace Database\Seeders\Users;

use App\Models\User;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder {
    /**
     * Run the database seeds.
     */
    public function run() {
        User::factory(500)->create();
    }
}
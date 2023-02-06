<?php

namespace Tests\Feature\Account;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

/**
 * @small
 */
class AccountSettingsTest extends TestCase {
    use RefreshDatabase;

    /**
     * Test gravatar usage.
     */
    public function test_gravatar_usage() {
        $user = User::factory()->create();

        // Visit account settings
        $this->get('/account/settings');

        $this->actingAs($user)->post('/account/settings/profilephoto', [
            'type' => 'gravatar',
            'profile_photo' => null,
        ])->assertRedirect('/account/settings');

        $this->assertStringContainsStringIgnoringCase('gravatar', $user->profile_photo_url);
    }

    /**
     * Test name change.
     */
    public function test_name_change() {
        $user = User::factory()->create();

        // Visit account settings
        $this->get('/account/settings');

        $this->actingAs($user)->patch('/account/settings', [
            'name' => 'New Name',
            'email' => $user->email,
            'gravatar_email' => $user->gravatar_email,
        ])->assertRedirect('/account/settings');

        $this->assertEquals('New Name', $user->name);
    }

    /**
     * Test email change.
     */
    public function test_email_change() {
        $user = User::factory()->create();

        // Visit account settings
        $this->get('/account/settings');

        $email = fake()->safeEmail;
        $this->actingAs($user)->patch('/account/settings', [
            'name' => $user->name,
            'email' => $email,
            'gravatar_email' => $user->gravatar_email,
        ])->assertRedirect('/account/settings');

        $this->assertEquals($email, $user->email);
    }

    /**
     * Test gravatar email change.
     */
    public function test_gravatar_email_change() {
        $user = User::factory()->create();

        // Visit account settings
        $this->get('/account/settings');

        $email = fake()->safeEmail;
        $this->actingAs($user)->patch('/account/settings', [
            'name' => $user->name,
            'email' => $user->email,
            'gravatar_email' => $email,
        ])->assertRedirect('/account/settings');

        $this->assertEquals($email, $user->gravatar_email);
    }
}

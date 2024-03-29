<?php

namespace Tests\Feature\Auth;

use App\Actions\EnableTwoFactorAuth;
use App\Helpers\Helpers;
use App\Models\User;
use App\Providers\TwoFactorAuthProvider;
use Illuminate\Foundation\Testing\RefreshDatabase;
use PragmaRX\Google2FA\Exceptions\IncompatibleWithGoogleAuthenticatorException;
use PragmaRX\Google2FA\Exceptions\InvalidCharactersException;
use PragmaRX\Google2FA\Exceptions\SecretKeyTooShortException;
use Tests\TestCase;

/**
 * @medium
 */
class TwoFactorConfirmationTest extends TestCase {
    use RefreshDatabase;

    /**
     * Tests that a user is requested and can use two-factor authentication.
     */
    public function test_2fa(): void {
        $user = User::factory()->create();

        try {
            app(EnableTwoFactorAuth::class)($user);
        } catch (IncompatibleWithGoogleAuthenticatorException|InvalidCharactersException|SecretKeyTooShortException $ignored) {
        }

        $user->update([
            'two_factor_verified_at' => now(),
        ]);

        $this->post('/login', [
            'email' => $user->email,
            'password' => 'password',
        ])->assertRedirect('/two-factor-auth');

        $this->post('/two-factor-auth', [
            'one_time_password' => app(TwoFactorAuthProvider::class)->getCurrentOtp($user->two_factor_secret),
        ])->assertRedirect('/account');
    }

    /**
     * Tests that the user won't be logged in if an incorrect 2fa code is provided.
     */
    public function test_incorrect_2fa(): void {
        $user = User::factory()->create();

        try {
            app(EnableTwoFactorAuth::class)($user);
        } catch (IncompatibleWithGoogleAuthenticatorException|InvalidCharactersException|SecretKeyTooShortException $ignored) {
        }

        $user->update([
            'two_factor_verified_at' => now(),
        ]);

        $this->post('/login', [
            'email' => $user->email,
            'password' => 'password',
        ])->assertRedirect('/two-factor-auth');

        $this->post('/two-factor-auth', [
            'one_time_password' => '123456',
        ])->assertRedirect('/two-factor-auth');
    }

    /**
     * Tests that the user can use backup codes.
     */
    public function test_backup_codes(): void {
        $user = User::factory()->create();

        try {
            app(EnableTwoFactorAuth::class)($user);
        } catch (IncompatibleWithGoogleAuthenticatorException|SecretKeyTooShortException|InvalidCharactersException $ignored) {
        }

        $user->update([
            'two_factor_verified_at' => now(),
        ]);

        $this->post('/login', [
            'email' => $user->email,
            'password' => 'password',
        ])->assertRedirect('/two-factor-auth');

        $this->post('/two-factor-auth', [
            'one_time_password' => collect($user->two_factor_recovery_codes)->random(),
        ])->assertRedirect('/account');
    }

    /**
     * Tests that the user can't use backup codes after they have been used.
     */
    public function test_used_backup_codes(): void {
        $user = User::factory()->create();

        try {
            app(EnableTwoFactorAuth::class)($user);
        } catch (IncompatibleWithGoogleAuthenticatorException|InvalidCharactersException|SecretKeyTooShortException $ignored) {
        }

        $user->update([
            'two_factor_verified_at' => now(),
        ]);

        $this->post('/login', [
            'email' => $user->email,
            'password' => 'password',
        ])->assertRedirect('/two-factor-auth');

        $code = collect($user->two_factor_recovery_codes)->random();

        $this->post('/two-factor-auth', [
            'one_time_password' => $code,
        ])->assertRedirect('/account');

        $this->post('/logout')->assertRedirect('/');

        $this->post('/login', [
            'email' => $user->email,
            'password' => 'password',
        ])->assertRedirect('/two-factor-auth');

        $this->post('/two-factor-auth', [
            'one_time_password' => $code,
        ])->assertRedirect('/two-factor-auth');
    }

    /**
     * Tests that the user can't use backup codes from another user.
     */
    public function test_backup_codes_from_another_user(): void {
        $user = User::factory()->create();
        $anotherUser = User::factory()->create();

        $enable2fa = app(EnableTwoFactorAuth::class);

        try {
            $enable2fa($user);
            $enable2fa($anotherUser);
        } catch (IncompatibleWithGoogleAuthenticatorException|InvalidCharactersException|SecretKeyTooShortException $ignored) {
        }

        $user->update([
            'two_factor_verified_at' => now(),
        ]);

        $this->post('/login', [
            'email' => $user->email,
            'password' => 'password',
        ])->assertRedirect('/two-factor-auth');

        $this->post('/two-factor-auth', [
            'one_time_password' => collect($anotherUser->two_factor_recovery_codes)->random(),
        ])->assertSessionHasErrors('one_time_password');
    }

    /**
     * Tests that the user can't use a non-existent backup code.
     */
    public function test_non_existent_backup_code(): void {
        $user = User::factory()->create();

        try {
            app(EnableTwoFactorAuth::class)($user);
        } catch (IncompatibleWithGoogleAuthenticatorException|InvalidCharactersException|SecretKeyTooShortException $ignored) {
        }

        $user->update([
            'two_factor_verified_at' => now(),
        ]);

        $this->post('/login', [
            'email' => $user->email,
            'password' => 'password',
        ])->assertRedirect('/two-factor-auth');

        $this->post('/two-factor-auth', [
            'one_time_password' => Helpers::generateRecoveryCode(),
        ])->assertSessionHasErrors('one_time_password');
    }
}

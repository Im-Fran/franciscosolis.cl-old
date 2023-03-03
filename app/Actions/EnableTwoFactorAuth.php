<?php

namespace App\Actions;

use App\Helpers\Helpers;
use App\Providers\TwoFactorAuthProvider;
use Illuminate\Support\Collection;
use PragmaRX\Google2FA\Exceptions\IncompatibleWithGoogleAuthenticatorException;
use PragmaRX\Google2FA\Exceptions\InvalidCharactersException;
use PragmaRX\Google2FA\Exceptions\SecretKeyTooShortException;

class EnableTwoFactorAuth {
    /**
     * The two-factor authentication provider.
     */
    protected TwoFactorAuthProvider $provider;

    /**
     * Create a new action instance.
     */
    public function __construct(TwoFactorAuthProvider $provider) {
        $this->provider = $provider;
    }

    /**
     * Enable two-factor authentication for the user.
     *
     * @throws IncompatibleWithGoogleAuthenticatorException
     * @throws InvalidCharactersException
     * @throws SecretKeyTooShortException
     */
    public function __invoke(mixed $user): void {
        $user->update([
            'two_factor_secret' => $this->provider->generateSecretKey(),
            'two_factor_recovery_codes' => Collection::times(8, fn () => Helpers::generateRecoveryCode())->all(),
        ]);
    }
}

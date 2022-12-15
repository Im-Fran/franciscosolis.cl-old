<?php

namespace App\Providers;

use Illuminate\Contracts\Cache\Repository;
use PragmaRX\Google2FA\Exceptions\IncompatibleWithGoogleAuthenticatorException;
use PragmaRX\Google2FA\Exceptions\InvalidCharactersException;
use PragmaRX\Google2FA\Exceptions\SecretKeyTooShortException;
use PragmaRX\Google2FA\Google2FA;
use PragmaRX\Google2FA\Support\Constants;
use Psr\SimpleCache\InvalidArgumentException;

class TwoFactorAuthProvider {
    /**
     * The underlying library providing two-factor authentication helper services.
     *
     * @var Google2FA
     */
    protected Google2FA $engine;

    /**
     * The cache repository implementation.
     *
     * @var null|Repository
     */
    protected ?Repository $cache;

    /**
     * Create a new two-factor authentication provider instance.
     *
     * @param Google2FA       $engine
     * @param null|Repository $cache
     */
    public function __construct(Google2FA $engine, ?Repository $cache = null)
    {
        $this->engine = $engine;
        $this->cache = $cache;

        // Ensure we're using SHA1
        $this->engine->setAlgorithm(Constants::SHA1);
    }

    /**
     * Generate a new secret key.
     *
     * @throws IncompatibleWithGoogleAuthenticatorException
     * @throws InvalidCharactersException
     * @throws SecretKeyTooShortException
     *
     * @return string
     */
    public function generateSecretKey(): string
    {
        return $this->engine->generateSecretKey();
    }

    /**
     * Get the two-factor authentication QR code URL.
     *
     * @param string $email
     * @param string $secret
     *
     * @return string
     */
    public function qrCodeUrl(string $email, string $secret): string
    {
        return $this->engine->getQRCodeUrl(config('app.name'), $email, $secret);
    }

    /**
     * Verify the given code.
     *
     * @param string $secret
     * @param string $code
     *
     * @throws IncompatibleWithGoogleAuthenticatorException
     * @throws InvalidCharactersException
     * @throws SecretKeyTooShortException
     * @throws InvalidArgumentException
     *
     * @return bool
     */
    public function verify(string $secret, string $code): bool
    {
        $this->engine->setWindow(1); // A code lasts 60 seconds

        $timestamp = $this->engine->verifyKeyNewer(
            $secret,
            $code,
            optional($this->cache)->get($key = '2fa_codes.'.md5($code))
        );

        if ($timestamp !== false) {
            if ($timestamp === true) {
                $timestamp = $this->engine->getTimestamp();
            }

            optional($this->cache)->put($key, $timestamp, ($this->engine->getWindow() ?: 1) * 60);

            return true;
        }

        return false;
    }
}

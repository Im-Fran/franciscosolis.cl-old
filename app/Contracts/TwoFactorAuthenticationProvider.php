<?php

namespace App\Contracts;

use PragmaRX\Google2FA\Exceptions\IncompatibleWithGoogleAuthenticatorException;
use PragmaRX\Google2FA\Exceptions\InvalidCharactersException;
use PragmaRX\Google2FA\Exceptions\SecretKeyTooShortException;
use Psr\SimpleCache\InvalidArgumentException;

interface TwoFactorAuthenticationProvider
{
	/**
	 * Generate a new secret key.
	 *
	 * @return string
	 * @throws IncompatibleWithGoogleAuthenticatorException
	 * @throws InvalidCharactersException
	 * @throws SecretKeyTooShortException
	 */
	public function generateSecretKey(): string;
	
	/**
	 * Get the two-factor authentication QR code URL.
	 *
	 * @param $email
	 * @param string $secret
	 * @return string
	 */
	public function qrCodeUrl($email, string $secret): string;
	
	/**
	 * Verify the given token.
	 *
	 * @param string $secret
	 * @param string $code
	 * @return bool
	 * @throws IncompatibleWithGoogleAuthenticatorException
	 * @throws InvalidCharactersException
	 * @throws SecretKeyTooShortException
	 * @throws InvalidArgumentException
	 */
	public function verify(string $secret, string $code): bool;
}
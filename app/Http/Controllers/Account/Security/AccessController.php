<?php

namespace App\Http\Controllers\Account\Security;

use App\Actions\DisableTwoFactorAuth;
use App\Actions\EnableTwoFactorAuth;
use App\Contracts\TwoFactorAuthenticationProvider;
use App\Http\Controllers\Controller;
use App\Http\Requests\Account\Security\PasswordUpdateRequest;
use BaconQrCode\Renderer\Color\Rgb;
use BaconQrCode\Renderer\Image\SvgImageBackEnd;
use BaconQrCode\Renderer\ImageRenderer;
use BaconQrCode\Renderer\RendererStyle\Fill;
use BaconQrCode\Renderer\RendererStyle\RendererStyle;
use BaconQrCode\Writer;
use Hash;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Collection;
use Inertia\Response;
use Inertia\ResponseFactory;
use PragmaRX\Google2FA\Exceptions\IncompatibleWithGoogleAuthenticatorException;
use PragmaRX\Google2FA\Exceptions\InvalidCharactersException;
use PragmaRX\Google2FA\Exceptions\SecretKeyTooShortException;

class AccessController extends Controller {
	
	
 
	/* Shows the access dashboard */
	public function index(): Response|ResponseFactory {
		return inertia('Account/Security/Access');
	}
	
	/* Updates the current password to the given one */
	public function updatePassword(PasswordUpdateRequest $request): RedirectResponse {
		$request->user()->update([
			'password' => Hash::make($request->password),
		]);
		return back();
	}
	
	/**
	 * Shows the 2FA setup page
	 *
	 * @throws IncompatibleWithGoogleAuthenticatorException
	 * @throws SecretKeyTooShortException
	 * @throws InvalidCharactersException
	 */
	public function twoFactorSetup(Request $request, EnableTwoFactorAuth $enableTwoFactorAuth): Response|ResponseFactory|RedirectResponse {
		$user = $request->user();
		if(!$user->two_factor_enabled) {
			$enableTwoFactorAuth($user);
		}
		
		$qr_url = app(TwoFactorAuthenticationProvider::class)->qrCodeUrl($user->email, $user->two_factor_secret);
		return inertia('Account/Security/TwoFactorSetup', [
			'secret' => fn() => $user->two_factor_verified_at ? 'hidden' : $user->two_factor_secret,
			'dark_qr' => fn() => (new Writer(
				new ImageRenderer(
					new RendererStyle(192, 0, null, null, Fill::uniformColor(new Rgb(33,33,33), new Rgb(255,255,255))),
					new SvgImageBackEnd,
				)
			))->writeString($qr_url),
			'light_qr' => fn() => (new Writer(
				new ImageRenderer(
					new RendererStyle(192, 0, null, null, Fill::uniformColor(new Rgb(255,255,255), new Rgb(33,33,33))),
					new SvgImageBackEnd,
				)
			))->writeString($qr_url),
		]);
	}
	
	/* Disables 2FA */
	public function disableTwoFactor(Request $request, DisableTwoFactorAuth $disableTwoFactorAuth): RedirectResponse {
		$user = $request->user();
		$disableTwoFactorAuth($user);
		
		return back()->with('success', '2FA has been disabled!');
	}
	
	/* Validates the 2FA code */
	public function validateTwoFactor(Request $request): RedirectResponse {
		$user = $request->user();
		if (app(TwoFactorAuthenticationProvider::class)->verify($user->two_factor_secret, $request->one_time_password)) {
			if ($user->two_factor_verified_at == null) {
				$user->update([
					'two_factor_verified_at' => now(),
				]);
			}
			return back()->with('success', 'The entered code is valid :)');
		} else {
			return back()->withErrors(['Invalid 2FA Code! Please try again.']);
		}
	}
}

<?php

namespace App\Actions;

use App\Notifications\Account\TwoFactorAuthenticationDisabled;

class DisableTwoFactorAuth {
	
	/**
	 * Enable two-factor authentication for the user.
	 *
	 * @param mixed $user
	 * @return void
	 */
	public function __invoke(mixed $user): void{
		if(!is_null($user->two_factor_secret) || !is_null($user->two_factor_recovery)){
			$user->forceFill([
				'two_factor_secret' => null,
				'two_factor_recovery_codes' => null,
			])->save();
			
			$user->notify(new TwoFactorAuthenticationDisabled());
		}
	}
}
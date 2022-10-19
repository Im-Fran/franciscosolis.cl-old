<?php

namespace App\Http\Requests\Auth;

use Illuminate\Foundation\Http\FormRequest;

class TwoFactorAuthRequest extends FormRequest {
	
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize() {
        return session()->has('auth.user.id');
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules() {
        return [
            'one_time_password' => ['numeric', 'required', 'digits:6']
        ];
    }
	
	public function messages() {
		return [
			'one_time_password.required' => 'Please enter your 2FA code.',
			'one_time_password.integer' => 'Please enter a valid 2FA code.',
			'one_time_password.size' => 'The 2FA must be 6 digits long.'
		];
	}
}

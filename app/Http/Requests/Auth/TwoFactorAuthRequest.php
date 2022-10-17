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
            'one_time_password' => ['numeric', 'required', 'min:6', 'max:6']
        ];
    }
}

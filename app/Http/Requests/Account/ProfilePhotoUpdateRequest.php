<?php

namespace App\Http\Requests\Account;

use Auth;
use Illuminate\Foundation\Http\FormRequest;

class ProfilePhotoUpdateRequest extends FormRequest {
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize() {
        return Auth::check();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules() {
        return [
            'profile_photo' => ['required_if:type,file', 'image', 'nullable'],
            'type' => ['string', 'nullable'],
        ];
    }
}

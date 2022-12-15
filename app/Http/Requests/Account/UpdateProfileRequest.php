<?php

namespace App\Http\Requests\Account;

use Auth;
use Illuminate\Foundation\Http\FormRequest;

class UpdateProfileRequest extends FormRequest {
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return Auth::check();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [/* Except this user */
            'name' => ['required', 'string', ('unique:users,name,'.Auth::id()), 'between:4,255', 'regex:([a-zA-Z]+[a-zA-Z0-9_\. ][a-zA-Z0-9]+)'],
            'email' => ['required', 'email', ('unique:users,email,'.Auth::id())],
            'gravatar_email' => ['nullable', 'email'],
        ];
    }
}

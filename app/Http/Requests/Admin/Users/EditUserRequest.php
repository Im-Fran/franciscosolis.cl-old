<?php

namespace App\Http\Requests\Admin\Users;

use Illuminate\Foundation\Http\FormRequest;

class EditUserRequest extends FormRequest {
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize() {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules() {
        return [
            'name' => ['required', 'string', ('unique:users,name,'.$this->user->id), 'between:4,255', 'regex:([a-zA-Z]+[a-zA-Z0-9_\. ][a-zA-Z0-9]+)'],
            'email' => ['required', 'email', ('unique:users,email,'.$this->user->id)],
            'permissions.*' => ['required', 'string', 'exists:abilities,name'],
            'roles.*' => ['required', 'string', 'exists:roles,name'],
        ];
    }
}

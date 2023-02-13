<?php

namespace App\Http\Requests\Admin\Users;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class EditUserRequest extends FormRequest {
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize(): bool {
        return Auth::user()->can('admin.users.update');
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules(): array {
        return [
            'name' => ['required', 'string', ('unique:users,name,'.$this->user->id), 'between:4,255', 'regex:([a-zA-Z]+[a-zA-Z0-9_\. ][a-zA-Z0-9]+)'],
            'email' => ['required', 'email', ('unique:users,email,'.$this->user->id)],
            'permissions.*' => ['required', 'string', 'exists:abilities,name'],
            'roles.*' => ['required', 'string', 'exists:roles,name'],
        ];
    }
}

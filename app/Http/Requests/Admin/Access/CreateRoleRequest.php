<?php

namespace App\Http\Requests\Admin\Access;

use Illuminate\Foundation\Http\FormRequest;

class CreateRoleRequest extends FormRequest {
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize() {
        return \Auth::user()->can('admin.roles.create');
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules() {
        return [
            'name' => ['required', 'string', 'max:255', 'unique:roles,name'],
            'title' => ['required', 'string', 'max:255', 'unique:roles,title'],
        ];
    }
}

<?php

namespace App\Http\Requests\Admin\Access;

use Illuminate\Foundation\Http\FormRequest;

class CreatePermissionRequest extends FormRequest {
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize() {
        return true; // TODO: Check that user has permission
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules() {
        return [
            'name' => ['required', 'string', 'max:255', 'unique:abilities,name'],
            'title' => ['required', 'string', 'max:255'],
        ];
    }
}

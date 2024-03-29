<?php

namespace App\Http\Requests\Admin\Access;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;

class EditPermissionRequest extends FormRequest {
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool {
        return Auth::user()->can('admin.permissions.update');
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules(): array {
        return [
            'name' => ['required', 'string', 'max:255', Rule::unique('abilities', 'name')->ignore($this->ability->id)],
            'title' => ['required', 'string', 'max:255', Rule::unique('abilities', 'title')->ignore($this->ability->id)],
        ];
    }
}

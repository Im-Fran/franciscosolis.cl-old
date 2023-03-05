<?php

namespace App\Http\Requests\Account\Security;

use Illuminate\Foundation\Http\FormRequest;

class CreateApiKeyRequest extends FormRequest {
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules(): array {
        return [
            'label' => ['nullable', 'string', 'max:255', 'unique:api_keys,label'],
            'permissions' => ['array', 'required', 'min:1'],
            'permissions.*' => ['required', 'string', 'max:255', 'exists:abilities,name'],
        ];
    }
}

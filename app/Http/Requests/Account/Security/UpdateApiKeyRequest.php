<?php

namespace App\Http\Requests\Account\Security;

use Illuminate\Foundation\Http\FormRequest;

class UpdateApiKeyRequest extends FormRequest {
	
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
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
            'label' => ['string', 'max:255', 'unique:api_keys,label,' . $this->apiKey->id],
	        'permissions' => ['array', 'required', 'min:1'],
	        'permissions.*' => ['required', 'string', 'max:255', 'exists:abilities,name'],
        ];
    }
}

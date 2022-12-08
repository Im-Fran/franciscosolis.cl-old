<?php

namespace App\Rules;

use Illuminate\Contracts\Validation\InvokableRule;

class OneTimePassword implements InvokableRule
{
    /**
     * Run the validation rule.
     *
     * @param  string  $attribute
     * @param  mixed  $value
     * @param  \Closure(string): \Illuminate\Translation\PotentiallyTranslatedString  $fail
     * @return void
     */
    public function __invoke($attribute, $value, $fail) {
        if(!preg_match('/[0-9]{6}|[A-Za-z0-9]{6}\.[A-Za-z0-9]{4}\.[A-Za-z0-9]{6}\.[A-Za-z0-9]{4}/', $value)) {
            $fail('The :attribute must be a valid 2FA code or Backup Code.');
        }
    }
}

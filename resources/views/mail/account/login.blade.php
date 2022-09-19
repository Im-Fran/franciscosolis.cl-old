@component('mail::message')
# New Login Activity Detected

We've detected a new login in your account. If you didn't make this login, please reset your password immediately.

@component('mail::panel')
IP Address: {{ $ip }}. Location: {{ $location }}. Device: {{ $device }}.
@endcomponent

@component('mail::button', ['url' => route('account')])
Account Overview
@endcomponent

Thanks,<br>
{{ config('app.name') }}
@endcomponent

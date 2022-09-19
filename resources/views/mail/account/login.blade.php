@component('mail::message')
# New Login Activity Detected

We've detected a new login in your account. If you didn't make this login, please reset your password immediately.

@component('mail::panel')
IP Address: <b>{{ $ip }}</b>. <br/>
Location: <b>{{ $location }}</b>. <br/>
Device: <b>{{ $device }}</b>.
@endcomponent

@component('mail::button', ['url' => route('account')])
Account Overview
@endcomponent

Thanks,<br>
{{ config('app.name') }}
@endcomponent

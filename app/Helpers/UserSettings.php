<?php

namespace App\Helpers;

class UserSettings {
    public static array $defaultSettings = [
        'activity.public' => false,
    ];

    public static array $validation = [
        'activity\.public' => ['boolean', 'required'],
    ];
}

<?php

use App\Http\Controllers\API\v1 as Controllers;
use Illuminate\Support\Facades\Route;

Route::prefix('profiles')->group(function() {
    Route::get('/{user}', [Controllers\Profiles\ProfileController::class, 'show'])
        ->name('profiles.show');
});

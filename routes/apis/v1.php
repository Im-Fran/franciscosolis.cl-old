<?php

use App\Http\Controllers\API\v1 as Controllers;
use Illuminate\Support\Facades\Route;

Route::prefix('self')->name('self.')->middleware(['auth:sanctum'])->group(function() {
	Route::get('/heartbeat', [Controllers\Self\HeartbeatController::class, '__invoke'])
		->name('heartbeat');
});

Route::prefix('profiles')->name('profiles.')->group(function() {
    Route::get('/{user}', [Controllers\Profiles\ProfileController::class, 'show'])
        ->name('show');
});

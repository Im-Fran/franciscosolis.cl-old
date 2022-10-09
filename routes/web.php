<?php

use App\Http\Controllers;
use App\Http\Controllers\Account;
use App\Http\Controllers\Account\Settings as AccountSettings;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', [Controllers\MainController::class, 'home'])->name('home');

Route::prefix('/account')->middleware(['auth', 'verified'])->group(function() {
    Route::get('/', [Account\AccountController::class, 'index'])->name('account');

    /* Settings */
    Route::prefix('/settings')->group(function(){
        Route::get('/', [AccountSettings\SettingsController::class, 'index'])->name('account.settings');
        Route::patch('/', [AccountSettings\SettingsController::class, 'update'])->name('account.settings.update');

        /* Profile Photo */
        Route::prefix('/profilephoto')->group(function(){
            Route::post('/', [AccountSettings\ImagesController::class, 'uploadProfilePhoto'])->name('account.settings.profilephoto');
            Route::delete('/', [AccountSettings\ImagesController::class, 'clearProfilePhoto'])->name('account.settings.profilephoto.delete');
        });
    });
	
	/* Security */
	Route::prefix('/security')->group(function(){
		/* Access */
		Route::prefix('/access')->group(function(){
			Route::get('/', [Account\Security\AccessController::class, 'index'])->name('account.security.access');
			Route::patch('/password', [Account\Security\AccessController::class, 'updatePassword'])->middleware(['password.confirm'])->name('account.security.access.password');
		});
	});

    /* Notifications */
    Route::prefix('/notifications')->group(function(){
        Route::get('/', [Account\NotificationsController::class, 'index'])->name('account.notifications');
        Route::post('/{notification}', [Account\NotificationsController::class, 'markAsRead'])->name('account.notifications.markasread');
        Route::delete('/{notification}', [Account\NotificationsController::class, 'delete'])->name('account.notifications.delete');
    });
});

require __DIR__.'/auth.php';

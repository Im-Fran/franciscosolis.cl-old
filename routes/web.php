<?php

use App\Http\Controllers;
use App\Http\Controllers\Account;
use App\Http\Controllers\Account\Settings as AccountSettings;
use App\Http\Controllers\Admin;
use App\Http\Controllers\Admin\Access as AdminAccess;
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

Route::prefix('/account')->name('account')->middleware(['auth', '2fa', 'verified'])->group(function() {
    Route::get('/', [Account\AccountController::class, 'index']);

    /* Settings */
    Route::prefix('/settings')->name('.settings')->group(function() {
        Route::get('/', [AccountSettings\SettingsController::class, 'index']);
        Route::patch('/', [AccountSettings\SettingsController::class, 'update'])->name('.update');

        /* Profile Photo */
        Route::prefix('/profilephoto')->name('.profilephoto')->group(function() {
            Route::post('/', [AccountSettings\ImagesController::class, 'uploadProfilePhoto']);
            Route::delete('/', [AccountSettings\ImagesController::class, 'clearProfilePhoto'])->name('.delete');
        });

        /* Privacy */
        Route::post('/privacy', [AccountSettings\PrivacyController::class, 'update'])->name('.privacy.update');
    });

    /* Security */
    Route::prefix('/security')->name('.security')->group(function() {
        /* Access */
        Route::prefix('/access')->name('.access')->middleware(['password.confirm'])->group(function() {
            Route::get('/', [Account\Security\AccessController::class, 'index']);
            Route::patch('/password', [Account\Security\AccessController::class, 'updatePassword'])->middleware(['password.confirm'])->name('.password');

            Route::prefix('/two-factor-auth')->name('.two-factor-auth')->group(function() {
	            Route::get('/', [Account\Security\AccessController::class, 'twoFactorSetup'])->name('.setup');
	            Route::post('/', [Account\Security\AccessController::class, 'validateTwoFactor'])->name('.validate');
	            Route::delete('/', [Account\Security\AccessController::class, 'disableTwoFactor'])->name('.delete');
	            Route::patch('/secret', [Account\Security\AccessController::class, 'regenerateTwoFactorSecret'])->name('.secret.regenerate');
	            Route::patch('/codes', [Account\Security\AccessController::class, 'regenerateRecoveryCodes'])->name('.recovery-codes.regenerate');
            });

			Route::prefix('/devices')->name('.devices')->group(function() {
				Route::get('/devices', [Account\Security\DevicesController::class, 'index']);
				Route::delete('/devices', [Account\Security\DevicesController::class, 'destroy'])->name('.delete');
			});
			
			Route::prefix('/api-keys')->name('.api-keys')->group(function(){
				 Route::get('/', [Account\Security\ApiKeysController::class, 'index']);
				 Route::post('/', [Account\Security\ApiKeysController::class, 'create'])->name('.create');
				 Route::patch('/{apiKey}', [Account\Security\ApiKeysController::class, 'update'])->name('.update');
				 Route::patch('/{apiKey}/regenerate', [Account\Security\ApiKeysController::class, 'regenerateKey'])->name('.regenerate');
				 Route::delete('/{apiKey}', [Account\Security\ApiKeysController::class, 'delete'])->name('.delete');
			});
        });
    });

    /* Notifications */
    Route::prefix('/notifications')->name('.notifications')->group(function() {
        Route::get('/', [Account\NotificationsController::class, 'index']);
        Route::post('/{notification}', [Account\NotificationsController::class, 'markAsRead'])->name('.markasread');
        Route::delete('/{notification}', [Account\NotificationsController::class, 'delete'])->name('.delete');
    });
});

Route::prefix('admin')->name('admin')->middleware(['auth', '2fa', 'verified', 'can:admin.dashboard'])->group(function() {
    Route::get('/', [Admin\DashboardController::class, 'index'])->name('.dashboard')->middleware(['can:admin.dashboard']);

    Route::prefix('users')->name('.users')->middleware(['can:admin.users'])->group(function() {
        Route::get('/', [Admin\UsersController::class, 'index'])->middleware(['can:admin.users']);
        Route::delete('/{user}', [Admin\UsersController::class, 'delete'])->name('.delete')->middleware(['can:admin.users.delete']);
        Route::post('/{user}/restore', [Admin\UsersController::class, 'restore'])->name('.restore')->middleware(['can:admin.users.delete']);
        Route::get('/{user}', [Admin\UsersController::class, 'edit'])->name('.edit')->middleware(['can:admin.users.update']);
        Route::patch('/{user}', [Admin\UsersController::class, 'update'])->name('.update')->middleware(['can:admin.users.update']);
        Route::delete('/{user}/image', [Admin\UsersController::class, 'resetImage'])->name('.image.reset')->middleware(['can:admin.users.update.image']);
        Route::post('/{user}/privacy', [Admin\UsersController::class, 'updatePrivacy'])->name('.privacy')->middleware(['can:admin.users.privacy']);
    });

    Route::prefix('permissions')->name('.abilities')->group(function() {
        Route::get('/', [AdminAccess\PermissionsController::class, 'index'])->middleware(['can:admin.permissions']);
        Route::post('/', [AdminAccess\PermissionsController::class, 'store'])->name('.store')->middleware(['can:admin.permissions.create']);
        Route::patch('/{ability}', [AdminAccess\PermissionsController::class, 'update'])->name('.update')->middleware(['can:admin.permissions.update']);
        Route::delete('/{ability}', [AdminAccess\PermissionsController::class, 'destroy'])->name('.delete')->middleware(['can:admin.permissions.delete']);
    });

    Route::prefix('roles')->name('.roles')->group(function() {
        Route::get('/', [AdminAccess\RolesController::class, 'index'])->middleware(['can:admin.roles']);
        Route::post('/', [AdminAccess\RolesController::class, 'store'])->name('.store')->middleware(['can:admin.roles.create']);
        Route::get('/{role}', [AdminAccess\RolesController::class, 'edit'])->name('.edit')->middleware(['can:admin.roles.update']);
        Route::patch('/{role}', [AdminAccess\RolesController::class, 'update'])->name('.update')->middleware(['can:admin.roles.update']);
        Route::delete('/{role}', [AdminAccess\RolesController::class, 'destroy'])->name('.delete')->middleware(['can:admin.roles.delete']);
    });
});

require __DIR__.'/auth.php';

Broadcast::routes();

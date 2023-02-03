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

Route::prefix('/account')->middleware(['auth', '2fa', 'verified'])->group(function() {
    Route::get('/', [Account\AccountController::class, 'index'])->name('account');

    /* Settings */
    Route::prefix('/settings')->group(function() {
        Route::get('/', [AccountSettings\SettingsController::class, 'index'])->name('account.settings');
        Route::patch('/', [AccountSettings\SettingsController::class, 'update'])->name('account.settings.update');

        /* Profile Photo */
        Route::prefix('/profilephoto')->group(function() {
            Route::post('/', [AccountSettings\ImagesController::class, 'uploadProfilePhoto'])->name('account.settings.profilephoto');
            Route::delete('/', [AccountSettings\ImagesController::class, 'clearProfilePhoto'])->name('account.settings.profilephoto.delete');
        });

        /* Privacy */
        Route::post('/privacy', [AccountSettings\PrivacyController::class, 'update'])->name('account.settings.privacy.update');
    });

    /* Security */
    Route::prefix('/security')->group(function() {
        /* Access */
        Route::prefix('/access')->group(function() {
            Route::get('/', [Account\Security\AccessController::class, 'index'])->name('account.security.access');
            Route::patch('/password', [Account\Security\AccessController::class, 'updatePassword'])->middleware(['password.confirm'])->name('account.security.access.password');

            Route::get('/two-factor-auth', [Account\Security\AccessController::class, 'twoFactorSetup'])->name('account.security.access.two-factor-auth.setup');
            Route::post('/two-factor-auth', [Account\Security\AccessController::class, 'validateTwoFactor'])->name('account.security.access.two-factor-auth.validate');
            Route::patch('/two-factor-auth/secret', [Account\Security\AccessController::class, 'regenerateTwoFactorSecret'])->name('account.security.access.two-factor-auth.secret.regenerate')->middleware(['password.confirm']);
            Route::patch('/two-factor-auth/codes', [Account\Security\AccessController::class, 'regenerateRecoveryCodes'])->name('account.security.access.two-factor-auth.recovery-codes.regenerate')->middleware(['password.confirm']);
            Route::delete('/two-factor-auth', [Account\Security\AccessController::class, 'disableTwoFactor'])->name('account.security.access.two-factor-auth.delete')->middleware(['password.confirm']);

            Route::get('/devices', [Account\Security\DevicesController::class, 'index'])->name('account.security.access.devices');
            Route::delete('/devices', [Account\Security\DevicesController::class, 'destroy'])->name('account.security.access.devices.delete')->middleware(['password.confirm']);
        });
    });

    /* Notifications */
    Route::prefix('/notifications')->group(function() {
        Route::get('/', [Account\NotificationsController::class, 'index'])->name('account.notifications');
        Route::post('/{notification}', [Account\NotificationsController::class, 'markAsRead'])->name('account.notifications.markasread');
        Route::delete('/{notification}', [Account\NotificationsController::class, 'delete'])->name('account.notifications.delete');
    });
});

Route::prefix('admin')->middleware(['auth', '2fa', 'verified', 'can:admin.dashboard'])->group(function() { // TODO: Add permissions middleware
    Route::get('/', [Admin\DashboardController::class, 'index'])->name('admin.dashboard')->middleware(['can:admin.dashboard']);

    Route::prefix('users')->middleware(['can:admin.users'])->group(function() {
        Route::get('/', [Admin\UsersController::class, 'index'])->name('admin.users');
        Route::get('/{user}', [Admin\UsersController::class, 'edit'])->name('admin.users.edit')->middleware(['can:admin.users.update']);
        Route::patch('/{user}', [Admin\UsersController::class, 'update'])->name('admin.users.update')->middleware(['can:admin.users.update']);
        Route::post('/{user}/images', [Admin\UsersController::class, 'resetImage'])->name('admin.users.image.reset')->middleware(['can:admin.users.update.image']);
        Route::post('/{user}/privacy', [Admin\UsersController::class, 'privacy'])->name('admin.users.privacy')->middleware(['can:admin.users.privacy']);
    });

    Route::prefix('permissions')->group(function() {
        Route::get('/', [AdminAccess\PermissionsController::class, 'index'])->name('admin.abilities');
        Route::post('/', [AdminAccess\PermissionsController::class, 'store'])->name('admin.abilities.store');
        Route::patch('/{ability}', [AdminAccess\PermissionsController::class, 'update'])->name('admin.abilities.update');
        Route::delete('/{ability}', [AdminAccess\PermissionsController::class, 'destroy'])->name('admin.abilities.delete');
    });

    Route::prefix('roles')->group(function() {
        Route::get('/', [AdminAccess\RolesController::class, 'index'])->name('admin.roles');
        Route::post('/', [AdminAccess\RolesController::class, 'store'])->name('admin.roles.store');
        Route::get('/{role}', [AdminAccess\RolesController::class, 'edit'])->name('admin.roles.edit');
        Route::patch('/{role}', [AdminAccess\RolesController::class, 'update'])->name('admin.roles.update');
        Route::delete('/{role}', [AdminAccess\RolesController::class, 'destroy'])->name('admin.roles.delete');
    });
});

require __DIR__.'/auth.php';

Broadcast::routes();

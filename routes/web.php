<?php

use App\Http\Controllers;
use App\Http\Controllers\Account;
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
        Route::get('/', [Account\AccountController::class, 'settings'])->name('account.settings');
        Route::patch('/', [Account\AccountController::class, 'update'])->name('account.settings.update');

        /* Profile Photo */
        Route::prefix('/profilephoto')->group(function(){
            Route::post('/', [Account\AccountController::class, 'uploadProfilePhoto'])->name('account.settings.profilephoto');
            Route::delete('/', [Account\AccountController::class, 'clearProfilePhoto'])->name('account.settings.profilephoto.delete');
        });
    });

    /* Notifications */
    Route::prefix('/notifications')->group(function(){
        //Route::get('/', [Account\AccountController::class, 'notifications'])->name('account.notifications');
        Route::post('/{notification}', [Account\AccountController::class, 'markAsRead'])->name('account.notifications.markasread');
    });
});

require __DIR__.'/auth.php';

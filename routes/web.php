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
    Route::get('/settings', [Account\AccountController::class, 'settings'])->name('account.settings');
    Route::patch('/settings', [Account\AccountController::class, 'update'])->name('account.settings.update');
    Route::post('/settings/avatar', [Account\AccountController::class, 'uploadProfilePhoto'])->name('account.settings.profilephoto');
    Route::delete('/settings/avatar', [Account\AccountController::class, 'clearProfilePhoto'])->name('account.settings.profilephoto.delete');
});

require __DIR__.'/auth.php';

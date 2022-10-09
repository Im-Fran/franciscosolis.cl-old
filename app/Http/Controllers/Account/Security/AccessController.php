<?php

namespace App\Http\Controllers\Account\Security;

use App\Http\Controllers\Controller;
use App\Http\Requests\Account\Security\PasswordUpdateRequest;
use Illuminate\Http\Request;

class AccessController extends Controller {
 
	/* Shows the access dashboard */
	public function index() {
		return inertia('Account/Security/Access');
	}
	
	/* Updates the current password to the given one */
	public function updatePassword(PasswordUpdateRequest $request){
		$request->user()->update([
			'password' => \Hash::make($request->password),
		]);
		return back();
	}
}

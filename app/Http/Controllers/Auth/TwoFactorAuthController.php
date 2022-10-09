<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class TwoFactorAuthController extends Controller {
 
	public function show() {
		return inertia('Auth/TwoFactorAuth');
	}
	
	public function store(Request $request) {
	
	}
}

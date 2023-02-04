<?php

namespace App\Http\Controllers\API\v1\Self;

use App\Events\HeartbeatEvent;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class HeartbeatController extends Controller {
 
	public function __invoke(Request $request) {
		$user = $request->user();
		if(!$user->settings['activity.public']) {
			return response()->json([
				'status' => 'No update.',
			]);
		}
		
		$user->update([
			'last_activity_at' => now(),
		]);
		
		broadcast(new HeartbeatEvent($user));
		
		return response()->json([
			'status' => 'ok',
		]);
	}
}

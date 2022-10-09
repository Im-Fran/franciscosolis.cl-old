<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;

class ActivityController extends Controller {
 
	/* Sets the activity for the current online user */
	public function setActivity(Request $request){
		$user = $request->user();
		$user->update([
			'last_activity_at' => now(),
		]);
		return response()->json([
			'status' => 'success',
			'message' => 'Activity updated for user ' . $user->name,
		]);
	}
	
	/* Gets the online activity for the given user. */
	public function getActivity(User $user) {
		return response()->json([
			'status' => 'success',
			'message' => 'Activity status for user ' . $user->name,
			'last_activity_at' => $user->last_activity_at,
			'is_online' => $user->last_activity_at != null && $user->last_activity_at->diffInMinutes(now()) < 5,
		]);
	}
	
}

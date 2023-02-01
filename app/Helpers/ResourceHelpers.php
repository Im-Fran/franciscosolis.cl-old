<?php

namespace App\Helpers;

use Illuminate\Http\JsonResponse;

class ResourceHelpers {
	
	public static function generate($resourceClass, $object): JsonResponse {
		$request = request();
		$resource = new $resourceClass($object);
		$only = collect(explode(',', $request->input('only', '*')))->map(fn($it) => trim($it))->values();
		$data = collect($resource->toArray($request))->filter(fn($value, $key) => $only->contains($key) || $only[0] === '*');
		return response()->json(['data' => $data]);
	}
	
}
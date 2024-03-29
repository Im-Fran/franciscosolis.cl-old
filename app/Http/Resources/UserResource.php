<?php

namespace App\Http\Resources;

use Illuminate\Contracts\Support\Arrayable;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use JsonSerializable;

class UserResource extends JsonResource {
    /**
     * Transform the resource into an array.
     *
     * @param Request $request
     */
    public function toArray($request): array|JsonSerializable|Arrayable {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'profile_photo_url' => $this->profile_photo_url,
            'last_activity_at' => $this->settings['activity.public'] ? $this->last_activity_at : null,
            'is_online' => $this->settings['activity.public'] && $this->is_online,
            'slug' => $this->slug,
        ];
    }
}

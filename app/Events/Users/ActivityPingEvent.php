<?php

namespace App\Events\Users;

use App\Models\User;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class ActivityPingEvent implements ShouldBroadcast {
    use Dispatchable, InteractsWithSockets, SerializesModels;

    private User $user;

    /**
     * Create a new event instance.
     */
    public function __construct(User $user) {
        $this->user = $user;
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return array|\Illuminate\Broadcasting\Channel
     */
    public function broadcastOn() {
        return new PrivateChannel("UserActivity.{$this->user->slug}");
    }

    public function broadcastAs(): string {
        return 'users.activityping';
    }

    public function broadcastWith(): array {
        return [
            'last_activity_at' => $this->user->last_activity_at,
        ];
    }
}

<?php

namespace App\Events;

use App\Models\User;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class HeartbeatEvent implements ShouldBroadcast {
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
        return new Channel('UserActivity');
    }

    public function broadcastAs() {
        return 'heartbeat';
    }

    public function broadcastWith() {
        return [
            'id' => $this->user->id,
            'name' => $this->user->name,
            'slug' => $this->user->slug,
        ];
    }
}

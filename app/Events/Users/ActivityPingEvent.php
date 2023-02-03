<?php

namespace App\Events\Users;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class ActivityPingEvent implements ShouldBroadcast {
    use Dispatchable, InteractsWithSockets, SerializesModels;

    private string $slug;

    private $lastActivityAt;

    /**
     * Create a new event instance.
     *
     * @param mixed $slug
     * @param mixed $lastActivityAt
     */
    public function __construct($slug, $lastActivityAt) {
        $this->slug = $slug;
        $this->lastActivityAt = $lastActivityAt;
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return array|Channel
     */
    public function broadcastOn() {
        return new PrivateChannel("UserActivity.{$this->slug}");
    }

    public function broadcastAs(): string {
        return 'users.activityping';
    }

    public function broadcastWith(): array {
        return [
            'last_activity_at' => $this->lastActivityAt,
        ];
    }
}

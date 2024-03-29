<?php

namespace App\Notifications\Account;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Notifications\Messages\BroadcastMessage;
use Illuminate\Notifications\Notification;

class EmailVerifiedNotification extends Notification implements ShouldBroadcast {
    use Queueable;

    /**
     * Create a new notification instance.
     */
    public function __construct() {
    }

    /**
     * Get the notification's delivery channels.
     */
    public function via(mixed $notifiable): array {
        return ['database', 'broadcast'];
    }

    /**
     * Get the array representation of the notification.
     */
    public function toArray(mixed $notifiable): array {
        return [
            'message' => 'Your email has been verified!',
        ];
    }

    public function toBroadcast(): BroadcastMessage {
        return (new BroadcastMessage([
            'message' => 'Your email has been verified!',
        ]));
    }
}

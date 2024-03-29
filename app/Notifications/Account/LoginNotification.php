<?php

namespace App\Notifications\Account;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Notifications\Messages\BroadcastMessage;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class LoginNotification extends Notification implements ShouldBroadcast {
    use Queueable;

    private string $ip;

    private string $device;

    private string $location;

    /**
     * Create a new notification instance.
     */
    public function __construct(string $ip, string $device = 'Unknown Device', string $location = 'Unknown Location') {
        $this->ip = $ip;
        $this->device = $device;
        $this->location = $location;
    }

    /**
     * Get the notification's delivery channels.
     */
    public function via(mixed $notifiable): array {
        return ['mail', 'database', 'broadcast'];
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail(mixed $notifiable): MailMessage {
        return (new MailMessage())
            ->subject('New Login Activity')
            ->markdown('mail.account.login', [
                'ip' => $this->ip,
                'device' => $this->device,
                'location' => $this->location,
            ]);
    }

    /**
     * Get the array representation of the notification.
     */
    public function toArray(mixed $notifiable): array {
        return [
            'ip' => $this->ip,
            'device' => $this->device,
            'location' => $this->location,
        ];
    }

    /**
     * Get the broadcastable representation of the notification.
     */
    public function toBroadcast(mixed $notifiable): BroadcastMessage {
        return (new BroadcastMessage([
            'message' => 'New Login Activity',
            'action' => [
                'display' => 'View',
                'url' => route('account.notifications'),
            ],
        ]));
    }
}

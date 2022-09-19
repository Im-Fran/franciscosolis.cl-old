<?php

namespace App\Notifications\Account;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class LoginNotification extends Notification
{
    use Queueable;

    private string $ip, $device, $location;

    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct($ip, $device = 'Unknown Device', $location = 'Unknown Location') {
        $this->ip = $ip;
        $this->device = $device;
        $this->location = $location;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function via($notifiable)
    {
        return ['mail', 'database'];
    }

    /**
     * Get the mail representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return \Illuminate\Notifications\Messages\MailMessage
     */
    public function toMail($notifiable)
    {
        return (new MailMessage)
            ->subject('New Login Activity')
            ->markdown('mail.account.login', [
                'ip' => $this->ip,
                'device' => $this->device,
                'location' => $this->location,
            ]);
    }

    /**
     * Get the array representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function toArray($notifiable) {
        return [
            'ip' => $this->ip,
            'device' => $this->device,
            'location' => $this->location,
        ];
    }
}

<?php

namespace App\Notifications\Account;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\BroadcastMessage;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class TwoFactorAuthenticationEnabled extends Notification implements ShouldBroadcast {
    use Queueable;

    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct() {
        //
    }

    /**
     * Get the notification's delivery channels.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function via(mixed $notifiable): array {
        return ['mail', 'database', 'broadcast'];
    }

    /**
     * Get the mail representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return MailMessage
     */
    public function toMail(mixed $notifiable): MailMessage {
        return (new MailMessage)
	        ->subject('2FA Enabled!')
	        ->line('2FA has been enabled for your account! This will provide an extra layer of protection to your account.')
	        ->line('If you did not enable 2FA, please contact us immediately.')
	        ->action('Review Activity', route('account'));
    }

    /**
     * Get the array representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function toArray(mixed $notifiable): array {
        return [];
    }
	
	/**
	 * Get the broadcastable representation of the notification.
	 *
	 * @param  mixed  $notifiable
	 * @return BroadcastMessage
	 */
	public function toBroadcast(mixed $notifiable): BroadcastMessage {
		return (new BroadcastMessage([
			'message' => '2FA Enabled',
			'action' => [
				'display' => 'View',
				'url' => route('account.notifications'),
			],
		]));
	}
}

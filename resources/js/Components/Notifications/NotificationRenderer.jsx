import LoginNotification from "@/js/Components/Notifications/LoginNotification";
import EmailVerifiedNotification from "@/js/Components/Notifications/EmailVerifiedNotification";
import TwoFactorAuthenticationDisabled from "@/js/Components/Notifications/TwoFactorAuthenticationDisabled";

export default function NotificationRenderer({ notification, short }) {

    switch (notification.type) {
        case 'App\\Notifications\\Account\\LoginNotification':
            return <><LoginNotification notification={notification} short={short}/></>
        case 'App\\Notifications\\Account\\EmailVerifiedNotification':
            return <><EmailVerifiedNotification short={short}/></>
        case 'App\\Notifications\\Account\\TwoFactorAuthenticationDisabled':
            return <><TwoFactorAuthenticationDisabled short={short}/></>
        default:
            return <>{notification.data?.message || ''}</>
    }
}

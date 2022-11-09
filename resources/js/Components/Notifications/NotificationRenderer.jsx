import { useEffect } from 'react'

import LoginNotification from "@/js/Components/Notifications/LoginNotification";
import EmailVerifiedNotification from "@/js/Components/Notifications/EmailVerifiedNotification";

export default function NotificationRenderer({ notification, short }) {

    useEffect(() => {
        console.log('Rendering notification...', notification)
    }, [notification]);

    switch (notification.type) {
        case 'App\\Notifications\\Account\\LoginNotification':
            return <LoginNotification notification={notification} short={short}/>
        case 'App\\Notifications\\Account\\EmailVerifiedNotification':
            return <EmailVerifiedNotification short={short}/>
        default:
            return notification.message || <></>
    }
}
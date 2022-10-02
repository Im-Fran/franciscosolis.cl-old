import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Inertia } from "@inertiajs/inertia";
import toast from "react-hot-toast";

import AccountLayout from "@/js/Layouts/AccountLayout";
import LoginNotification from "@/js/Components/Notifications/LoginNotification";

export default function Index({ notifications }) {

    const markAsRead = (notification) => {
        Inertia.post(route('account.notifications.markasread', {notification: notification.id}), {}, {
            onSuccess: () => {
                toast.success('Notification marked as read', {
                    duration: 3000,
                });
            },
            onError: () => {
                toast.error('Unable to mark notification as read', {
                    duration: 5000,
                });
            },
        });
    };

    const renderNotifications = () => {
        if(notifications.length == 0) {
            return (
                <div className="text-center text-lg">
                    <span>All catched up 🥳</span>
                </div>
            )
        } else {
            return notifications.map((notification, index) => (
                <div key={index} className={"flex flex-row items-center justify-start w-full px-4 py-2 border-b border-gray-200 whitespace-nowrap overflow-scroll " + (index === (notifications.length-1) ? ' border-none ' : '')}>
                    <div onClick={() => markAsRead(notification)} className="text-brand-300 cursor-pointer">
                        <FontAwesomeIcon icon="fas fa-check-circle"/>
                    </div>
                    &nbsp;&nbsp;&nbsp;
                    {notification.type === 'App\\Notifications\\Account\\LoginNotification' && <LoginNotification notification={notification}/>}
                </div>
            ))
        }
    };
    console.log(notifications)

    return (
        <AccountLayout title="My Account">
            <div className="md:grid md:grid-cols-3 gap-16 w-full text-brand-500 dark:text-white">
                <div className="col-span-3 bg-gray-50 dark:bg-brand-500 border border-brand-500 border-solid border-opacity-10 dark:border-none shadow-md rounded-lg w-full py-2 transition-all">
                    <div className="flex flex-col items-center w-full text-4xl">
                        <FontAwesomeIcon icon="fas fa-bell"/>
                        <h1 className="text-xl font-bold">Notifications</h1>
                        <hr className="border-0 border-b border-b-brand-500 dark:border-b-brand-600 border-solid w-full"/>
                    </div>
                    <div className="flex flex-col items-center w-full py-2">
                        {renderNotifications()}
                    </div>
                </div>
            </div>
        </AccountLayout>
    );
}

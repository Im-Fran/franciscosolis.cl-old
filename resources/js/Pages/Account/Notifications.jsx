import { router } from "@inertiajs/react";
import toast from "react-hot-toast";

import { CheckCircleIcon, TrashIcon, BellIcon, ClockIcon } from '@heroicons/react/24/outline';
import AccountLayout from "@/js/Layouts/AccountLayout";
import RelativeTime from "@/js/Components/RelativeTime";
import NotificationRenderer from "@/js/Components/Notifications/NotificationRenderer";
import Pagination from "@/js/Components/Pagination";
import Tooltip from "@/js/Components/Tooltip";

export default function Notifications({ notifications, unreadNotifications }) {
    const markAsRead = (notification) => {
        router.post(route('account.notifications.markasread', {notification: notification.id}), {}, {
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

    const deleteNotification = (notification) => {
        if(confirm('Are you sure you want to delete this notification?')){
            router.post(route('account.notifications.delete', {notification: notification.id}), {
                _method: 'DELETE',
            }, {
                onSuccess: () => {
                    toast.success('Notification deleted', {
                        duration: 3000,
                    });
                },
                onError: () => {
                    toast.error('Unable to delete notification', {
                        duration: 5000,
                    });
                },
            });
        }
    };

    const renderUnreadNotifications = () => {
        if(unreadNotifications.length === 0) {
            return (
                <div className="text-center text-lg">
                    <span>All catched up 🥳</span>
                </div>
            )
        } else {
            return unreadNotifications.data.map((notification, index) => (
                <div key={index.toString()} className={"flex flex-row items-center justify-between w-full px-4 py-2 border-b border-gray-200 whitespace-nowrap overflow-scroll " + (index === (unreadNotifications.length-1) ? ' border-none ' : '')}>
                    <div className="flex flex-row justify-start overflow-scroll w-full max-w-screen-md">
                        <div className="block w-6 h-6">
                            <Tooltip content="Mark As Read">
                                <CheckCircleIcon className="w-6 h-6 text-brand-300 cursor-pointer" onClick={() => markAsRead(notification)}/>
                            </Tooltip>
                        </div>
                        &nbsp;&nbsp;&nbsp;
                        <NotificationRenderer short={false} notification={notification}/>
                    </div>

                    <RelativeTime date={notification.created_at} className="text-xs text-gray-400"/>
                </div>
            ))
        }
    };

    const renderNotifications = () => {
        return notifications.data.map((notification, index) => (
            <div key={index} className={"flex flex-row items-center justify-between w-full px-4 py-2 border-b border-gray-200 whitespace-nowrap overflow-scroll " + (index === (notification.total-1) ? ' border-none ' : '')}>
                <div className="flex flex-row justify-start overflow-scroll w-full max-w-screen-md">
                    <div className="block">
                        <Tooltip content="Delete Notification">
                            <TrashIcon onClick={() => deleteNotification(notification)} className="w-6 h-6 text-brand-200 cursor-pointer"/>
                        </Tooltip>
                    </div>
                    &nbsp;&nbsp;&nbsp;
                    <NotificationRenderer short={false} notification={notification}/>
                </div>
                <RelativeTime date={notification.created_at} className="text-xs text-gray-400"/>
            </div>
        ));
    };

    return (
        <AccountLayout title="Notifications">
            <div className="md:grid md:grid-cols-3 gap-16 w-full text-brand-500 dark:text-white">
                <div className="col-span-3 bg-gray-50 dark:bg-brand-500 border border-brand-500 border-solid border-opacity-10 dark:border-none shadow-md rounded-lg w-full py-2 transition-all">
                    <div className="flex flex-col items-center w-full text-4xl">
                        <BellIcon className="w-6 h-6"/>
                        <h1 className="text-xl font-bold">Unread Notifications</h1>
                        <hr className="border-0 border-b border-b-brand-500 dark:border-b-brand-600 border-solid w-full"/>
                    </div>
                    <div className="flex flex-col items-center w-full py-2">
                        {renderUnreadNotifications()}
                    </div>
                    <Pagination data={unreadNotifications} only={['unreadNotifications']} target="account.notifications"/>
                </div>
                <div className="col-span-3 bg-gray-50 dark:bg-brand-500 border border-brand-500 border-solid border-opacity-10 dark:border-none shadow-md rounded-lg w-full py-2 transition-all">
                    <div className="flex flex-col items-center w-full text-4xl">
                        <ClockIcon className="w-6 h-6"/>
                        <h1 className="text-xl font-bold">Past Notifications</h1>
                        <hr className="border-0 border-b border-b-brand-500 dark:border-b-brand-600 border-solid w-full"/>
                    </div>
                    <div className="flex flex-col items-center w-full py-2">
                        {renderNotifications()}
                    </div>
                    <Pagination data={notifications} only={['notifications']} target="account.notifications"/>
                </div>
            </div>
        </AccountLayout>
    );
}

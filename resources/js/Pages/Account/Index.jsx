import { BellIcon } from '@heroicons/react/24/outline';
import AccountLayout from "@/js/Layouts/AccountLayout";
import NotificationRenderer from '@/js/Components/Notifications/NotificationRenderer'
import RelativeTime from "@/js/Components/RelativeTime";

export default function Index({ notifications, notificationsCount }) {
    const renderNotifications = () => {
        if(notifications.length === 0) {
            return (
                <div className="text-center text-lg">
                    <span>All catched up 🥳</span>
                </div>
            )
        } else {
            return notifications.map((notification, index) => (
                <div key={index} className={"flex flex-row items-center justify-between w-full px-4 py-2 border-b border-gray-200 whitespace-nowrap overflow-scroll " + (index === (notifications.length-1) ? ' border-none ' : '')}>
                    <div className="flex justify-start overflow-scroll w-full max-w-[18rem]">
                        <NotificationRenderer short={true} notification={notification}/>
                    </div>

                    <RelativeTime date={notification.created_at} className="text-xs text-gray-400"/>
                </div>
            ))
        }
    };

    const openNotifications = () => {
        document.getElementById('sidebar-' + route('account.notifications')).click();
    };

    return (
        <AccountLayout title="My Account">
            <div className="md:grid md:grid-cols-5 gap-16 w-full text-brand-500 dark:text-white">
                <div className="col-span-2 col-start-4 bg-gray-50 dark:bg-brand-500 border border-brand-500 border-solid border-opacity-10 dark:border-none shadow-md rounded-lg w-full pt-2 transition-all">
                    <div className="flex flex-col items-center w-full text-4xl">
                        <BellIcon className="w-6 h-6"/>
                        <h1 className="text-xl font-bold">Notifications</h1>
                        <hr className="border-0 border-b border-b-brand-500 dark:border-b-brand-600 border-solid w-full"/>
                    </div>
                    <div className="flex flex-col items-center w-full py-2">
                        {renderNotifications()}
                    </div>

                    <div onClick={() => openNotifications()} className="transition-all duration-300 flex justify-center items-center rounded-b-lg bg-gray-300 dark:bg-[#3c3c3c] dark:hover:bg-[#2c2c2c] bg-opacity-60 dark:bg-opacity-100 hover:bg-opacity-100 py-2 cursor-pointer">
                        {notificationsCount > 0 ? <>Show other {notificationsCount} notifications.</> : <>View All Notifications</> }
                    </div>
                </div>
            </div>
        </AccountLayout>
    );
}

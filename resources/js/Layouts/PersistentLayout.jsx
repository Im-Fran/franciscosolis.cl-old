import { useEffect } from 'react';
import { usePage, Link } from '@inertiajs/react'
import toast from "react-hot-toast";

import { BellIcon } from '@heroicons/react/24/outline';

export default function PersistentLayout({ children }) {
    const { auth } = usePage().props
    useEffect(() => {
        if (window.Echo && auth.check && auth.user) {
            console.log('Logging in into the personal private channel')
            const channel = window.Echo.private(`User.${auth.user.id}`).notification((notification) => {
                toast(notification.action ? (
                    <div className="flex flex-row justify-between w-full">
                        <span>{notification.message}</span>
                        <div className="border-l border-brand-500 pr-2 ml-3" />
                        <Link href={notification.action.url} className="text-blue-500">{notification.action.display}</Link>
                    </div>
                ) : notification.message, {
                    duration: 5000,
                    icon: (<BellIcon className="w-6 h-6 animate-ring" />),
                })
            })

            return () => (channel && channel.unsubscribe());
        }
    }, [auth, window.Echo]);

    return (
        <main data-persistent-layout={1}>
            {children}
        </main>
    )
}

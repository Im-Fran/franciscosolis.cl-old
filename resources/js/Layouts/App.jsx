import { useEffect } from 'react';
import {Head, Link, router, usePage} from '@inertiajs/react';
import toast, { Toaster } from 'react-hot-toast';
import { Tooltip } from 'react-tooltip';

import Header from '@/js/Shared/Header';
import Foot from '@/js/Shared/Foot';
import {BellIcon} from "@heroicons/react/24/outline";
import axios from "axios";

export default function App({ children, title, meta = [], vertical = "top", horizontal = "left" }) {
    const { auth, flash } = usePage().props;
    useEffect(() => {
        flash.forEach(item => {
            if (typeof toast[item.type] === 'function') {
                toast[item.type](item.message, {
                    duration: 5000,
                })
            } else {
                toast(item.message, {
                    duration: 5000,
                })
            }
        })
    }, [flash]);

    useEffect(() => {
        if(auth.user?.settings['activity.public']) {
            const heartbeat = () => { // Send heartbeat every 30 seconds, but try to every 15 seconds
                if(dayjs().diff(dayjs(auth.user?.last_activity_at), 's') > 30) { // Validate that it's been 30 seconds since last heartbeat
                    axios.get(route('api.v1.self.heartbeat')).then(() => { // Send heartbeat
                        router.reload({ // Reload page to update last_activity_at
                            only: ['auth'],
                        });
                    })
                }
            }

            const interval = setInterval(heartbeat, 15000); // Send heartbeat every 15 seconds
            heartbeat(); // Send heartbeat immediately

            return () => clearInterval(interval) // Clear interval on unmount
        }
    });

    useEffect(() => {
        window.Echo?.private(`User.${auth.user?.id}`)?.notification(notification => {
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

        return () => window.Echo?.leave(`User.${auth.user?.id}`);
    }, [auth, window.Echo]);

    // Check if user's preference is dark mode
    const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");
    const darkMode = prefersDarkScheme.matches;
    if (!localStorage.getItem('theme')) {
        localStorage.setItem('theme', darkMode ? 'dark' : 'light');
    }

    return (
        <>
            <div className={(localStorage.getItem('theme') === 'dark') ? 'dark' : ''}>
                <Head>
                    <title>{title}</title>
                    {/*{meta.map((item, index) => (*/}
                    {/*    <meta head-key={`meta-${index}`} {...item}/>*/}
                    {/*))}*/}
                </Head>
                <div className="transition transform-all duration-200 bg-white dark:bg-[#212121] text-gray-900 dark:text-white">
                    <Header />
                    <Toaster position="top-right" reverseOrder />
                    <div className={"container mx-auto my-10 min-h-screen flex " + (vertical === "center" ? "items-center" : (vertical === "bottom" ? "items-end" : "items-start")) + " " + (horizontal === "center" ? "justify-center" : (horizontal === "right" ? "justify-end" : "justify-start"))}>
                        {children}
                        <Tooltip backgroundColor="#111827" textColor="#fff" />
                    </div>
                    <Foot />
                </div>
            </div>
        </>
    );
}

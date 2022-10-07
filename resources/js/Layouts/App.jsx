import { useEffect } from 'react';
import { Head, Link, usePage } from '@inertiajs/inertia-react';
import toast, { Toaster } from 'react-hot-toast';
import ReactTooltip from 'react-tooltip';
import {BellIcon} from '@heroicons/react/24/outline';

import Header from '@/js/Shared/Header';
import Foot from '@/js/Shared/Foot';

export default function App({ children, title, meta = [], vertical = "top", horizontal = "left"}){
    const { flash, auth } = usePage().props;
    useEffect(() => {
        flash.forEach(item => {
            if(typeof toast[item.type] === 'function') {
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

    if(auth.check && auth.user){
        useEffect(() => {
            if(window.Echo) {
                const channel = window.Echo.private(`App.Models.User.${auth.user.id}`).notification((notification) => {
                    console.log(notification);
                    toast(notification.action ? (
                        <div className="flex flex-row justify-between w-full">
                            <span>{notification.message}</span>
                            <div className="border-l border-brand-500 pr-2 ml-3"/>
                            <Link href={notification.action.url} className="text-blue-500">{notification.action.display}</Link>
                        </div>
                    ) : notification.message, {
                        duration: 5000,
                        icon: (<BellIcon className="w-6 h-6 animate-ring"/>),
                    })
                })

                return () => (channel && channel.unsubscribe());
            }
        });
    }

    const metaItems = meta.map((item, index) => {
        return <meta key={`meta-${index}`} head-key={`meta-${index}`} {...item} />
    })

    // Check if user's preference is dark mode
    const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");
    const darkMode = prefersDarkScheme.matches;
    if(!localStorage.getItem('theme')) {
        localStorage.setItem('theme', darkMode ? 'dark' : 'light');
    }

    return (
        <div className={(localStorage.getItem('theme') === 'dark') ? 'dark' : ''}>
            <Head>
                <title>{title}</title>
            </Head>
            <div className="transition transform-all duration-200 bg-white dark:bg-[#212121] text-gray-900 dark:text-white">
                <Header className=""/>
                <Toaster position="top-right" reverseOrder/>
                <div className={"container mx-auto my-10 min-h-screen flex " + (vertical === "center" ? "items-center" : (vertical === "bottom" ? "items-end" : "items-start")) + " " + (horizontal === "center" ? "justify-center" : (horizontal === "right" ? "justify-end" : "justify-start"))}>
                    {children}
                    <ReactTooltip backgroundColor="#111827" textColor="#fff"/>
                </div>
                <Foot/>
            </div>
        </div>
    );
}

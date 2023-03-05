import { useEffect } from 'react';
import {Head, Link, router, usePage} from '@inertiajs/react';
import toast, { Toaster } from 'react-hot-toast';
import { Tooltip, TooltipProvider } from 'react-tooltip';

import Header from '@/js/Shared/Header';
import Foot from '@/js/Shared/Foot';
import {BellIcon} from "@heroicons/react/24/outline";
import axios from "axios";

export default function App({ children, title, vertical = "top", horizontal = "left" }) {
    const { auth, flash, utils } = usePage().props;

    useEffect(() => { // Csrf Updater
        document.dispatchEvent(new CustomEvent('csrf-update', {
            detail: {
                token: utils.csrf_token,
            }
        }));
    }, [utils]);

    useEffect(() => {
        flash.forEach(item => {
            const message = markdown.renderInline(item.message)
            if (typeof toast[item.type] === 'function') {
                toast[item.type](message, {
                    duration: 5000,
                })
            } else {
                toast(message, {
                    duration: 5000,
                })
            }
        })
    }, [flash]);

    useEffect(() => {
        if(auth.user?.settings['activity.public']) {
            const heartbeat = () => { // Send heartbeat every 3 minutes, but try to every minute
                if(dayjs().diff(dayjs(auth.user?.last_activity_at), 'm') > 3 || !auth.user?.last_activity_at) { // Validate that it's been 3 minutes since last heartbeat
                    axios.get(route('api.v1.self.heartbeat')).then(() => { // Send heartbeat
                        router.reload({ // Reload page to update last_activity_at
                            only: ['auth'],
                        });
                    })
                }
            }

            const interval = setInterval(heartbeat, 60000); // Send heartbeat every minute
            heartbeat(); // Send heartbeat immediately

            return () => clearInterval(interval) // Clear interval on unmount
        }
    });

    useEffect(() => {
        if(auth.check && auth.user) {
            const notify = (notification) => {
                toast(notification.action ? (
                    <div className="flex flex-row justify-between w-full">
                        <span>{markdown.renderInline(notification.message)}</span>
                        <div className="border-l border-brand-500 pr-2 ml-3" />
                        <Link href={notification.action.url} className="text-blue-500">{markdown.renderInline(notification.action.display)}</Link>
                    </div>
                ) : markdown.renderInline(notification.message), {
                    duration: 5000,
                    icon: (<BellIcon className="w-6 h-6 animate-ring" />),
                })
            };

            window.Echo?.private(`User.${auth.user?.id}`)?.notification(notify)

            return () => window.Echo?.leave(`User.${auth.user?.id}`);
        }
    }, [auth, window.Echo]);

    // Check if user's preference is dark mode
    const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");
    const darkMode = prefersDarkScheme.matches;
    if (!localStorage.getItem('theme')) {
        localStorage.setItem('theme', darkMode ? 'dark' : 'light');
    }

    return (
        <TooltipProvider>
            <div className={(localStorage.getItem('theme') === 'dark') ? 'dark' : ''}>
                <Head>
                    <title>{title}</title>
                </Head>
                <div className="transition transform-all duration-200 bg-white dark:bg-[#212121] text-gray-900 dark:text-white">
                    <Header />
                    <Toaster position="top-right" reverseOrder />
                    <Tooltip delayShow={1} delayHide={1} float/>
                    <div className={"container mx-auto my-10 min-h-screen flex " + (vertical === "center" ? "items-center" : (vertical === "bottom" ? "items-end" : "items-start")) + " " + (horizontal === "center" ? "justify-center" : (horizontal === "right" ? "justify-end" : "justify-start"))}>
                        {children}
                    </div>
                    <Foot />
                </div>
            </div>
        </TooltipProvider>
    );
}

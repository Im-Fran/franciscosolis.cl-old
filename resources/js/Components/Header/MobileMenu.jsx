import { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';

import { Bars4Icon, XMarkIcon, EllipsisVerticalIcon, ArrowRightOnRectangleIcon, PencilSquareIcon } from '@heroicons/react/24/outline'
import { Transition } from 'react-transition-group';
import ClickAwayListener from 'react-click-away-listener';
import UserProfilePicture from '@/js/Components/UserProfilePicture';

export default function MobileMenu({ links }) {
    const { auth } = usePage().props;
    const hour = new Date().getHours();
    const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : hour < 22 ? 'Good evening' : hour < 24 ? 'Good night' : 'Hello';

    const [isMobileOpen, setMobileOpen] = useState(false);
    const [isMobileMenuHidden, setMobileMenuHidden] = useState(true);
    const toggleMobileMenu = (e) => {
        e.stopPropagation();
        e.preventDefault();
        setMobileOpen((prev) => !prev);
    }
    const hideMobileMenu = () => {
        setMobileOpen((_) => false);
    };

    const mobileAnimatedClasses = {
        entering: "ease-out duration-300 opacity-0 translate-x-20",
        entered: "ease-out duration-300 opacity-100 translate-x-0",
        exiting: "ease-in duration-200 opacity-100 translate-x-0",
        exited: "ease-in duration-200 opacity-0 translate-x-20",
    };

    const mobileBackgroundAnimatedClasses = {
        entering: "ease-out duration-300 opacity-0",
        entered: "ease-out duration-300 opacity-100",
        exiting: "ease-in duration-200 opacity-100",
        exited: "ease-in duration-200 opacity-0",
    }


    const onExitedMobile = () => {
        setTimeout(() => {
            setMobileMenuHidden((_) => true);
        }, 300);
    }

    const onEnterMobile = () => {
        setMobileMenuHidden((_) => false);
    }

    const authenticated = (
        auth && auth.user ? <div className="flex flex-row items-start justify-between gap-2">
            <div className="flex flex-row items-center gap-3">
                <span onClick={toggleMobileMenu} className="flex items-center cursor-pointer">
                    <UserProfilePicture user={auth.user} />
                </span>
                <span className="flex flex-col items-start text-sm">
                    <span>{greeting},</span>
                    <span className="flex"><Link href={/*route('profile', { user: auth.user.slug })*/ '#'} className="flex items-center hover:text-red-500 transition-all duration-200">{auth.user.name}</Link>!</span>
                </span>
            </div>

            <Link href={route('account.settings')} className="flex items-center text-white font-bold"><EllipsisVerticalIcon className="w-5 h-5" /></Link>
        </div> : <></>
    )
    const guest = (
        <div className="flex flex-row justify-between items-center gap-5">
            <Link href={route('login')} className="text-white font-bold flex items-center"><ArrowRightOnRectangleIcon className="w-5 h-5" />&nbsp;Login</Link>
            <Link href={route('register')} className="text-white font-bold flex items-center"><PencilSquareIcon className="w-5 h-5" />&nbsp;Register</Link>
        </div>
    );

    return (
        <div className="flex md:hidden">
            <Bars4Icon onClick={toggleMobileMenu} className="h-6 w-6 cursor-pointer" />


            <Transition in={isMobileOpen} onEnter={onEnterMobile} onExited={onExitedMobile} timeout={1}>
                {state => (
                    <div className={`${isMobileMenuHidden ? 'hidden' : 'flex'} fixed inset-0 z-50 flex-col items-center justify-center w-full h-full bg-black bg-opacity-50 ${mobileBackgroundAnimatedClasses[state]}`}>
                        <div className="relative z-50 w-full h-full">
                            <ClickAwayListener onClickAway={hideMobileMenu}>
                                <div className={`absolute top-0 right-0 z-50 w-[45%] portrait:w-[70%] h-full bg-white dark:bg-[#232323] ${mobileAnimatedClasses[state]}`}>
                                    <div className="py-4 h-full">
                                        <div className="flex flex-col items-end justify-center w-full px-6">
                                            <XMarkIcon onClick={hideMobileMenu} className="w-6 h-6 cursor-pointer" />
                                        </div>

                                        <div className="flex flex-col grow justify-between h-full pb-5">
                                            <div className="px-6 flex flex-col items-start justify-center w-full">
                                                {links.map((link, index) => (
                                                    <Link href={link.href} key={index} className="text-white font-bold flex items-center">
                                                        <link.icon className="w-5 h-5" />&nbsp;{link.label}
                                                    </Link>
                                                ))}
                                            </div>

                                            {/* Account */}
                                            <div className="shrink-0 border-t border-brand-500 dark:border-brand-600">
                                                <div className="px-6 mt-2">
                                                    {auth.user ? authenticated : guest}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </ClickAwayListener>

                        </div>
                    </div>
                )}
            </Transition>
        </div>
    )
}

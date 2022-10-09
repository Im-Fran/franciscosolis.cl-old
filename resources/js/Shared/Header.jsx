import ClickAwayListener from 'react-click-away-listener';
import { useState } from 'react';
import { Link, usePage } from '@inertiajs/inertia-react';

import { Bars4Icon, Bars3CenterLeftIcon, ArrowRightOnRectangleIcon, ArrowLeftOnRectangleIcon, PencilSquareIcon, HomeIcon, ExclamationTriangleIcon, XMarkIcon, Cog6ToothIcon } from '@heroicons/react/24/outline'
import LogoWhite from '$/LogoWhite.png';

import AnimatedLink from '@/js/Components/AnimatedLink';
import AccountDropdownItem from '@/js/Components/Header/AccountDropdownItem';
import {handleImageSize} from "@/js/Utils/Utils";

export default function Header() {
    /* Account Dropdown State */
    const [isOpen, setOpen] = useState(false);
    const toggleMenu = (e) => {
        e.stopPropagation();
        e.preventDefault();
        setOpen((prev) => !prev);
    }
    const hideMenu = () => {
        setOpen((_) => false);
    };

    /* Mobile Dropdown */
    const [isMobileOpen, setMobileOpen] = useState(false);
    const toggleMobileMenu = (e) => {
        e.stopPropagation();
        e.preventDefault();
        setMobileOpen((prev) => !prev);
    }
    const hideMobileMenu = () => {
        setMobileOpen((_) => false);
    };

    /* Authentication & User Data */
    const { auth, utils } = usePage().props;
    const hour = new Date().getHours();
    const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : hour < 22 ? 'Good evening' : hour < 24 ? 'Good night' : 'Hello';

    /* Login/Register or Account Link */
    const authenticated = (
        auth.user ? <div className="flex flex-row justify-between items-center gap-2">
            <div className="flex items-center">{greeting},&nbsp;<Link href={/*route('profile', { user: auth.user.slug })*/ '#'} className="flex items-center hover:text-red-500 transition-all duration-200">{auth.user.name}</Link>!</div>
            <span onClick={toggleMenu} className="flex items-center cursor-pointer"><img className="h-8 w-8 border border-white rounded-full object-cover" src={handleImageSize(auth.user.profile_photo_url, 32)} alt="Avatar" loading="lazy" /></span>
        </div> : <></>
    );
    const guest = (
        <div className="flex flex-row justify-between items-center gap-5">
            <AnimatedLink href={route('register')} className="text-white font-bold flex items-center"><PencilSquareIcon className="w-5 h-5"/>&nbsp;Register</AnimatedLink>
            <AnimatedLink href={route('login')} className="text-white font-bold flex items-center"><ArrowRightOnRectangleIcon className="w-5 h-5"/>&nbsp;Login</AnimatedLink>
        </div>
    );


    const warning = utils ? utils.global_warning : null;
    const [HiddenWarning, setHiddenWarning] = useState((localStorage.getItem('HiddenWarning') || null) === warning);
    const hideWarning = (event) => {
        event.preventDefault();
        event.stopPropagation();

        document.getElementById('globalWarningWrapper').classList.remove('h-10');
        document.getElementById('globalWarningWrapper').classList.add('h-0');
        setTimeout(() => {
            localStorage.setItem('HiddenWarning', warning);
            setHiddenWarning(true);
        }, 100);
    }

    return (
        <div className="relative">
            <div className="transition transform-all duration-200 bg-brand-100 dark:bg-[#353535] shadow text-white z-30">
                <div className="mx-auto px-6 py-3">
                    <div className="md:flex md:items-center md:justify-between">
                        <div className="flex justify-between items-center w-full">
                            <div className="flex flex-row justify-between items-center">
                                <Link href={route('home')} className="text-white text-xl font-bold md:text-2xl flex items-center">
                                    <img src={LogoWhite} alt="FranciscoSolis" className="h-8 w-8" loading="lazy"/>
                                    &nbsp;
                                    FranciscoSolis
                                </Link>
                            </div>

                            {/* Hide in phones */}
                            <div className="hidden md:flex flex-row justify-between items-center gap-5">
                                <AnimatedLink href={route('home')} className="text-white font-bold md:text-2xl flex items-center"><HomeIcon className="w-5 h-5"/>&nbsp;Home</AnimatedLink>
                            </div>
                            <div className="hidden md:flex flex-row justify-between items-center">
                                {auth.user ? authenticated : guest}
                                {(isOpen && auth.user) && <ClickAwayListener onClickAway={hideMenu}>
                                    <div className="relative inline-block mt-5">
                                        <div className="absolute right-0 z-20 w-56 py-2 mt-2 overflow-hidden bg-white rounded-md shadow-xl dark:bg-[#232323]">
                                            <AccountDropdownItem href={/*route('profile', { user: auth.user.slug })*/ '#'} className="w-full flex items-center py-3 px-1 -mt-2 text-sm text-gray-600 transition-colors duration-300 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#303030] dark:hover:text-white">
                                                <img className="flex-shrink-0 object-cover mx-1 rounded-full w-9 h-9" src={auth.user.profile_photo_url} alt="Avatar"/>
                                                <div className="mx-1 text-left">
                                                    <h1 className="text-sm font-semibold text-gray-700 dark:text-gray-200">{auth.user.name}</h1>
                                                    <p className="text-sm text-gray-500 dark:text-gray-400">{auth.user.email}</p>
                                                </div>
                                            </AccountDropdownItem>

                                            <hr className="border-gray-200 dark:border-gray-700"/>

                                            <AccountDropdownItem href={route('account')} method="GET" icon={<Bars3CenterLeftIcon className="w-6 h-6"/>} display="Account Overview"/>
                                            <AccountDropdownItem href={route('account.settings')} method="GET" icon={<Cog6ToothIcon className="w-6 h-6"/>} display="Account Settings"/>

                                            <hr className="border-gray-200 dark:border-gray-700 mt-5"/>
                                            <AccountDropdownItem href={route('logout')} method="POST" icon={<ArrowLeftOnRectangleIcon className="w-6 h-6"/>} display="Logout"/>

                                        </div>
                                    </div>
                                </ClickAwayListener>}
                            </div>

                            {/* Phone Dropdown */}
                            <div className="flex md:hidden">
                                <Bars4Icon className="h-6 w-6 cursor-pointer"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {warning && !HiddenWarning && <div id="globalWarningWrapper" className="absolute inset-x-0 w-full text-brand-500 bg-yellow-500 transition-all z-10 h-10">
                <div id="globalWarningContent" className="container flex items-center justify-between px-6 py-1 mx-auto">
                    <div className="flex">
                        <ExclamationTriangleIcon className="w-6 h-6"/>

                        <p className="mx-3">{warning}</p>
                    </div>

                    <button onClick={hideWarning} className="p-1 transition-colors duration-300 transform rounded-md hover:bg-opacity-25 hover:bg-gray-600 focus:outline-none">
                        <XMarkIcon className="w-6 h-6"/>
                    </button>
                </div>
            </div>}
        </div>
    );
};

import { useRef, useState } from 'react';
import ClickAwayListener from 'react-click-away-listener';
import { Link, usePage } from '@inertiajs/react';

import { Bars4Icon, Bars3CenterLeftIcon, ArrowRightOnRectangleIcon, ArrowLeftOnRectangleIcon, PencilSquareIcon, HomeIcon, ExclamationTriangleIcon, XMarkIcon, Cog6ToothIcon, EnvelopeIcon, KeyIcon, UsersIcon, EllipsisVerticalIcon } from '@heroicons/react/24/outline'
import Logo from '$/Logo.svg';

import AnimatedLink from '@/js/Components/AnimatedLink';
import AccountDropdownItem from '@/js/Components/Header/AccountDropdownItem';
import UserProfilePicture from '@/js/Components/UserProfilePicture';
import { Transition } from 'react-transition-group';

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

    /* Authentication & User Data */
    const { auth, utils } = usePage().props;
    const hour = new Date().getHours();
    const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : hour < 22 ? 'Good evening' : hour < 24 ? 'Good night' : 'Hello';

    /* Login/Register or Account Link */
    const authenticated = (
        auth && auth.user ? <div className="flex flex-row justify-between items-center gap-2">
            <div className="flex items-center">{greeting},&nbsp;<Link href={/*route('profile', { user: auth.user.slug })*/ '#'} className="flex items-center hover:text-red-500 transition-all duration-200">{auth.user.name}</Link>!</div>
            <span onClick={toggleMenu} className="flex items-center cursor-pointer">
                <UserProfilePicture user={auth.user}/>
            </span>
        </div> : <></>
    );
    const mobileAuthenticated = (
        auth && auth.user ? <div className="flex flex-row items-start justify-between gap-2">
            <div className="flex flex-row items-center gap-3">
                <span onClick={toggleMenu} className="flex items-center cursor-pointer">
                    <UserProfilePicture user={auth.user}/>
                </span>
                <span className="flex flex-col items-start text-sm">
                    <span>{greeting},</span>
                    <span className="flex"><Link href={/*route('profile', { user: auth.user.slug })*/ '#'} className="flex items-center hover:text-red-500 transition-all duration-200">{auth.user.name}</Link>!</span>
                </span>
            </div>

            <Link href={route('account.settings')} className="flex items-center text-white font-bold"><EllipsisVerticalIcon className="w-5 h-5"/></Link>
        </div> : <></>
    )

    const guest = (
        <div className="flex flex-row justify-between items-center gap-5">
            <AnimatedLink href={route('register')} className="text-white font-bold flex items-center"><PencilSquareIcon className="w-5 h-5"/>&nbsp;Register</AnimatedLink>
            <AnimatedLink href={route('login')} className="text-white font-bold flex items-center"><ArrowRightOnRectangleIcon className="w-5 h-5"/>&nbsp;Login</AnimatedLink>
        </div>
    );

    const mobileGuest = (
        <div className="flex flex-row justify-between items-center gap-5">
            <Link href={route('login')} className="text-white font-bold flex items-center"><ArrowRightOnRectangleIcon className="w-5 h-5"/>&nbsp;Login</Link>
            <Link href={route('register')} className="text-white font-bold flex items-center"><PencilSquareIcon className="w-5 h-5"/>&nbsp;Register</Link>
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
                                    <img src={Logo} alt="FranciscoSolis" className="h-8 w-8 fill-brand-100" loading="lazy"/>
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
                                        <div className="absolute right-0 z-[9999] w-56 py-2 mt-2 overflow-hidden bg-white rounded-md shadow-xl dark:bg-[#232323]">
                                            <AccountDropdownItem href={/*route('profile', { user: auth.user.slug })*/ '#'} className="w-full flex items-center py-3 px-1 -mt-2 text-sm text-gray-600 transition-colors duration-300 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#303030] dark:hover:text-white cursor-pointer">
                                                <UserProfilePicture className="mx-1" imageClassName="flex-shrink-0" user={auth.user} size={128} sizeClass="w-9 h-9"/>
                                                <div className="mx-1 text-left">
                                                    <h1 className="text-sm font-semibold text-gray-700 dark:text-gray-200">{auth.user.name}</h1>
                                                    <p className="text-sm text-gray-500 dark:text-gray-400">{auth.user.email}</p>
                                                </div>
                                            </AccountDropdownItem>

                                            <hr className="border-gray-200 dark:border-gray-700"/>
                                            <AccountDropdownItem href={route('account')} method="GET" icon={<Bars3CenterLeftIcon className="w-6 h-6"/>} display="Account Overview"/>
                                            <AccountDropdownItem href={route('account.settings')} method="GET" icon={<Cog6ToothIcon className="w-6 h-6"/>} display="Account Settings"/>
                                            <AccountDropdownItem href={route('account.security.access')} method="GET" icon={<KeyIcon className="w-6 h-6"/>} display="Account Access"/>

                                            {utils.env === 'local' && <>
                                                <hr className="border-gray-200 dark:border-gray-700"/>
                                                <AccountDropdownItem href={route('admin.dashboard')} method="GET" icon={<UsersIcon className="w-6 h-6"/>} display="Admin Dashboard"/>
                                                <AccountDropdownItem href={'http://franciscosolis.test:8025/'} icon={<EnvelopeIcon className="w-6 h-6"/>} display="Mailpit Dashboard" inertia={false}/>
                                            </>}



                                            <hr className="border-gray-200 dark:border-gray-700 mt-5"/>
                                            <AccountDropdownItem href={route('logout')} method="POST" icon={<ArrowLeftOnRectangleIcon className="w-6 h-6"/>} display="Logout"/>
                                        </div>
                                    </div>
                                </ClickAwayListener>}
                            </div>

                            {/* Phone Dropdown */}
                            <div className="flex md:hidden">
                                <Bars4Icon onClick={toggleMobileMenu} className="h-6 w-6 cursor-pointer"/>


                                <Transition in={isMobileOpen} onEnter={onEnterMobile} onExited={onExitedMobile} timeout={300}>
                                    {state => (
                                        <div className={`${isMobileMenuHidden ? 'hidden' : 'flex'} fixed inset-0 z-50 flex-col items-center justify-center w-full h-full bg-black bg-opacity-50 ${mobileBackgroundAnimatedClasses[state]}`}>
                                            <div className="relative z-50 w-full h-full">
                                                <div className={`absolute top-0 right-0 z-50 w-[45%] portrait:w-[70%] h-full bg-white dark:bg-[#232323] ${mobileAnimatedClasses[state]}`}>
                                                    <div className=" py-4 h-full">
                                                        <div className="flex flex-col items-end justify-center w-full">
                                                            <XMarkIcon onClick={toggleMobileMenu} className="w-6 h-6 cursor-pointer"/>
                                                        </div>

                                                        <div className="flex flex-col grow justify-between h-[95%]">
                                                            <div className="px-6 flex flex-col items-start justify-center w-full">
                                                                <Link href={route('home')} className="text-white font-bold flex items-center">
                                                                    <HomeIcon className="w-5 h-5" />&nbsp;Home
                                                                </Link>
                                                            </div>

                                                            {/* Account */}
                                                            <div className="shrink-0 border-t border-brand-500 dark:border-brand-600">
                                                                <div className="px-6 mt-2">
                                                                    {auth.user ? mobileAuthenticated : mobileGuest}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </Transition>
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

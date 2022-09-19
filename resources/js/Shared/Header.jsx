import { useState, useRef } from 'react';
import useClickOutside from 'use-click-outside';
import { Link, usePage } from '@inertiajs/inertia-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import AnimatedLink from '@/Components/AnimatedLink';
import LogoWhite from '$/LogoWhite.png';
import AccountDropdownItem from '../Components/Header/AccountDropdownItem';

export default function Header() {
    /* Account Dropdown State */
    const dropdown = useRef();
    const [isOpen, setOpen] = useState(false);
    const toggleMenu = (e) => {
        e.stopPropagation();
        e.preventDefault();
        setOpen((prev) => !prev);
    }
    useClickOutside(dropdown, () => setOpen((prev) => false));

    /* Authentication & User Data */
    const { auth, utils } = usePage().props;
    const hour = new Date().getHours();
    const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : hour < 22 ? 'Good evening' : hour < 24 ? 'Good night' : 'Hello';

    /* Login/Register or Account Link */
    const authenticated = (
        auth.user ? <div className="flex flex-row justify-between items-center gap-2">
            <div className="flex items-center">{greeting},&nbsp;<Link href={/*route('profile', { user: auth.user.slug })*/ '#'} className="flex items-center hover:text-red-500 transition-all duration-200">{auth.user.name}</Link>!</div>
            <span onClick={toggleMenu} className="flex items-center cursor-pointer"><img className="h-8 w-8 border border-white rounded-full object-cover" src={auth.user.profile_photo_url} alt="Avatar"/></span>
        </div> : <></>
    );
    const guest = (
        <div className="flex flex-row justify-between items-center gap-5">
            <AnimatedLink href={route('register')} className="text-white font-bold text-lg"><FontAwesomeIcon icon="fa-solid fa-user-pen"/> Register</AnimatedLink>
            <AnimatedLink href={route('login')} className="text-white font-bold text-lg"><FontAwesomeIcon icon="fa-solid fa-right-to-bracket"/> Login</AnimatedLink>
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
                                    <img src={LogoWhite} alt="FranciscoSolis" className="h-8 w-8"/>
                                    &nbsp;
                                    FranciscoSolis
                                </Link>
                            </div>
                            <div className="flex flex-row justify-between items-center gap-5">
                                <AnimatedLink href={route('home')} className="text-white text-xl font-bold md:text-2xl flex items-center"><FontAwesomeIcon icon="fa-home"/> Home</AnimatedLink>
                            </div>
                            <div className="flex flex-row justify-between items-center">
                                {auth.user ? authenticated : guest}
                                {(isOpen && auth.user) && <div ref={dropdown} className="relative inline-block mt-5">
                                    <div className="absolute right-0 z-20 w-56 py-2 mt-2 overflow-hidden bg-white rounded-md shadow-xl dark:bg-[#232323]">
                                        <AccountDropdownItem href={/*route('profile', { user: auth.user.slug })*/ '#'} className="w-full flex items-center py-3 px-1 -mt-2 text-sm text-gray-600 transition-colors duration-300 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#303030] dark:hover:text-white">
                                            <img className="flex-shrink-0 object-cover mx-1 rounded-full w-9 h-9" src={auth.user.profile_photo_url} alt="Avatar"/>
                                            <div className="mx-1 text-left">
                                                <h1 className="text-sm font-semibold text-gray-700 dark:text-gray-200">{auth.user.name}</h1>
                                                <p className="text-sm text-gray-500 dark:text-gray-400">{auth.user.email}</p>
                                            </div>
                                        </AccountDropdownItem>

                                        <hr className="border-gray-200 dark:border-gray-700"/>

                                        <AccountDropdownItem href={route('account')} method="GET" icon="fa-bars-staggered" display="Account Overview"/>
                                        <AccountDropdownItem href={route('account.settings')} method="GET" icon="fa-user-cog" display="Account Settings"/>

                                        <hr className="border-gray-200 dark:border-gray-700 mt-5"/>
                                        <AccountDropdownItem href={route('logout')} method="POST" icon="fa-solid fa-arrow-right-from-bracket" display="Logout"/>

                                    </div>
                                </div>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {warning && !HiddenWarning && <div id="globalWarningWrapper" className="absolute inset-x-0 w-full text-brand-500 bg-yellow-500 transition-all z-10 h-10">
                <div id="globalWarningContent" className="container flex items-center justify-between px-6 py-1 mx-auto">
                    <div className="flex">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                        </svg>

                        <p className="mx-3">{warning}</p>
                    </div>

                    <button onClick={hideWarning} className="p-1 transition-colors duration-300 transform rounded-md hover:bg-opacity-25 hover:bg-gray-600 focus:outline-none">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
            </div>}
        </div>
    );
};

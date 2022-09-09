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
    const { auth } = usePage().props;
    const hour = new Date().getHours();
    const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : hour < 22 ? 'Good evening' : hour < 24 ? 'Good night' : 'Hello';

    /* Login/Register or Account Link */
    const authenticated = (
        auth.user ? <div className="flex flex-row justify-between items-center gap-2">
            <div className="flex items-center">{greeting},&nbsp;<Link href={/*route('profile', { user: auth.user.slug })*/ '#'} className="flex items-center hover:text-red-500 transition-all duration-200">{auth.user.name}</Link>!</div>
            <span onClick={toggleMenu} className="flex items-center cursor-pointer"><img className="h-8 w-8 border border-white rounded-full" src={auth.user.profile_photo_url} alt="Avatar"/></span>
        </div> : <></>
    );
    const guest = (
        <div className="flex flex-row justify-between items-center gap-5">
            <AnimatedLink href={route('register')} className="text-white font-bold text-lg"><FontAwesomeIcon icon="fa-solid fa-user-pen"/> Register</AnimatedLink>
            <AnimatedLink href={route('login')} className="text-white font-bold text-lg"><FontAwesomeIcon icon="fa-solid fa-right-to-bracket"/> Login</AnimatedLink>
        </div>
    );

    return (
        <div className="transition transform-all duration-200 bg-brand-100 dark:bg-[#353535] shadow text-white">
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

                                    <AccountDropdownItem href={route('logout')} method="POST" icon="fa-solid fa-arrow-right-from-bracket" display="Logout"/>

                                </div>
                            </div>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

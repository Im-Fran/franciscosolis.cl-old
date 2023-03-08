import { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';

import { Transition } from 'react-transition-group';
import { Bars3CenterLeftIcon, ArrowRightOnRectangleIcon, ArrowLeftOnRectangleIcon, PencilSquareIcon, Cog6ToothIcon, EnvelopeIcon, KeyIcon, UsersIcon } from '@heroicons/react/24/outline'
import AnimatedLink from '@/js/Components/AnimatedLink';
import ClickAwayListener from 'react-click-away-listener';
import UserProfilePicture from '@/js/Components/UserProfilePicture';
import AccountDropdownItem from '@/js/Components/Header/AccountDropdownItem';

export default function AccountDropdown() {
    /* Account Dropdown State */
    const [isOpen, setOpen] = useState(false);
    const [hidden, setHidden] = useState(true);
    const toggleMenu = (e) => {
        e.stopPropagation();
        e.preventDefault();
        setOpen((prev) => !prev);
    }
    const hideMenu = () => {
        setOpen((_) => false);
    };

    const onExited = () => {
        setTimeout(() => {
            setHidden((_) => true);
        }, 300);
    }

    const onEnter = () => {
        setHidden((_) => false);
    }

    /*
     * Possible states: entering, entered, exiting, exited
     * The animation should be like a bubble popping up
     */
    const animatedClasses = {
        entering: "ease-out duration-300 opacity-0 scale-0",
        entered: "ease-out duration-300 opacity-100 scale-100",
        exiting: "ease-in duration-200 opacity-100 scale-100",
        exited: "ease-in duration-200 opacity-0 scale-0",
    };

    /* Authentication & User Data */
    const { auth, utils } = usePage().props;
    const hour = new Date().getHours();
    const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : hour < 22 ? 'Good evening' : hour < 24 ? 'Good night' : 'Hello';

    /* Login/Register or Account Link */
    const authenticated = (
        auth && auth.user ? <div className="flex flex-row justify-between items-center gap-2">
            <div className="flex items-center">{greeting},&nbsp;<Link href={/*route('profile', { user: auth.user.slug })*/ '#'} className="flex items-center hover:text-red-500 transition-all duration-200">{auth.user.name}</Link>!</div>
            <span onClick={toggleMenu} className="flex items-center cursor-pointer">
                <UserProfilePicture user={auth.user} />
            </span>
        </div> : <></>
    );

    const guest = (
        <div className="flex flex-row justify-between items-center gap-5">
            <AnimatedLink href={route('register')} className="text-white font-bold flex items-center"><PencilSquareIcon className="w-5 h-5" />&nbsp;Register</AnimatedLink>
            <AnimatedLink href={route('login')} className="text-white font-bold flex items-center"><ArrowRightOnRectangleIcon className="w-5 h-5" />&nbsp;Login</AnimatedLink>
        </div>
    );

    return (<div className="hidden md:flex flex-row justify-between items-center">
        {auth.user ? authenticated : guest}
        {auth.user && <ClickAwayListener onClickAway={hideMenu}>
            <div className={`${hidden ? 'hidden' : 'inline-block'} relative mt-5`}>
                <Transition in={isOpen} onEnter={onEnter} onExited={onExited} timeout={1}>
                    {state => (
                        <div className={`absolute right-0 z-[9999] w-56 py-2 mt-[0.4rem] mr-2 overflow-hidden bg-white rounded-md shadow-xl dark:bg-[#232323] origin-top-right ${animatedClasses[state]}`}>
                            <AccountDropdownItem href={/*route('profile', { user: auth.user.slug })*/ '#'} className="w-full flex items-center py-3 px-1 -mt-2 text-sm text-gray-600 transition-colors duration-300 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#303030] dark:hover:text-white cursor-pointer">
                                <UserProfilePicture className="mx-1" imageClassName="flex-shrink-0" user={auth.user} size={128} sizeClass="w-9 h-9" />
                                <div className="mx-1 text-left">
                                    <h1 className="text-sm font-semibold text-gray-700 dark:text-gray-200">{auth.user.name}</h1>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">{auth.user.email}</p>
                                </div>
                            </AccountDropdownItem>

                            <hr className="border-gray-200 dark:border-gray-700" />
                            <AccountDropdownItem href={route('account')} method="GET" icon={<Bars3CenterLeftIcon className="w-6 h-6" />} display="Account Overview" />
                            <AccountDropdownItem href={route('account.settings')} method="GET" icon={<Cog6ToothIcon className="w-6 h-6" />} display="Account Settings" />
                            <AccountDropdownItem href={route('account.security.access')} method="GET" icon={<KeyIcon className="w-6 h-6" />} display="Account Access" />

                            {utils.env === 'local' && <>
                                <hr className="border-gray-200 dark:border-gray-700" />
                                <AccountDropdownItem href={route('admin.dashboard')} method="GET" icon={<UsersIcon className="w-6 h-6" />} display="Admin Dashboard" />
                                <AccountDropdownItem href={'http://franciscosolis.test:8025/'} icon={<EnvelopeIcon className="w-6 h-6" />} display="Mailpit Dashboard" inertia={false} />
                            </>}



                            <hr className="border-gray-200 dark:border-gray-700 mt-5" />
                            <AccountDropdownItem href={route('logout')} method="POST" icon={<ArrowLeftOnRectangleIcon className="w-6 h-6" />} display="Logout" />
                        </div>
                    )}
                </Transition>
            </div>
        </ClickAwayListener>}
    </div>)
}

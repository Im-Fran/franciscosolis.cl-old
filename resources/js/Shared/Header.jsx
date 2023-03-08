import { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';

import { HomeIcon, ExclamationTriangleIcon, XMarkIcon, ChatBubbleOvalLeftIcon } from '@heroicons/react/24/outline'
import Logo from '$/Logo.svg';

import AnimatedLink from '@/js/Components/AnimatedLink';
import MobileMenu from '@/js/Components/Header/MobileMenu';
import AccountDropdown from '@/js/Components/Header/AccountDropdown';

export default function Header() {
    const { utils } = usePage().props;

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

    const links = [
        {
            href: route('home'),
            icon: HomeIcon,
            label: 'Home',
        },
        {
            href: '#',
            icon: ChatBubbleOvalLeftIcon,
            label: 'Discussions',
        },
    ]

    return (
        <div className="relative">
            <div className="transition transform-all duration-200 bg-brand-100 dark:bg-[#353535] shadow text-white z-30">
                <div className="mx-auto px-6 py-3">
                    <div className="md:flex md:items-center md:justify-between">
                        <div className="flex justify-between items-center w-full">
                            <div className="flex flex-row justify-between items-center">
                                <Link href={route('home')} className="text-white text-xl font-bold md:text-2xl flex items-center">
                                    <img src={Logo} alt="FranciscoSolis" className="h-8 w-8 fill-brand-100" loading="lazy" />
                                    &nbsp;
                                    FranciscoSolis
                                </Link>
                            </div>

                            {/* Hide in phones */}
                            <div className="hidden md:flex flex-row justify-between items-center gap-5">
                                {links.map((link) => (
                                    <AnimatedLink href={link.href} className="text-white font-bold md:text-2xl flex items-center">
                                        <link.icon className="w-5 h-5" />
                                        &nbsp;
                                        {link.label}
                                    </AnimatedLink>
                                ))}
                            </div>
                            {/* Account Dropdown */}
                            <AccountDropdown />

                            {/* Phone Dropdown */}
                            <MobileMenu links={links} />
                        </div>
                    </div>
                </div>
            </div>
            {warning && !HiddenWarning && <div id="globalWarningWrapper" className="absolute inset-x-0 w-full text-brand-500 bg-yellow-500 transition-all z-10 h-10">
                <div id="globalWarningContent" className="container flex items-center justify-between px-6 py-1 mx-auto">
                    <div className="flex">
                        <ExclamationTriangleIcon className="w-6 h-6" />

                        <p className="mx-3">{warning}</p>
                    </div>

                    <button onClick={hideWarning} className="p-1 transition-colors duration-300 transform rounded-md hover:bg-opacity-25 hover:bg-gray-600 focus:outline-none">
                        <XMarkIcon className="w-6 h-6" />
                    </button>
                </div>
            </div>}
        </div>
    );
};

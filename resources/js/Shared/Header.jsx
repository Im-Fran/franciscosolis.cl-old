import React from 'react'
import { Link, usePage } from '@inertiajs/inertia-react'
import AnimatedLink from '@/Components/AnimatedLink';
import LogoWhite from '$/LogoWhite.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function Header() {
    const { auth } = usePage().props

    const guestLinks = (
        <div className="flex flex-row justify-between items-center gap-5">
            <AnimatedLink href={route('login')} className="text-white text-xl font-bold md:text-2xl flex items-center"><FontAwesomeIcon icon="fa-user"/> Log In</AnimatedLink>
            <AnimatedLink href={route('register')} className="text-white text-xl font-bold md:text-2xl flex items-center"><FontAwesomeIcon icon="fa-user-edit"/> Register</AnimatedLink>
        </div>
    );
    const authenticatedLinks = (
        <div className="flex flex-row justify-between items-center gap-5">
            <AnimatedLink href={route('login')} className="text-white text-xl font-bold md:text-2xl flex items-center"><FontAwesomeIcon icon="fa-user"/> Account</AnimatedLink>
        </div>
    )

    return (
        <div className="bg-brand-100 shadow text-white">
            <div className="mx-auto px-6 py-3">
                <div className="md:flex md:items-center md:justify-between">
                    <div className="flex justify-between items-center w-full">
                        <div className="flex flex-row justify-between items-center">
                            <img src={LogoWhite} alt="FranciscoSolis" className="h-8 w-8"/>
                            <Link href={route('home')} className="text-white text-xl font-bold md:text-2xl flex items-center">&nbsp;FranciscoSolis</Link>
                        </div>
                        <div className="flex flex-row justify-between items-center gap-5">
                            <AnimatedLink href={route('home')} className="text-white text-xl font-bold md:text-2xl flex items-center"><FontAwesomeIcon icon="fa-home"/> Home</AnimatedLink>
                        </div>
                        {auth.user ? authenticatedLinks : guestLinks}
                    </div>
                </div>
            </div>
        </div>
    );
}

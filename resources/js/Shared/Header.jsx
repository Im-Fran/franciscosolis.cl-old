import React from 'react'
import { Link } from '@inertiajs/inertia-react'
import AnimatedLink from '@/Components/AnimatedLink';
import LogoWhite from '$/LogoWhite.png'

export default function Header(props) {
    return (
        <div className="bg-brand-100 shadow text-white">
            <div className="mx-auto px-6 py-3">
                <div className="md:flex md:items-center md:justify-between">
                    <div className="flex justify-between items-center w-full">
                        <div className="flex flex-row justify-between items-center">
                            <img src={LogoWhite} alt="FranciscoSolis" className="h-8 w-8"/>
                            <Link href={route('home')} className="text-white text-xl font-bold md:text-2xl flex items-center">&nbsp;FranciscoSolis</Link>
                        </div>
                        <div className="flex flex-row justify-between items-center">
                            <AnimatedLink href={route('home')} className="text-white text-xl font-bold md:text-2xl flex items-center">&nbsp;Home</AnimatedLink>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

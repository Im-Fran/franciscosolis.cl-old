import React from 'react'
import { Link } from '@inertiajs/inertia-react'

export default function Header(props) {
    return (
        <div className="bg-brand-100 shadow text-white">
            <div className="mx-auto px-6 py-3">
                <div className="md:flex md:items-center md:justify-between">
                    <div className="flex justify-between items-center">
                        <div className="text-xl font-semibold">
                            <img alt="Logo" src="@/images/Logo.png"/>
                            <Link href={route('home')} className="text-white text-xl font-bold md:text-2xl flex items-center">&nbsp;FranciscoSolis</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
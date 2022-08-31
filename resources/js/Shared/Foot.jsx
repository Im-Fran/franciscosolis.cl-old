import React from 'react'
import { Link } from '@inertiajs/inertia-react'
import AnimatedLink from "@/Components/AnimatedLink";

export default function Foot(props) {
    return (
        <div className="bg-brand-100 shadow text-white">
            <div className="mx-auto px-6 py-3">
                <div className="md:grid md:gap-6 md:grid-cols-6">
                    <div className="md:col-span-2 flex flex-col justify-start items-start">
                        <Link href={route('home')} className="text-white text-xl font-bold md:text-2xl">FranciscoSolis</Link>
                        <span>Quality & Free apps for everyone!</span>
                    </div>
                    <div className="md:col-span-1 md:col-start-4 flex flex-col justify-start items-start">
                        <h1 className="text-white text-xl font-bold md:text-2xl">Legal</h1>
                        <ul className="list-disc list-inside">
                            <li><AnimatedLink href="#" className="">Terms of Service</AnimatedLink></li>
                            <li><AnimatedLink href="#" className="">Privacy Policy</AnimatedLink></li>
                        </ul>
                    </div>
                    <div className="md:col-span-1flex flex-col justify-start items-start">
                        <h1 className="text-white text-xl font-bold md:text-2xl">Community</h1>
                        <ul className="list-disc list-inside">
                            <li><AnimatedLink href="#" className="">Forum</AnimatedLink></li>
                            <li><AnimatedLink href="#" className="">Discord</AnimatedLink></li>
                        </ul>
                    </div>
                    <div className="md:col-span-1 flex flex-col justify-start items-start">
                        <h1 className="text-white text-xl font-bold md:text-2xl">Support</h1>
                        <ul className="list-disc list-inside">
                            <li><AnimatedLink href="#" className="">Discord</AnimatedLink></li>
                            <li><AnimatedLink href="mailto:fran@franciscosolis.cl" className="">Email</AnimatedLink></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
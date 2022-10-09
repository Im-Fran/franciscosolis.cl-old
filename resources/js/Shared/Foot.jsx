import {Link} from '@inertiajs/inertia-react'
import AnimatedLink from "@/js/Components/AnimatedLink";
import ThemeSwitch from '@/js/Components/ThemeSwitch';
import {useEffect} from "react";
import {handleError} from "@/js/Utils/Utils";

export default function Foot(props) {
    useEffect(() => {
        const interval = setInterval(() => {
            axios.get(route('activity-status.set')).catch(err => {
                handleError(err, 'Failed to set activity status! Please reload the page.<br>If the problem persists, please contact us.');
            })
        }, 60000);
        return () => clearInterval(interval);
    })
    return (
        <div className="transition transform-all duration-200 bg-brand-100 dark:bg-[#353535] shadow text-white">
            <div className="mx-auto px-6 py-3">
                <div className="md:grid md:gap-6 md:grid-cols-6">
                    <div className="md:col-span-2 flex flex-col justify-start items-start">
                        <div><ThemeSwitch/></div>
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

import { useState } from 'react';
import { Link } from '@inertiajs/inertia-react';

import ColoredBlack from '$/Colored-Black.svg';
import ColoredWhite from '$/Colored-White.svg';

import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import Foot from '@/js/Shared/Foot';

export default function Error({ errors, exception, data }){

    console.log(data, exception, errors);

    const [dark] = useState((localStorage.getItem('theme') === 'dark'));

    return (
        <div className={dark ? 'dark' : ''}>
            <div className="transition transform-all duration-200 bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
                <div className="container mx-auto min-h-screen flex items-center justify-center">
                    <div className="flex flex-col items-center text-center">
                        <img src={dark ? ColoredWhite : ColoredBlack} alt="Banner" className="max-w-md" theme-light={ColoredBlack} theme-dark={ColoredWhite} themed-image="true"/>
                        <h1 className="text-brand-100 font-bold text-8xl">O.o</h1>
                        <h1 className="text-brand-100 text-2xl mt-10">Error { data.code }</h1>
                        <span className="text-md text-brand-500 dark:text-brand-600 mt-2">{ data.message }</span>
                        <span className="text-brand-500 dark:text-brand-600 mb-5">If you think this error is unexpected please try again later, or join <a href="https://go.theprogramsrc.xyz/discord" target="_blank" className="text-brand-100">our discord</a> and create a ticket.</span>
                        <Link className="p-2 bg-brand-100 rounded-full text-white flex items-center" href={route('home')}><ArrowLeftIcon className="w-6 h-6"/>&nbsp;Go Home</Link>
                        <span className="mt-20 text-brand-500 dark:text-brand-600">Host: { data.host } - Time: { data.timestamp }</span>
                    </div>
                </div>
                <Foot/>
            </div>
        </div>
    );
}

import {router} from '@inertiajs/react';

import ColoredBlack from '$/Colored-Black.svg';
import ColoredWhite from '$/Colored-White.svg';

import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import App from '@/js/Layouts/App';

export default function Error({ errors, exception, data }){

    console.log(data, exception, errors);

    const meta = [
        { property: 'og:title', content: `Error ${data.code}` },
        { property: 'og:description', content: data.message },
    ]

    const hasPrevousPage = () => {
        return window.history.length > 1;
    }

    const visit = () => {
        if(hasPrevousPage()) {
            window.history.back();
        } else {
            router.visit(route('home'));
        }
    }

    return (
        <App title={`Error ${data.code}`} meta={meta} horizontal="center" vertical="center">
            <div className="flex flex-col items-center text-center">
                <img src={ColoredBlack} alt="FranciscoSolis" className="max-w-md" theme-light={ColoredBlack} theme-dark={ColoredWhite} themed-image="true"/>
                <h1 className="text-brand-100 font-bold text-8xl">O.o</h1>
                <h1 className="text-brand-100 text-2xl mt-10">Error {data.code}</h1>
                <span className="text-md text-brand-500 dark:text-brand-600 mt-2">{data.message}</span>
                <span className="text-brand-500 dark:text-brand-600 mb-5">If you think this error is unexpected please try again later, or join <a href="https://go.theprogramsrc.xyz/discord" target="_blank" className="text-brand-100">our discord</a> and create a ticket.</span>
                <div className="p-2 bg-brand-100 rounded-full text-white flex items-center cursor-pointer" onClick={visit}><ArrowLeftIcon className="w-6 h-6" />&nbsp;{hasPrevousPage() ? 'Go Back' : 'Go Home'}</div>
                <span className="mt-20 text-brand-500 dark:text-brand-600">Host: {data.host} - Time: {data.timestamp}</span>
            </div>

        </App>
    );
}

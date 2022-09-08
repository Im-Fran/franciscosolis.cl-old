import { useState, useEffect } from 'react';
import { Head, usePage } from '@inertiajs/inertia-react';

import Header from '@/Shared/Header';
import Foot from '@/Shared/Foot';
import toast, { Toaster } from 'react-hot-toast';

export default function App({ children, title, vertical = "top", horizontal = "left"}){
    const { utils, flash } = usePage().props;
    useEffect(() => {
        flash.forEach(item => {
            if(typeof toast[item.type] === 'function') {
                toast[item.type](item.message)
            } else {
                toast(item.message, {
                    duration: 5000,
                })
            }
        })
    }, [flash]);

    const warning = utils ? utils.global_warning : null;
    const [HiddenWarning, setHiddenWarning] = useState((localStorage.getItem('HiddenWarning') || null) === warning);
    const hideWarning = (event) => {
        event.preventDefault();
        localStorage.setItem('HiddenWarning', warning);
        setHiddenWarning(true);
    }


    return (
        <div className={(localStorage.getItem('theme') === 'dark') ? 'dark' : ''}>
            <Head title={title}/>
            <div className="transition transform-all duration-200 bg-white dark:bg-[#212121] text-gray-900 dark:text-white">
                <Header/>
                {warning && !HiddenWarning && <div className="w-full text-brand-500 bg-yellow-500">
                    <div className="container flex items-center justify-between px-6 py-1 mx-auto">
                        <div className="flex">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                            </svg>

                            <p className="mx-3">{warning}</p>
                        </div>

                        <button onClick={hideWarning} className="p-1 transition-colors duration-300 transform rounded-md hover:bg-opacity-25 hover:bg-gray-600 focus:outline-none">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>}
                <Toaster position="top-right" reverseOrder/>
                <div className={"container mx-auto my-10 min-h-screen flex " + (vertical === "center" ? "items-center" : (vertical === "bottom" ? "items-end" : "items-start")) + " " + (horizontal === "center" ? "justify-center" : (horizontal === "right" ? "justify-end" : "justify-start"))}>
                    {children}
                </div>
                <Foot/>
            </div>
        </div>
    );
}

import React from 'react'
import Header from '@/Shared/Header';
import Foot from '@/Shared/Foot';
import { Head } from '@inertiajs/inertia-react';

export default function App({ children, title, vertical = "top", horizontal = "left"}){
    const verticalClass = vertical === "center" ? "items-center" : (vertical === "bottom" ? "items-end" : "items-start");
    const horizontalClass = horizontal === "center" ? "justify-center" : (horizontal === "right" ? "justify-end" : "justify-start")

    return (
        <div className={(localStorage.getItem('theme') || 'dark') === 'dark' ? 'dark' : ''}>
            <Head title={title}/>
            <div className="transition transform-all duration-200 bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
                <Header/>
                <div className={"container mx-auto my-10 min-h-screen flex " + verticalClass + " " + horizontalClass}>
                    {children}
                </div>
                <Foot/>
            </div>
        </div>
    );
}

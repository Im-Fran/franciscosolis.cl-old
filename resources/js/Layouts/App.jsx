import React from 'react'
import Header from '@/Shared/Header';
import Foot from '@/Shared/Foot';
import { Head } from '@inertiajs/inertia-react';

export default function App({ children, title }){
    return (
        <div className="dark">
            <Head title={title}/>
            <div className="transition transform-all duration-200 bg-white dark:bg-brand-500 text-gray-900 dark:text-white">
                <Header/>
                <div className="container mx-auto my-10 min-h-screen">
                    {children}
                </div>
                <Foot/>
            </div>
        </div>
    );
}
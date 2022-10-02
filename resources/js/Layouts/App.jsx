import { useEffect } from 'react';
import { Head, usePage } from '@inertiajs/inertia-react';
import toast, { Toaster } from 'react-hot-toast';

import Header from '@/js/Shared/Header';
import Foot from '@/js/Shared/Foot';

export default function App({ children, title, meta = [], vertical = "top", horizontal = "left"}){
    const { flash } = usePage().props;
    useEffect(() => {
        flash.forEach(item => {
            if(typeof toast[item.type] === 'function') {
                toast[item.type](item.message, {
                    duration: 5000,
                })
            } else {
                toast(item.message, {
                    duration: 5000,
                })
            }
        })
    }, [flash]);

    const metaItems = meta.map((item, index) => {
        return <meta key={`meta-${index}`} head-key={`meta-${index}`} {...item} />
    })

    return (
        <div className={(localStorage.getItem('theme') === 'dark') ? 'dark' : ''}>
            <Head>
                <title>{title}</title>
            </Head>
            <div className="transition transform-all duration-200 bg-white dark:bg-[#212121] text-gray-900 dark:text-white">
                <Header className=""/>
                <Toaster position="top-right" reverseOrder/>
                <div className={"container mx-auto my-10 min-h-screen flex " + (vertical === "center" ? "items-center" : (vertical === "bottom" ? "items-end" : "items-start")) + " " + (horizontal === "center" ? "justify-center" : (horizontal === "right" ? "justify-end" : "justify-start"))}>
                    {children}
                </div>
                <Foot/>
            </div>
        </div>
    );
}

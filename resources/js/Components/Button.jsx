import {usePage} from "@inertiajs/react";

export default function Button({ type = 'submit', color = 100, className = '', processing, children, onClick, can = null }) {
    const buttonClasses = (color === 200 ? (' bg-brand-200 hover:border-brand-200 hover:text-brand-200 ') : (color === 300 ? (' bg-brand-300 hover:border-brand-300 hover:text-brand-300 ') : (color === 400 ? (' bg-brand-400 hover:border-brand-400 hover:text-brand-400 ') : (color === 500 ? (' bg-brand-500 hover:border-brand-500 hover:text-brand-500') : (color === 600 ? 'bg-stone-600 hover:border-stone-600 hover:text-stone-600' : ('bg-brand-100 hover:border-brand-100 hover:text-brand-100 '))))));
    if(can != null) {
        const { auth } = usePage().props
        if(!auth.can[can]) return (<></>);
    }
    return (
        <button
            type={type}
            className={
                `inline-flex items-center justify-center px-4 py-1 hover:bg-transparent border border-transparent rounded-md font-bold text-xs text-white uppercase tracking-widest transition ease-in-out duration-200 ${
                    processing && ' opacity-25 '
                } ${buttonClasses} ${className}`
            }
            disabled={processing}
            onClick={onClick}
        >
            {children}
        </button>
    );
}

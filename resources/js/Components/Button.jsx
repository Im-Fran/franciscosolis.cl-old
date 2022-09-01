import React from 'react';

export default function Button({ type = 'submit', className = '', processing, children }) {
    return (
        <button
            type={type}
            className={
                `inline-flex items-center px-4 py-2 bg-brand-100 hover:bg-transparent border border-transparent hover:border-brand-100 rounded-md font-bold text-xs text-white hover:text-brand-100 uppercase tracking-widest transition ease-in-out duration-200 ${
                    processing && 'opacity-25'
                } ` + className
            }
            disabled={processing}
        >
            {children}
        </button>
    );
}

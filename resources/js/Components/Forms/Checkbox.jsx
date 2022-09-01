import React from 'react';

export default function Checkbox({ name, value, label = 'None', handleChange}) {
    return (
        <div className="flex items-center justify-center w-full mb-12">
            <label className="flex items-center cursor-pointer">
                <div className="relative">
                    <input type="checkbox" name={name} value={value} onChange={(e) => handleChange(e)} className="sr-only"/>
                    <div className="block bg-white dark:bg-gray-600 border border-brand-500 w-16 h-8 rounded-full"></div>
                    <div className={"absolute left-1 top-1 w-6 h-6 rounded-full transition duration-300 bg-white shadow-xl border border-gray-300 " +  (value ? ' translate-x-[130%] bg-brand-100 border-none ' : '')}/>
                </div>
                <div className="ml-3 font-medium">
                    {label}
                </div>
            </label>
        </div>
    );
}

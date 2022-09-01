import React, { useState } from 'react';
import ThemeLight from '$/theme-light.png';
import ThemeDark from '$/theme-dark.png';

export default function ThemeSwitch({ props }) {
    const [dark, setDark] = useState((localStorage.getItem('theme') || 'dark') === 'dark')
    const toggle = (e) => {
        let newTheme = e.target.checked ? 'dark' : 'light';
        setDark(newTheme === 'dark')
        let el = document.getElementById('app').firstElementChild
        if(newTheme === 'dark') {
            if(!el.classList.contains('dark'))
                el.classList.add('dark')
        }else {
            el.classList.remove('dark')
        }
        localStorage.setItem('theme', newTheme)
    };


    return (
        <div className="flex items-center justify-center w-full mb-12">
            <label className="flex items-center cursor-pointer">
                <div className="relative">
                    <input type="checkbox" name="theme-switch" value={dark} onChange={toggle} className="sr-only"/>
                    <div className="block bg-white dark:bg-gray-600 w-16 h-8 rounded-full"/>
                    <div className={"absolute left-1 top-1 w-6 h-6 rounded-full transition duration-300 " +  (dark ? ' translate-x-[130%] ' : '')}>
                        <img src={dark ? ThemeDark : ThemeLight} alt="Theme Switch Icon"/>
                    </div>
                </div>
            </label>
        </div>
    );
}

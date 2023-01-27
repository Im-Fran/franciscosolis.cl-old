import { useState, useEffect } from 'react';

import ThemeLight from '$/theme-light.png';
import ThemeDark from '$/theme-dark.png';

export default function ThemeSwitch() {
    const [dark, setDark] = useState(localStorage.getItem('theme') === 'dark');

    const updateThemedImages = () => {
        document.querySelectorAll('img[themed-image]').forEach(it => {
            if (it.getAttribute('themed-image') !== 'false') {
                it.src = it.getAttribute(`theme-${dark ? 'dark' : 'light'}`)
            }
        })
    }

    const toggleDark = () => {
        let newTheme = !dark ? 'dark' : 'light';
        let el = document.getElementById('app').firstElementChild
        el.classList.remove('dark')
        if(newTheme === 'dark') {
            el.classList.add('dark')
        }
        localStorage.setItem('theme', newTheme)

        setDark(!dark);
    };

    useEffect(updateThemedImages, [dark])

    useEffect(() => {
        const event = (e) => {
            if(e.altKey && e.key === 'k') {
                toggleDark();
            }
        };
        document.addEventListener('keydown', event);

        return () => document.removeEventListener('keydown', event);
    });


    return (
        <div className="flex items-center justify-center w-full mb-12">
            <label className="flex items-center cursor-pointer">
                <div className="relative">
                    <input type="checkbox" name="theme-switch" value={dark} onChange={() => toggleDark()} className="sr-only" />
                    <div className="block bg-white dark:bg-[#202020] w-16 h-8 rounded-full" />
                    <div className={"absolute left-1 top-1 w-6 h-6 rounded-full transition duration-300 " + (dark ? ' translate-x-[130%] ' : '')}>
                        <img src={dark ? ThemeDark : ThemeLight} alt="Theme Switch Icon" />
                    </div>
                </div>
            </label>
        </div>
    );
}

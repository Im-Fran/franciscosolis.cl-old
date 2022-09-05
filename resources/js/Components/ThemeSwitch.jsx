import { useState, useEffect } from 'react';
import ThemeLight from '$/theme-light.png';
import ThemeDark from '$/theme-dark.png';

export default function ThemeSwitch() {
    const [dark, setDark] = useState(localStorage.getItem('theme') === 'dark');

    const toggleDark = () => {
        let newTheme = !dark ? 'dark' : 'light';
        let el = document.getElementById('app').firstElementChild
        el.classList.remove('dark')
        if(newTheme === 'dark') {
            el.classList.add('dark')
        }
        localStorage.setItem('theme', newTheme)

        document.querySelectorAll('img[themed-image="true"]').forEach(it => {
            it.src = newTheme === 'dark' ? it.getAttribute('theme-dark') : it.getAttribute('theme-light')
        })

        setDark(!dark);
    };


    return (
        <div className="flex items-center justify-center w-full mb-12">
            <label className="flex items-center cursor-pointer">
                <div className="relative">
                    <input type="checkbox" name="theme-switch" value={dark} onChange={toggleDark} className="sr-only"/>
                    <div className="block bg-white dark:bg-gray-600 w-16 h-8 rounded-full"/>
                    <div className={"absolute left-1 top-1 w-6 h-6 rounded-full transition duration-300 " +  (dark ? ' translate-x-[130%] ' : '')}>
                        <img src={dark ? ThemeDark : ThemeLight} alt="Theme Switch Icon"/>
                    </div>
                </div>
            </label>
        </div>
    );
}

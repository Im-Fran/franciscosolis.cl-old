import { router } from '@inertiajs/react'

export default function AccountDropdownItem({ children, icon, href = '#', method = 'get', data = {}, inertia = true, display, className }) {
    const visit = () => {
        if(href === '#') return;

        if(inertia) {
            return router.visit(href, {
                method,
                data
            });
        }

        if(href.startsWith('#')) {
            return document.getElementById(href.substring(1))?.scrollIntoView({ // Scroll into the given element
                behavior: 'smooth'
            });
        }

        if(href.startsWith('http')) {
            // Open in new tab
            return window.open(href, '_blank');
        }

        window.location.href = href;
    };

    return (
        <span onClick={() => visit()} className={className || "flex items-center p-3 text-sm text-gray-600 capitalize transition-colors duration-300 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#303030] dark:hover:text-white w-full cursor-pointer"}>
            {children || <>
                {icon || <></>}
                {icon && <>&nbsp;</>}
                <span className="mx-1">{ display }</span>
            </>}
        </span>
    );
}

import { Inertia } from '@inertiajs/inertia';

export default function AccountDropdownItem({ children, icon, href = '#', method = 'GET', data = {}, inertia = true, display, className }) {
    const visit = () => {
        if(href == '#') return;

        if(inertia) {
            Inertia.visit(href, { method, data });
        } else if(href.startsWith('#')) {
            // Get the element
            const element = document.getElementById(href.substring(1));
            // Scroll to the element
            if(element){
                element.scrollIntoView({ behavior: 'smooth' });
            }
        } else if(href.startsWith('http')) {
            // Open in new tab
            window.open(href, '_blank');
        } else {
            window.location.href = href;
        }
    };

    return (
        <span href={href} onClick={() => visit()} className={className || "flex items-center p-3 text-sm text-gray-600 capitalize transition-colors duration-300 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#303030] dark:hover:text-white w-full cursor-pointer"}>
            {children || <>
                {icon || <></>}
                {icon && <>&nbsp;</>}
                <span className="mx-1">{ display }</span>
            </>}
        </span>
    );
}

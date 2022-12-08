import { useRef } from 'react';
import { Inertia } from "@inertiajs/inertia";

export default function SidebarLink ({ title, icon, href, activeRoute, disabled = false, beta = false, soon = false }){
    const ref = useRef(null);
    const currentRoute = route().current();
    const active = typeof activeRoute === 'string' ? activeRoute === currentRoute : (!!((activeRoute || []).find(it => it === currentRoute)));
    const click = (e) => {
        e.preventDefault();
        if(href && !active) {
            if(href.startsWith('#')) {
                const element = document.getElementById(href.replace('#', ''));
                if(element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                }
            } else {
                document.querySelectorAll('.sidebar-link.active')[0].classList.remove('active', 'border-l', 'border-brand-500', 'dark:border-brand-600', 'pl-1');
                Inertia.visit(href);
                ref.current.classList.add('active', 'border-l', 'border-brand-500', 'dark:border-brand-600', 'pl-1');
            }
        }
    }
    return (
        <div ref={ref} className={"sidebar-link mb-1 transition-all duration-150 text-md w-full flex gap-2 " + (active ? 'active border-l border-brand-500 dark:border-brand-600 pl-1' : (disabled ? 'opacity-50' : 'opacity-50 hover:opacity-100'))}>
            {icon || <></>}
            <span id={"sidebar-" + href} className={"text-black dark:text-white " + (active || disabled ? 'cursor-not-allowed' : 'cursor-pointer')} onClick={click}>
                {title}
            </span>
            { beta && <span className="text-xs bg-orange-500 px-2 py-1 rounded-full">
                BETA
            </span>}
            { soon && <span className="text-xs bg-red-500 px-2 py-1 rounded-full">
                SOON
            </span>}
        </div>
    );
}

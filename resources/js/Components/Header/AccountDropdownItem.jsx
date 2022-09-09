import { Link } from '@inertiajs/inertia-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function AccountDropdownItem({ children, icon, href = '#', method = 'GET', display, className }) {
    return (
        <Link href={href} method={method} as="button" className={className || "flex items-center p-3 text-sm text-gray-600 capitalize transition-colors duration-300 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#303030] dark:hover:text-white w-full"}>
            {children || <>
                {icon && <FontAwesomeIcon icon={icon} />}

                <span className="mx-1">{ display }</span>
            </>}
        </Link>
    );
}

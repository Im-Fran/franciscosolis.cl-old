import {Link} from "@inertiajs/inertia-react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export default function SidebarLink ({ title, icon, href }){
    return (
        <li className="opacity-80 hover:opacity-100 transition-all duration-300 text-md"><Link href={href} className="text-black dark:text-white">{icon && <FontAwesomeIcon icon={icon}/>}&nbsp;{title}</Link></li>
    );
}
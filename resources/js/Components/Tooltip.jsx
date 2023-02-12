import { TooltipWrapper } from "react-tooltip";
import {ExclamationTriangleIcon, ExclamationCircleIcon, InformationCircleIcon} from "@heroicons/react/24/outline";

export default function Tooltip ({ content, children = null, icon = null, size = 'h-5 w-5' }) {
    if (icon === 'info') {
        icon = <InformationCircleIcon className={size + ' text-blue-500'}/>
    } else if (icon === 'warning') {
        icon = <ExclamationTriangleIcon className={size + ' text-yellow-500'}/>
    } else if (icon === 'error') {
        icon = <ExclamationCircleIcon className={size + ' text-red-500'}/>
    }

    return (
        <TooltipWrapper
            place="top"
            delayShow={500}
            delayHide={100}
            html={content}
        >
            {children || icon}
        </TooltipWrapper>
    );
}
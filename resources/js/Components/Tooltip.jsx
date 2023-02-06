import { TooltipWrapper } from "react-tooltip";
import {ExclamationTriangleIcon, ExclamationCircleIcon, InformationCircleIcon} from "@heroicons/react/24/outline";

export default function Tooltip ({ content, children = null, icon = null, size = 'h-5 w-5' }) {

    if(children != null && icon == null) {
        return (
            <TooltipWrapper content={content}>
                {children}
            </TooltipWrapper>
        )
    } else if(children != null && icon != null) {
        return (
            <div className="flex">
                {children}
                &nbsp;
                <TooltipWrapper content={content}>
                    {icon === 'info' && <InformationCircleIcon className={"fill-brand-100 " + size}/>}
                    {icon === 'warn' && <ExclamationTriangleIcon className={"fill-orange-500 " + size}/>}
                    {icon === 'danger' && <ExclamationCircleIcon className={"fill-red-500 " + size}/>}
                    {typeof icon !== 'string' && icon}
                </TooltipWrapper>
            </div>
        )
    } else {
        return (
            <TooltipWrapper content={content}>
                {icon === 'info' && <InformationCircleIcon className={"fill-brand-100 " + size}/>}
                {icon === 'warn' && <ExclamationTriangleIcon className={"fill-orange-500 " + size}/>}
                {icon === 'danger' && <ExclamationCircleIcon className={"fill-red-500 " + size}/>}
                {typeof icon !== 'string' && icon}
            </TooltipWrapper>
        )
    }
}
import { FingerPrintIcon } from '@heroicons/react/24/outline';

export default function LoginNotification({ notification, short = false }) {
    const display  = short ?
        <span className="ml-2">2FA Disabled</span> :
        <span className="ml-2">2FA Security has been disabled</span>
    return (
        <div className="flex text-sm">
            <FingerPrintIcon className="w-6 h-6" height={24} width={24}/>
            {display}
        </div>
    );
}

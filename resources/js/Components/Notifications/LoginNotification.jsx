import { ComputerDesktopIcon } from '@heroicons/react/24/outline';

export default function LoginNotification({ notification, short = false }) {
    const data = notification.data
    const display  = short ?
        <span className="ml-2">New Login from <b>{data.location}</b></span> :
        <span className="ml-2">New login from IP <b>{data.ip}</b>. Location: <b>{ data.location }</b>. Device: <b>{ data.device }</b></span>
    return (
        <div className="flex text-sm">
            <ComputerDesktopIcon className="w-6 h-6" height={24} width={24}/>
            {display}
        </div>
    );
}

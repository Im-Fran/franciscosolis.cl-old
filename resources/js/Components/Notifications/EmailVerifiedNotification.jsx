import { EnvelopeIcon } from '@heroicons/react/24/outline';

export default function LoginNotification({}) {
    return (
        <div className="flex text-sm">
            <EnvelopeIcon className="w-6 h-6"  height={24} width={24}/>
            <span className="ml-2">Your email has been verified!</span>
        </div>
    );
}

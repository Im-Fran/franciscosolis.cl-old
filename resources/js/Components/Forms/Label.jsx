import {InformationCircleIcon} from '@heroicons/react/24/outline';

export default function Label({ forInput, value, className = '', info = null, children = (<></>) }) {
    return (
        <label htmlFor={forInput} className={`flex flex-row items-center font-medium text-md ` + className}>
            {value ? value : children}
            {info ? <>&nbsp;<InformationCircleIcon data-tip={info} className="h-4 w-4"/></> : <></>}
        </label>
    );
}

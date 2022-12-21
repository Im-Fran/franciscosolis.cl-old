import {InformationCircleIcon, EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';

export default function Label({ forInput, value, className = '', info = null, isVisible = false, toggleVisibility = null, children = (<></>) }) {

    return (
        <label htmlFor={forInput} className={`flex flex-row items-center font-medium text-md ` + className}>
            {value ? value : children}
            {toggleVisibility != null && <>&nbsp;{isVisible ? <EyeIcon className="h-4 w-4 cursor-pointer" onClick={() => toggleVisibility()}/> : <EyeSlashIcon className="h-4 w-4 cursor-pointer" onClick={() => toggleVisibility()}/>}</>}
            {info ? <>&nbsp;<InformationCircleIcon data-tip={info} className="h-4 w-4"/></> : <></>}
        </label>
    );
}

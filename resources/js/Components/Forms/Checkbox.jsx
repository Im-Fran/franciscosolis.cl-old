import Tooltip from "@/js/Components/Tooltip";

export default function Checkbox({ name, value, label = 'None', handleChange, center = true, info = null }) {
    return (
        <div className={" mb-12 " + (center ? 'flex items-center justify-center w-full' : '')}>
            <label className="flex items-center cursor-pointer">
                <div className="relative">
                    <input type="checkbox" name={name} value={value} onChange={(e) => handleChange(e)} className="sr-only"/>
                    <div className="block bg-white dark:bg-[#202020] border border-brand-500 w-16 h-8 rounded-full"></div>
                    <div className={"absolute left-1 top-1 w-6 h-6 rounded-full transition duration-300 bg-white shadow-xl border border-gray-300 " +  (value ? ' translate-x-[130%] bg-brand-100 border-none ' : '')}/>
                </div>
                <div className="flex items-center justify-center gap-2 ml-3 font-medium">
                    {label}
                    {info ? <>&nbsp;<Tooltip content={info} icon="info"/></> : <></>}
                </div>
            </label>
        </div>
    );
}

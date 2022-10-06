export default function SidebarTitle ({ title, icon }){
    return (
        <div className="flex flex-col items-start justify-start">
            <span className="text-lg uppercase flex">{icon || <></>}{icon && <>&nbsp;</>}{title}</span>
            <hr className="border-brand-500 dark:border-brand-600 w-2/3 mb-5"/>
        </div>
    );
}

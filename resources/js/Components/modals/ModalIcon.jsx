export default function ModalIcon({ color = 'bg-red-100', icon = null }) {
    return (
        <div className={`mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full ${color} sm:mx-0 sm:h-10 sm:w-10`}>
            {icon}
        </div>
    );
}

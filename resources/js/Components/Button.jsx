export default function Button({ type = 'submit', color = 100, className = '', processing, children, onClick }) {
    const buttonClasses = (color === 200 ? (' bg-brand-200 hover:border-brand-200 hover:text-brand-200 ') : (color === 300 ? (' bg-brand-300 hover:border-brand-300 hover:text-brand-300 ') : (color === 400 ? (' bg-brand-400 hover:border-brand-400 hover:text-brand-400 ') : (color === 500 ? (' bg-brand-500 hover:border-brand-500 hover:text-brand-500 ') : (' bg-brand-100 hover:border-brand-100 hover:text-brand-100 ')))));
    return (
        <button
            type={type}
            className={
                `inline-flex items-center px-4 py-2 hover:bg-transparent border border-transparent rounded-md font-bold text-xs text-white uppercase tracking-widest transition ease-in-out duration-200 ${
                    processing && ' opacity-25 '
                } ${buttonClasses} ${className}`
            }
            disabled={processing}
            onClick={onClick}
        >
            {children}
        </button>
    );
}

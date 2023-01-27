import { useEffect, useRef } from 'react';

export default function Input({ type = 'text', name, value, className, autoComplete, required, isFocused = false, handleChange, handleBlur, handleClick, placeholder, pattern, readOnly }) {
    const input = useRef(null);

    useEffect(() => {
        if (isFocused) {
            input.current.focus();
        }
    }, [input, isFocused]);

    return (
        <div className="flex flex-col items-start">
            <input
                type={type || 'text'}
                name={name}
                value={value || ''}
                className={
                    `focus:border-brand-100 focus:ring focus:ring-brand-100 rounded-md shadow-sm border border-brand-500 dark:bg-[#202020] text-brand-500 dark:text-white placeholder-gray-400 ` +
                    (className || '')
                }
                ref={input}
                autoComplete={autoComplete}
                required={required}
                onChange={(e) => handleChange(e)}
                placeholder={placeholder}
                pattern={pattern}
                onBlur={handleBlur}
                readOnly={readOnly}
                onClick={handleClick}
            />
        </div>
    );
}

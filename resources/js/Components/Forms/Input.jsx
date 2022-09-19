import React, { useEffect, useRef } from 'react';

export default function Input({
    type = 'text',
    name,
    value,
    className,
    autoComplete,
    required,
    isFocused,
    handleChange,
    handleBlur,
    placeholder,
    pattern,
}) {
    const input = useRef();

    useEffect(() => {
        if (isFocused) {
            input.current.focus();
        }
    }, []);

    return (
        <div className="flex flex-col items-start">
            <input
                type={type}
                name={name}
                value={value}
                className={
                    `focus:border-brand-100 focus:ring focus:ring-brand-100 rounded-md shadow-sm border border-brand-500 dark:bg-[#202020] text-brand-500 dark:text-white placeholder-gray-400 ` +
                    className
                }
                ref={input}
                autoComplete={autoComplete}
                required={required}
                onChange={(e) => handleChange(e)}
                placeholder={placeholder}
                pattern={pattern}
                onBlur={handleBlur}
            />
        </div>
    );
}

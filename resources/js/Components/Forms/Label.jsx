export default function Label({ forInput, value, className, children }) {
    return (
        <label htmlFor={forInput} className={`block font-medium text-md ` + className}>
            {value ? value : children}
        </label>
    );
}

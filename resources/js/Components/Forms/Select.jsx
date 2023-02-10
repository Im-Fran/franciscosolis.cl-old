import ReactSelect from 'react-select'
import AsyncReactSelect from 'react-select/async'
import {forwardRef} from "react";

const Select = forwardRef((props, ref) => {
    const classNames = {
        clearIndicator: () => 'text-brand-500 dark:text-white hover:cursor-pointer',
        container: () => 'shadow-sm border border-brand-500 dark:bg-[#202020] rounded-md',
        control: () => 'overflow-scroll max-h-10', // This is the box that holds around the input and label if any. No need because we use custom components.
        dropdownIndicator: () => 'text-brand-500 dark:text-white hover:cursor-pointer',
        group: () => 'mx-2',
        groupHeading: () => 'text-[#777] mt-2',
        indicatorsContainer: () => 'inset-y-0 max-h-10 sticky', // No need for customization. The box that holds the clear and dropdown indicators.
        indicatorSeparator: () => 'border-r border-brand-500 dark:border-brand-600 my-auto h-2/3',
        input: () => 'px-2 text-brand-500 dark:text-white',
        loadingIndicator: () => 'text-brand-100 dark:text-brand-300',
        loadingMessage: () => 'py-2 text-brand-500 dark:text-white',
        menu: () => '', // No idea what this is, but it seems to be the space between the input and the options.
        menuList: () => 'rounded-b-lg border border-brand-500 bg-white dark:bg-[#303030] mt-[2px]',
        menuPortal: () => '', // Not needed until we need it. (https://react-select.com/advanced#portaling)
        multiValue: () => 'bg-[#dedede] dark:bg-brand-500 text-brand-500 dark:text-white mx-2 rounded-md m-1',
        multiValueLabel: () => 'mx-2 text-brand-500 dark:text-white',
        multiValueRemove: () => 'text-red-500',
        noOptionsMessage: () => 'px-2 text-brand-500 dark:text-white',
        option: () => 'text-brand-500 dark:text-white px-2 py-1 dark:bg-[#303030] hover:bg-gray-200 dark:hover:bg-[#505050] dark:text-gray-200',
        placeholder: () => 'px-2 text-gray-400',
        singleValue: () => 'px-2 text-brand-500 dark:text-white',
        valueContainer: () => 'py-1',
    };

    return props.async ? (<AsyncReactSelect {...props} classNames={classNames} className="z-[99999]" ref={ref} unstyled/>) : (<ReactSelect className="z-[99999]" {...props} classNames={classNames} ref={ref} unstyled/>);
})

export default Select;
import { useRef, useState, useImperativeHandle, forwardRef } from "react";

import { Transition } from "react-transition-group";
import { XMarkIcon } from '@heroicons/react/24/outline'

const backgroundBackDropClass = {
    entering: "ease-out duration-300 opacity-0",
    entered: "ease-out duration-300 opacity-100",
    exiting: "ease-in duration-200 opacity-100",
    exited: "ease-in duration-200 opacity-0",
};

const modalPanelClass = {
    entering: "ease-out duration-300 opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95",
    entered: "ease-out duration-300 opacity-100 translate-y-0 sm:scale-100",
    exiting: "ease-in duration-200 opacity-100 translate-y-0 sm:scale-100",
    exited: "ease-in duration-200 opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95",
}

const Icon = () => null;
const Body = () => null;
const Footer = () => null;

let Modal = ({ children = null, title = null}) => {
    const ref = useRef(null);
    const nodeRef = useRef(null);
    const [show, setShow] = useState(false);
    const [hidden, setHidden] = useState(!show);

    const icon = children ? children.find(child => child.type === Icon) : null;
    const body = children ? children.find(child => child.type === Body) : null;
    const footer = children ? children.find(child => child.type === Footer) : null;

    const open = () => {
        setShow(true);
    }

    const close = () => {
        setShow(false);
    }

    useImperativeHandle(ref, () => ({ open, close }));

    return (
        <div ref={ref} className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <Transition nodeRef={nodeRef} in={show} timeout={1500} onEnter={() => setHidden(false)} onExited={() => setTimeout(() => setHidden(true), 500)}>
                {state => (
                    <div  hidden={hidden}>
                        <div className={"fixed inset-0 bg-gray-500 bg-opacity-75 dark:bg-opacity-50 transition-opacity " + backgroundBackDropClass[state]}></div>
                        <div className={"fixed inset-0 z-10 overflow-y-auto " + modalPanelClass[state]}>
                            <div className={"flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0"}>
                                <div className="relative transform overflow-hidden rounded-lg bg-white dark:bg-slate-800 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                                    <div className="absolute flex justify-end w-full text-black dark:text-white pr-2 pt-1">
                                        <XMarkIcon onClick={close} className="w-6 h-6 cursor-pointer"/>
                                    </div>
                                    <div className="bg-white dark:bg-slate-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                        <div className="sm:flex sm:items-start">
                                            {icon && icon.props.children || <></>}
                                            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                                {title && <div className="text-lg font-medium leading-6 text-gray-900 dark:text-gray-100">
                                                    {title}
                                                </div>}
                                                {body && <div className="mt-2">
                                                    <div className="text-sm text-gray-500 dark:text-gray-200">{body.props.children}</div>
                                                </div>}
                                                {children || <></>}
                                            </div>
                                        </div>
                                    </div>
                                    {footer && <div className="bg-gray-300 dark:bg-gray-900 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 gap-6">
                                        {footer.props.children}
                                    </div>}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </Transition>
        </div>
    )
}

Modal.Icon = Icon;
Modal.Body = Body;
Modal.Footer = Footer;

export default forwardRef(Modal);

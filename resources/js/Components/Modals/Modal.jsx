import React, { Component } from 'react';
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
};

const Icon = () => null;
const Body = () => null;
const Footer = () => null;

class Modal extends Component {

    static Icon = Icon;
    static Body = Body;
    static Footer = Footer;

    constructor(props) {
        super(props);

        this.nodeRef = React.createRef();

        this.state = {
            show: props.defaultShow,
            hidden: !props.defaultShow,
        };
    }

    componentDidMount() {
        document.addEventListener('keydown', this.escListener);
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.escListener);
    }

    escListener = (e) => {
        if (e.key === 'Escape') {
            this.close();
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.show !== prevState.show) {
            document.body.style.overflow = this.state.show ? 'hidden' : 'auto';
        }
    }

    open = () => {
        this.setState({ show: true });
        const { onModalOpen = () => {} } = this.props;
        onModalOpen()
    }

    close = () => {
        const { onModalClose = () => {} } = this.props

        this.setState({ show: false });
        setTimeout(() => {
            this.setState({ hidden: true });
            onModalClose()
        }, 500);
    }

    render() {
        const { children, title, onModalOpen = () => {}, onModalClose = () => {} } = this.props;
        const { show, hidden } = this.state;

        const icon = children?.find(child => child.type === Icon);
        const body = children?.find(child => child.type === Body);
        const footer = children?.find(child => child.type === Footer)

        return (
                <div ref={this.props.forwardedRef} className="relative z-[999]" aria-labelledby="modal-title" role="dialog" aria-modal="true">
                    <Transition nodeRef={this.nodeRef} in={show} timeout={1500} onEnter={() => {
                        this.setState({ hidden: false });
                        onModalOpen();
                    }} onExited={() => this.close()}>
                        {state => (
                            <div hidden={hidden}>
                                <div className={"fixed inset-0 bg-black bg-opacity-50 dark:bg-opacity-30 transition-opacity " + backgroundBackDropClass[state]}></div>
                                 <div className={"fixed inset-0 z-10 overflow-y-auto " + modalPanelClass[state]}>
                                    <div className={"flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0"}>
                                        <div className={"relative backdrop-blur-2xl border border-brand-500 transform rounded-lg text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg"}>
                                            <div className="absolute flex justify-end w-full text-black dark:text-white pr-2 pt-1">
                                                <XMarkIcon onClick={() => this.close()} className="w-6 h-6 cursor-pointer"/>
                                            </div>
                                            <div className="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                                <div className="sm:flex sm:items-start">
                                                    {icon && icon.props.children || <></>}
                                                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
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
                                            {footer && <div className="bg-gray-300 dark:bg-[#1C1C1C] px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 gap-6 rounded-b-lg">
                                                {footer.props.children}
                                            </div>}
                                        </div>
                                    </div>
                                 </div>
                            </div>
                        )}
                    </Transition>
                </div>
        );
    }
}

Modal.Icon = Icon;
Modal.Body = Body;
Modal.Footer = Footer;

export default Modal;

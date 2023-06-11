import {usePage} from "@inertiajs/react";
import {useRef} from "react";

import {QuestionMarkCircleIcon} from '@heroicons/react/24/outline'
import Modal from "@/js/Components/Modals/Modal";
import ModalIcon from "@/js/Components/Modals/ModalIcon";

class ButtonColor {
    static BRAND = {
        id: 100,
        name: 'brand',
        classes: 'bg-brand-100 hover:border-brand-100 hover:text-brand-100',
    };
    static RED = {
        id: 200,
        name: 'red',
        classes: 'bg-brand-200 hover:border-brand-200 hover:text-brand-200',
    };
    static AQUA = {
        id: 300,
        name: 'aqua',
        classes: 'bg-brand-300 hover:border-brand-300 hover:text-brand-300',
    };
    static GREEN = {
        id: 400,
        name: 'green',
        classes: 'bg-brand-400 hover:border-brand-400 hover:text-brand-400',
    };
    static DARK = {
        id: 500,
        name: 'dark',
        classes: 'bg-brand-500 hover:border-brand-500 hover:text-brand-500',
    };
    static GRAY = {
        id: 600,
        name: 'stone',
        classes: 'bg-stone-600 hover:border-stone-600 hover:text-stone-600',
    };
    static LIGHT_GRAY = {
        id: 700,
        name: 'light-gray',
        classes: 'bg-gray-100 hover:border-gray-100 hover:text-gray-100',
    };

    static get(id) {
        switch (id) {
            case 200:
                return ButtonColor.RED;
            case 300:
                return ButtonColor.AQUA;
            case 400:
                return ButtonColor.GREEN;
            case 500:
                return ButtonColor.DARK;
            case 600:
                return ButtonColor.GRAY;
            case 700:
                return ButtonColor.LIGHT_GRAY;
            default:
                return ButtonColor.BRAND;
        }
    }

    static getByName(name) {
        switch (name) {
            case 'red':
                return ButtonColor.RED;
            case 'aqua':
                return ButtonColor.AQUA;
            case 'green':
                return ButtonColor.GREEN;
            case 'dark':
                return ButtonColor.DARK;
            case 'stone':
                return ButtonColor.GRAY;
            case 'light-gray':
                return ButtonColor.LIGHT_GRAY;
            default:
                return ButtonColor.BRAND;
        }
    }
}

export default function Button({ type = 'submit', color = 100, className = '', processing, children, onClick = () => {}, can = null, confirmMessage = 'Are you sure you want to do this?', needsConfirmation = false }) {
    const colorId = typeof color === 'number' ? color : (typeof color === 'string' ? ButtonColor.getByName(color).id : (color?.id || 100))
    const buttonClasses = (colorId === 200 ? (' bg-brand-200 hover:border-brand-200 hover:text-brand-200 ') : (colorId === 300 ? (' bg-brand-300 hover:border-brand-300 hover:text-brand-300 ') : (colorId === 400 ? (' bg-brand-400 hover:border-brand-400 hover:text-brand-400 ') : (colorId === 500 ? (' bg-brand-500 hover:border-brand-500 hover:text-brand-500') : (colorId === 600 ? 'bg-stone-600 hover:border-stone-600 hover:text-stone-600' : ('bg-brand-100 hover:border-brand-100 hover:text-brand-100 '))))));

    if(can != null) {
        const { auth } = usePage().props
        if(!auth.can[can]) return (<></>);
    }

    const ModalRef = useRef(null)

    const button = (
        <button
            type={type}
            className={
                `inline-flex items-center justify-center px-4 py-1 hover:bg-transparent border border-transparent rounded-md font-bold text-xs text-white uppercase tracking-widest transition ease-in-out duration-200 ${
                    processing && ' opacity-25 '
                } ${buttonClasses} ${className}`
            }
            disabled={processing}
            onClick={() => needsConfirmation ? ModalRef.current?.open() : onClick()}
        >
            {children}
        </button>
    );

    if(!needsConfirmation) {
        return button;
    }

    return (
        <>
            <Modal title="Confirmation" ref={ModalRef}>
                <Modal.Icon>
                    <ModalIcon color="bg-blue-300 dark:bg-gray-600 text-white" icon={<QuestionMarkCircleIcon className="w-6 h-6"/>}/>
                </Modal.Icon>

                <Modal.Body>
                    {confirmMessage}
                </Modal.Body>

                <Modal.Footer>
                    <Button color={200} onClick={() => ModalRef.current?.close()}>Cancel</Button>
                    <Button color={400} onClick={() => {
                        ModalRef.current?.close();
                        onClick()
                    }}>Confirm</Button>
                </Modal.Footer>
            </Modal>
            {button}
        </>
    )
}

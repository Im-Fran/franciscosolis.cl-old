import {forwardRef, useImperativeHandle, useRef} from "react";
import {useForm} from "@inertiajs/react";
import {handleChange} from "@/js/Utils/Utils";

import Modal from "@/js/Components/Modals/Modal";
import ModalIcon from "@/js/Components/Modals/ModalIcon";
import InputError from "@/js/Components/Forms/InputError";
import Input from "@/js/Components/Forms/Input";
import Label from "@/js/Components/Forms/Label";
import {PencilIcon} from "@heroicons/react/24/outline";
import Button from "@/js/Components/Button";

const CreatePermissionModal = forwardRef((props, ref) => {
    const {data, setData, errors, processing, post} = useForm({
        title: '',
        name: '',
    })

    const ModalRef = useRef(null);

    const open = () => {
        ModalRef.current?.open();
    }

    const close = () => {
        ModalRef.current?.close();
    }

    const createPermission = () => {
        post(route('admin.abilities.store'), {
            onSuccess: () => {
                close();
            },
        })
    }

    useImperativeHandle(ref, () => ({open, close}));

    return (
        <Modal ref={ModalRef} title="Create New Permission">
            <Modal.Icon>
                <ModalIcon color="bg-blue-300 dark:bg-gray-600 text-white" icon={<PencilIcon className="w-6 h-6"/>}/>
            </Modal.Icon>

            <Modal.Body>
                <div className="mt-5">
                    <Label forInput="title" value="Display"/>

                    <Input
                        type="text"
                        name="title"
                        value={data.title}
                        placeholder="Admin Dashboard"
                        className="mt-1 block w-full"
                        isFocused={true}
                        handleChange={e => handleChange(setData, e)}
                    />

                    <InputError message={errors.title} className="mt-2"/>
                </div>

                <div className="mt-5">
                    <Label forInput="name" value="Permission"/>

                    <Input
                        type="text"
                        name="name"
                        value={data.name}
                        placeholder="admin.dashboard"
                        className="mt-1 block w-full"
                        handleChange={e => handleChange(setData, e)}
                    />

                    <InputError message={errors.name} className="mt-2"/>
                </div>
            </Modal.Body>

            <Modal.Footer>
                <Button color={400} onClick={createPermission} processing={processing}>Create</Button>
                <Button color={200} onClick={ModalRef.current?.close}>Cancel</Button>
            </Modal.Footer>
        </Modal>
    );
})

export default CreatePermissionModal;
import {forwardRef, useImperativeHandle, useRef} from "react";
import {handleChange} from "@/js/Utils/Utils";
import {useForm} from "@inertiajs/react";

import {PlusCircleIcon} from "@heroicons/react/24/outline";
import Modal from "@/js/Components/Modals/Modal";
import ModalIcon from "@/js/Components/Modals/ModalIcon";
import Button from "@/js/Components/Button";
import Label from "@/js/Components/Forms/Label";
import Input from "@/js/Components/Forms/Input";
import InputError from "@/js/Components/Forms/InputError";
import Select from "@/js/Components/Forms/Select";

const CreateAPIKeyModal = forwardRef(({ availableAbilities }, ref) => {
    const ModalRef = useRef(null);

    const open = () => {
        ModalRef.current?.open();
    }

    const close = () => {
        ModalRef.current?.close();
    }

    useImperativeHandle(ref, () => ({ open, close }))

    const {data, setData, errors, post, processing} = useForm(`CreateApiKey`, {
        label: '',
        permissions: [],
    })

    const submit = () => {

    }

    const options = (availableAbilities || []).map(it => ({
        label: it.title,
        value: it.name,
        it,
    }));

    console.log(options)

    return (
        <Modal title="Create API Key" ref={ModalRef}>
            <Modal.Icon>
                <ModalIcon color="bg-brand-300" icon={<PlusCircleIcon className="w-6 h-6"/>}/>
            </Modal.Icon>
            <Modal.Body>
                <div className="mt-5">
                    <Label forInput="label" value="Label"/>

                    <Input
                        type="text"
                        name="label"
                        value={data.label}
                        placeholder="Home Laptop"
                        className="mt-1 block w-full"
                        handleChange={e => handleChange(setData, e)}
                        isFocused
                    />

                    <InputError message={errors.label} className="mt-2"/>
                </div>

                <div className="mt-5">
                    <Label forInput="permissions" value="Permissions"/>

                    <Select
                        name="permissions"
                        options={options}
                        onChange={values => setData('permissions', values)}
                        isClearable
                        isMulti
                    />

                    <InputError message={errors.permissions} className="mt-2"/>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button color={400} onClick={submit} processing={processing}>Create</Button>
                <Button color={200} onClick={ModalRef.current?.close}>Cancel</Button>
            </Modal.Footer>
        </Modal>
    )
})

export default CreateAPIKeyModal;
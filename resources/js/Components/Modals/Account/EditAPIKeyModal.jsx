import {forwardRef, useImperativeHandle, useRef, useState} from "react";
import {copyToClipboard, handleChange, obfuscateText} from "@/js/Utils/Utils";
import {router, useForm} from "@inertiajs/react";

import toast from "react-hot-toast";
import {PlusCircleIcon} from "@heroicons/react/24/outline";
import Modal from "@/js/Components/Modals/Modal";
import ModalIcon from "@/js/Components/Modals/ModalIcon";
import Button from "@/js/Components/Button";
import Label from "@/js/Components/Forms/Label";
import Input from "@/js/Components/Forms/Input";
import InputError from "@/js/Components/Forms/InputError";
import Select from "@/js/Components/Forms/Select";

const EditAPIKeyModal = forwardRef(({ availableAbilities }, ref) => {
    const ModalRef = useRef(null);
    const [apiKey, setApiKey] = useState(null);

    const mapAbilities = (it) => ({
        label: it.title,
        value: it.name,
    });

    const options = (availableAbilities || []).map(mapAbilities);

    const {data, setData, errors, patch, transform, processing} = useForm({
        label: '',
        permissions: [],
    })

    const submit = () => {
        transform((form) => ({
            ...form,
            permissions: form.permissions.map((it) => it.value),
        }));

        patch(route('account.security.access.api-keys.update', { apiKey: apiKey?.label }), {
            preserveScroll: true,
            onSuccess: () => {
                toast.success('API Key successfully saved!');
                ModalRef.current?.close();
            },
        })
    }

    const regenerate = () => {
        router.patch(route('account.security.access.api-keys.regenerate', { apiKey: apiKey?.label }), {}, {
            onSuccess: () => {
                toast.success('Successfully regenerated API Key.');
                ModalRef.current?.close();
            },
        })
    }

    const open = (value) => {
        setApiKey(value);
        setData({
            label: value?.label,
            permissions: availableAbilities.filter(it => (value?.permissions || []).includes(it.name)).map(mapAbilities)
        })
        ModalRef.current?.open();
    }

    const close = () => {
        ModalRef.current?.close();
    }

    useImperativeHandle(ref, () => ({ open, close }))

    return (
        <Modal title={`Editing ${apiKey?.label}`} ref={ModalRef}>
            <Modal.Icon>
                <ModalIcon color="bg-brand-300" icon={<PlusCircleIcon className="w-6 h-6"/>}/>
            </Modal.Icon>
            <Modal.Body>
                <div className="mt-5">
                    <Label forInput="label" value="Label" info="(Optional) This text will be the label of the API Key. Might be useful to identify the key among other keys."/>

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
                        value={data.permissions}
                        onChange={values => setData('permissions', values)}
                        isClearable
                        isMulti
                    />

                    <InputError message={errors.permissions} className="mt-2"/>
                </div>

                <div className="mt-5">
                    <Label forInput="api_key" value="API Key"/>

                    <Input
                        name="api_key"
                        value={apiKey?.api_key?.substring(0, 7) + obfuscateText(apiKey?.api_key?.substring(7))}
                        handleFocus={() => copyToClipboard(apiKey?.api_key)}
                        readOnly
                    />
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button color={400} onClick={submit} processing={processing}>Save</Button>
                <Button color={100} onClick={regenerate}>Regenerate Key</Button>
                <Button color={200} onClick={ModalRef.current?.close}>Cancel</Button>
            </Modal.Footer>
        </Modal>
    )
})

export default EditAPIKeyModal;
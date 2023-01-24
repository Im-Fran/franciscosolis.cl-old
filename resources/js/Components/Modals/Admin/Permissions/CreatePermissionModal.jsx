import Modal from "@/js/Components/Modals/Modal";
import ModalIcon from "@/js/Components/Modals/ModalIcon";
import InputError from "@/js/Components/Forms/InputError";
import Input from "@/js/Components/Forms/Input";
import Label from "@/js/Components/Forms/Label";
import {PencilIcon} from "@heroicons/react/24/outline";
import {useForm} from "@inertiajs/react";
import Button from "@/js/Components/Button";

export default function CreatePermissionModal({ }) {

    const { data, handleChange, setData, errors, processing } = useForm({
        title: '',
        name: '',
    })

    return (
        <Modal title="Create New Permission">
                <Modal.Icon>
                    <ModalIcon color="bg-blue-300 dark:bg-gray-600 text-white" icon={<PencilIcon className="w-6 h-6"/>}/>
                </Modal.Icon>

                <Modal.Body>
                    <div className="mt-5">
                        <Label forInput="title" value="Display" />

                        <Input
                            type="text"
                            name="title"
                            value={data.title}
                            placeholder="Admin Dashboard"
                            className="mt-1 block w-full"
                            isFocused={true}
                            handleChange={e => handleChange(setData, e)}
                        />

                        <InputError message={errors.title} className="mt-2" />
                    </div>

                    <div className="mt-5">
                        <Label forInput="name" value="Permission" />

                        <Input
                            type="text"
                            name="name"
                            value={data.name}
                            placeholder="admin.dashboard"
                            className="mt-1 block w-full"
                            handleChange={e => handleChange(setData, e)}
                        />

                        <InputError message={errors.name} className="mt-2" />
                    </div>
                </Modal.Body>

                <Modal.Footer>
                    <Button color={400} onClick={() => {}} processing={processing}>Create</Button>
                    <Button color={200} onClick={() => {}}>Cancel</Button>
                </Modal.Footer>
            </Modal>
    )
}

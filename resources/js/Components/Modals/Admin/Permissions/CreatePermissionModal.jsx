import { useRef } from 'react'


export default function CreatePermissionModal({ }) {

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
                            value={createForm.data.title}
                            placeholder="Admin Dashboard"
                            className="mt-1 block w-full"
                            isFocused={true}
                            handleChange={e => handleChange(createForm.setData, e)}
                        />

                        <InputError message={createForm.errors.title} className="mt-2" />
                    </div>

                    <div className="mt-5">
                        <Label forInput="name" value="Permission" />

                        <Input
                            type="text"
                            name="name"
                            value={createForm.data.name}
                            placeholder="admin.dashboard"
                            className="mt-1 block w-full"
                            handleChange={e => handleChange(createForm.setData, e)}
                        />

                        <InputError message={createForm.errors.name} className="mt-2" />
                    </div>
                </Modal.Body>

                <Modal.Footer>
                    <Button color={400} onClick={createPermission} processing={createForm.processing}>Create</Button>
                    <Button color={200} onClick={toggleShow}>Cancel</Button>
                </Modal.Footer>
            </Modal>
    )
}

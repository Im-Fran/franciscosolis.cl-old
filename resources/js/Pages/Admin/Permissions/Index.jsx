import { useState } from "react";
import { Inertia } from "@inertiajs/inertia";
import { useForm } from "@inertiajs/inertia-react";
import { handleChange } from "@/js/Utils/Utils";

import { PencilIcon, PlusIcon } from '@heroicons/react/24/outline'
import Modal from "@/js/Components/modals/Modal";
import Pagination from "@/js/Components/Pagination";
import Column from "@/js/Components/Table/Column";
import Row from "@/js/Components/Table/Row";
import RowItem from "@/js/Components/Table/RowItem";
import Table from "@/js/Components/Table/Table";
import AdminLayout from "@/js/Layouts/AdminLayout";
import Button from "@/js/Components/Button";
import ModalIcon from "@/js/Components/modals/ModalIcon";
import Label from "@/js/Components/Forms/Label";
import Input from "@/js/Components/Forms/Input";
import InputError from "@/js/Components/Forms/InputError";

export default function Index({ permissions }) {
    const meta = [
        { property: 'og:title', content: 'Admin > Permissions | FranciscoSolis' },
    ]

    const [show, setShow] = useState(false);
    const toggleShow = () => setShow((prev) => !prev);

    const [showEdit, setShowEdit] = useState(false);
    const toggleShowEdit = () => setShowEdit((prev) => !prev);

    const createForm = useForm('CreatePermissions', {
        name: '',
        title: '',
    })

    const deletePermission = (e, permission) => {
        e.preventDefault();
        e.stopPropagation();

        if (confirm(`Are you sure you want to delete the permission "${permission.title} (${permission.name})"?`)) {
            Inertia.post(route('admin.abilities.delete', { ability: permission.name }), {
                _method: 'DELETE',
            })
        }
    }

    const createPermission = () => {
        createForm.post(route('admin.abilities.store'), {
            onFinish: () => {
                toggleShow();
                createForm.reset();
            }
        })
    }

    return (
        <AdminLayout title="Admin > Permissions" meta={meta}>
            <Modal title="Create New Permission" toggleShow={toggleShow} show={show}>
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

            <Table>
                <Table.Columns>
                    <Column>Id</Column>
                    <Column>Name</Column>
                    <Column>Title</Column>
                    <Column>Actions</Column>
                </Table.Columns>
                <Table.Rows>
                    {permissions.data.map(permission => (
                        <Row key={permission.id}>
                            <RowItem>#{permission.id}</RowItem>
                            <RowItem>{permission.name}</RowItem>
                            <RowItem>{permission.title}</RowItem>
                            <RowItem>
                                <Button color={200} onClick={e => deletePermission(e, permission)}>Delete</Button>
                            </RowItem>
                        </Row>
                    ))}
                </Table.Rows>
                <Table.Pagination position="center">
                    <Pagination data={permissions} queryField="query" searchDisplay={"Search Permissions"}>
                        <PlusIcon className="w-6 h-6 cursor-pointer" onClick={toggleShow}/>
                    </Pagination>
                </Table.Pagination>
            </Table>
        </AdminLayout>
    )
}

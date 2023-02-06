import {useRef} from "react";
import { router } from "@inertiajs/react";

import { PlusIcon } from '@heroicons/react/24/outline'
import Pagination from "@/js/Components/Pagination";
import Column from "@/js/Components/Table/Column";
import Row from "@/js/Components/Table/Row";
import RowItem from "@/js/Components/Table/RowItem";
import Table from "@/js/Components/Table/Table";
import AdminLayout from "@/js/Layouts/AdminLayout";
import Button from "@/js/Components/Button";
import CreatePermissionModal from "@/js/Components/Modals/Admin/Permissions/CreatePermissionModal";
import EditPermissionModal from "@/js/Components/Modals/Admin/Permissions/EditPermissionModal";

export default function Index({ permissions }) {
    const meta = [
        { property: 'og:title', content: 'Admin > Permissions | FranciscoSolis' },
    ]

    const CreatePermissionModalRef = useRef(null);
    const EditPermissionModalRef = useRef(null);

    const deletePermission = (e, permission) => {
        e.preventDefault();
        e.stopPropagation();

        if (confirm(`Are you sure you want to delete the permission "${permission.title} (${permission.name})"?`)) {
            router.post(route('admin.abilities.delete', { ability: permission.name }), {
                _method: 'DELETE',
            })
        }
    }

    return (
        <AdminLayout title="Admin > Permissions" meta={meta}>
            <CreatePermissionModal ref={CreatePermissionModalRef}/>
            <EditPermissionModal ref={EditPermissionModalRef} />
            <Table>
                <Table.Columns>
                    <Column>Id</Column>
                    <Column>Title</Column>
                    <Column>Name</Column>
                    <Column>Actions</Column>
                </Table.Columns>
                <Table.Rows>
                    {permissions.data.map(permission => (
                        <Row key={permission.id}>
                            <RowItem>#{permission.id}</RowItem>
                            <RowItem>{permission.title}</RowItem>
                            <RowItem>{permission.name}</RowItem>
                            <RowItem className="flex gap-5">
                                <Button color={600} onClick={() => EditPermissionModalRef.current?.open(permission)}>Edit</Button>
                                <Button color={200} onClick={e => deletePermission(e, permission)}>Delete</Button>
                            </RowItem>
                        </Row>
                    ))}
                </Table.Rows>
                <Table.Pagination position="center">
                    <Pagination data={permissions} queryField="search" searchDisplay={"Search Permissions"} only={['permissions']}>
                        <PlusIcon className="w-6 h-6 cursor-pointer" onClick={() => CreatePermissionModalRef.current?.open()}/>
                    </Pagination>
                </Table.Pagination>
            </Table>
        </AdminLayout>
    )
}

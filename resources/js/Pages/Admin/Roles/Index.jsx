import { router } from "@inertiajs/react";

import { PlusIcon } from '@heroicons/react/24/outline'
import Pagination from "@/js/Components/Pagination";
import Column from "@/js/Components/Table/Column";
import Row from "@/js/Components/Table/Row";
import RowItem from "@/js/Components/Table/RowItem";
import Table from "@/js/Components/Table/Table";
import AdminLayout from "@/js/Layouts/AdminLayout";
import Button from "@/js/Components/Button";

export default function Index({ roles }) {
    const meta = [
        { property: 'og:title', content: 'Admin > Roles | FranciscoSolis' },
    ]

    const deleteRole = (e, role) => {
        e.preventDefault();
        e.stopPropagation();

        if (confirm(`Are you sure you want to delete the role "${role.title} (${role.name})"?`)) {
            router.post(route('admin.roles.delete', { role: role.name }), {
                _method: 'DELETE',
            })
        }
    }

    return (
        <AdminLayout title="Admin > Roles" meta={meta}>
            <Table>
                <Table.Columns>
                    <Column>Id</Column>
                    <Column>Title</Column>
                    <Column>Name</Column>
                    <Column>Actions</Column>
                </Table.Columns>
                <Table.Rows>
                    {roles.data.map(role => (
                        <Row key={role.id}>
                            <RowItem>#{role.id}</RowItem>
                            <RowItem>{role.title}</RowItem>
                            <RowItem>{role.name}</RowItem>
                            <RowItem>
                                <Button color={200} onClick={e => deleteRole(e, role)}>Delete</Button>
                            </RowItem>
                        </Row>
                    ))}
                </Table.Rows>
                <Table.Pagination position="center">
                    <Pagination data={roles} queryField="query" searchDisplay={"Search Roles"}>
                        <PlusIcon className="w-6 h-6 cursor-pointer" onClick={toggleShow}/>
                    </Pagination>
                </Table.Pagination>
            </Table>
        </AdminLayout>
    )
}

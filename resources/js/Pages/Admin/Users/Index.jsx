import Pagination from "@/js/Components/Pagination";
import Column from "@/js/Components/Table/Column";
import Row from "@/js/Components/Table/Row";
import RowItem from "@/js/Components/Table/RowItem";
import Table from "@/js/Components/Table/Table";
import UserProfilePicture from "@/js/Components/UserProfilePicture";
import AdminLayout from "@/js/Layouts/AdminLayout";
import Button from "@/js/Components/Button";
import {CheckIcon, PencilSquareIcon, TrashIcon, XMarkIcon} from "@heroicons/react/24/outline";
import {router} from "@inertiajs/react";

export default function Index({ users }) {
    const meta = [
        { property: 'og:title', content: 'Admin > Users | FranciscoSolis' },
    ]
    return (
        <AdminLayout title="Admin > Users" meta={meta}>
            <Table>
                <Table.Columns>
                    <Column>Id</Column>
                    <Column>Name</Column>
                    <Column>Email</Column>
                    <Column>Verified</Column>
                    <Column>Actions</Column>
                </Table.Columns>
                <Table.Rows>
                    {users.data.map(user => (
                        <Row key={user.id}>
                            <RowItem>#{user.id}</RowItem>
                            <RowItem className="flex flex-row items-center gap-2">
                                <UserProfilePicture user={user}/>
                                <span>{user.name}</span>
                            </RowItem>
                            <RowItem>{user.email}</RowItem>
                            <RowItem>
                                {user.email_verified_at && <CheckIcon className="w-5 h-5 text-green-500"/>}
                                {!user.email_verified_at && <XMarkIcon className="w-5 h-5 text-red-500"/>}
                            </RowItem>
                            <RowItem className="flex gap-5">
                                {user.deleted_at == null && <Button color={600} onClick={() => router.visit(route('admin.users.edit', {user: user.slug}))}><PencilSquareIcon className="w-5 h-5"/>&nbsp;Edit</Button>}
                                {user.deleted_at == null && <Button color={200} onClick={() => router.visit(route('admin.users.delete', { user: user.slug}))} can="admin.users.delete"><TrashIcon className="w-5 h-5"/>&nbsp;Delete</Button>}
                            </RowItem>
                        </Row>
                    ))}
                </Table.Rows>
                <Table.Pagination position="center">
                    <Pagination data={users}/>
                </Table.Pagination>
            </Table>
        </AdminLayout>
    )
}

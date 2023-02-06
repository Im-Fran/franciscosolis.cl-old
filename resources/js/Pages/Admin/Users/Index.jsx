import Pagination from "@/js/Components/Pagination";
import Column from "@/js/Components/Table/Column";
import Row from "@/js/Components/Table/Row";
import RowItem from "@/js/Components/Table/RowItem";
import Table from "@/js/Components/Table/Table";
import UserProfilePicture from "@/js/Components/UserProfilePicture";
import AdminLayout from "@/js/Layouts/AdminLayout";
import Button from "@/js/Components/Button";
import {ArrowPathRoundedSquareIcon, CheckIcon, PencilSquareIcon, TrashIcon, XMarkIcon} from "@heroicons/react/24/outline";
import {router} from "@inertiajs/react";

export default function Index({ users }) {
    return (
        <AdminLayout title="Admin > Users">
            <Table>
                <Table.Columns>
                    <Column sort="id">Id</Column>
                    <Column sort="name">Name</Column>
                    <Column sort="email">Email</Column>
                    <Column sort="email_verified_at">Verified</Column>
                    <Column sort="deleted_at">Deleted</Column>
                    <Column>Actions</Column>
                </Table.Columns>
                <Table.Rows>
                    {users.data.map(user => (
                        <Row key={user.id}>
                            <RowItem>#{user.id}</RowItem>
                            <RowItem>
                                <div className="flex flex-row items-center my-auto gap-2">
                                    <UserProfilePicture user={user}/>
                                    <span>{user.name}</span>
                                </div>
                            </RowItem>
                            <RowItem>{user.email}</RowItem>
                            <RowItem>
                                {user.email_verified_at && <CheckIcon className="w-5 h-5 text-green-500"/>}
                                {!user.email_verified_at && <XMarkIcon className="w-5 h-5 text-red-500"/>}
                            </RowItem>
                            <RowItem>
                                {user.deleted_at && <CheckIcon className="w-5 h-5 text-green-500"/>}
                                {!user.deleted_at && <XMarkIcon className="w-5 h-5 text-red-500"/>}
                            </RowItem>
                            <RowItem className="flex flex-col items-center justify-center gap-2">
                                {user.deleted_at == null && <Button className="w-full" color={600} onClick={() => router.visit(route('admin.users.edit', {user: user.slug}))}><PencilSquareIcon className="w-5 h-5"/>&nbsp;Edit</Button>}
                                {user.deleted_at == null && <Button className="w-full" color={200} onClick={() => router.delete(route('admin.users.delete', { user: user.slug}))} can="admin.users.delete"><TrashIcon className="w-5 h-5"/>&nbsp;Delete</Button>}
                                {user.deleted_at && <Button className="w-full" color={600} onClick={() => router.post(route('admin.users.restore', { user: user.slug }))}><ArrowPathRoundedSquareIcon className="w-5 h-5"/>&nbsp;Restore</Button>}
                            </RowItem>
                        </Row>
                    ))}
                </Table.Rows>
                <Table.Pagination position="center">
                    <Pagination only={['users']} queryField="search" searchDisplay="Search Users" data={users}/>
                </Table.Pagination>
            </Table>
        </AdminLayout>
    )
}

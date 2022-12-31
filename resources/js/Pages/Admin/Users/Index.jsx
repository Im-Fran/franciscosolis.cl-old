import Pagination from "@/js/Components/Pagination";
import Column from "@/js/Components/Table/Column";
import Row from "@/js/Components/Table/Row";
import RowItem from "@/js/Components/Table/RowItem";
import Table from "@/js/Components/Table/Table";
import UserProfilePicture from "@/js/Components/UserProfilePicture";
import AdminLayout from "@/js/Layouts/AdminLayout";

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
                            <RowItem>{/* TODO */}</RowItem>
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

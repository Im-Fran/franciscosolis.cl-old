import AdminLayout from "@/js/Layouts/AdminLayout";

export default function Edit ({ user }) {
    const meta = [
        { property: 'og:title', content: `Admin > Users > Edit ${user.name} | FranciscoSolis` },
    ]

    return (
        <AdminLayout title={`Admin > Users > Edit ${user.name}`} meta={meta}>

        </AdminLayout>
    );
}
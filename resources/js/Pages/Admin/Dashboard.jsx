import { useForm } from '@inertiajs/react';

import AdminLayout from "@/js/Layouts/AdminLayout";
import { UsersIcon, ArrowPathIcon } from '@heroicons/react/24/outline';

export default function Dashboard({ registeredUsers }) {

    const refreshUsers = useForm()

    const refreshRegisteredUsers = () => {
        refreshUsers.get(route('admin.dashboard'), {
            only: ['registeredUsers'],
            preserveScroll: true,
        });
    };

    return (
        <AdminLayout title="Admin Dashboard" meta={[{ property: 'og:title', content: 'Admin Dashboard | FranciscoSolis' }]}>
            <div className="flex w-full">
                <div className="grid grid-cols-4 gap-6 w-full">
                    <div className="col-span-1 bg-brand-600 dark:bg-brand-500 rounded shadow py-2 px-4">
                        <span className="flex items-center gap-2 text-xl font-bold">Registered Users&nbsp;<ArrowPathIcon className={"w-6 h-6 " + (refreshUsers.processing ? 'animate-spin' : '')} onClick={refreshRegisteredUsers}/></span>
                        <div className="flex flex-row items-center gap-2">
                            <span className="text-4xl font-bold"><UsersIcon className="w-12 h-12"/></span>
                            <span className={"text-4xl font-bold " + (refreshUsers.processing ? 'animate-pulse w-6 h-6 bg-brand-600 dark:bg-brand-500 rounded' : '')}>{ refreshUsers.processing ? '' : registeredUsers }</span>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}

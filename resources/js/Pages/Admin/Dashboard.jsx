import { useForm } from '@inertiajs/react';

import AdminLayout from "@/js/Layouts/AdminLayout";
import {UsersIcon, ArrowPathIcon, KeyIcon, ShieldCheckIcon} from '@heroicons/react/24/outline';

export default function Dashboard({ registeredUsers, abilities, roles }) {

    const refreshUsers = useForm()
    const refreshAbilitiesForm = useForm()
    const refreshRolesForm = useForm()

    const refreshRegisteredUsers = () => {
        refreshUsers.get(route('admin.dashboard'), {
            only: ['registeredUsers'],
            preserveScroll: true,
        });
    };

    const refreshAbilities = () => {
        refreshAbilitiesForm.get(route('admin.dashboard'), {
            only: ['abilities'],
            preserveScroll: true
        })
    }

    const refreshRoles = () => {
        refreshRolesForm.get(route('admin.dashboard'), {
            only: ['roles'],
            preserveScroll: true
        })
    }

    return (
        <AdminLayout title="Admin Dashboard">
            <div className="flex w-full">
                <div className="grid grid-cols-4 gap-6 w-full">
                    <div className="col-span-1 bg-brand-600 dark:bg-brand-500 rounded shadow py-2 px-4">
                        <span className="flex items-center gap-2 text-xl font-bold">Registered Users&nbsp;<ArrowPathIcon className={"w-6 h-6 " + (refreshUsers.processing ? 'animate-spin' : '')} onClick={refreshRegisteredUsers}/></span>
                        <div className="flex flex-row items-center gap-2">
                            <span className="text-4xl font-bold"><UsersIcon className="w-12 h-12"/></span>
                            <span className={"text-4xl font-bold " + (refreshUsers.processing ? 'animate-pulse w-6 h-6 bg-brand-600 dark:bg-brand-500 rounded' : '')}>{ refreshUsers.processing ? '' : registeredUsers }</span>
                        </div>
                    </div>
                    <div className="col-span-1 bg-brand-600 dark:bg-brand-500 rounded shadow py-2 px-4">
                        <span className="flex items-center gap-2 text-xl font-bold">Abilities&nbsp;<ArrowPathIcon className={"w-6 h-6 " + (refreshAbilitiesForm.processing ? 'animate-spin' : '')} onClick={refreshAbilities}/></span>
                        <div className="flex flex-row items-center gap-2">
                            <span className="text-4xl font-bold"><KeyIcon className="w-12 h-12"/></span>
                            <span className={"text-4xl font-bold " + (refreshAbilitiesForm.processing ? 'animate-pulse w-6 h-6 bg-brand-600 dark:bg-brand-500 rounded' : '')}>{ refreshAbilitiesForm.processing ? '' : abilities }</span>
                        </div>
                    </div>
                    <div className="col-span-1 bg-brand-600 dark:bg-brand-500 rounded shadow py-2 px-4">
                        <span className="flex items-center gap-2 text-xl font-bold">Roles&nbsp;<ArrowPathIcon className={"w-6 h-6 " + (refreshRolesForm.processing ? 'animate-spin' : '')} onClick={refreshRoles}/></span>
                        <div className="flex flex-row items-center gap-2">
                            <span className="text-4xl font-bold"><ShieldCheckIcon className="w-12 h-12"/></span>
                            <span className={"text-4xl font-bold " + (refreshRolesForm.processing ? 'animate-pulse w-6 h-6 bg-brand-600 dark:bg-brand-500 rounded' : '')}>{ refreshRolesForm.processing ? '' : roles }</span>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}

import {useEffect} from "react";
import {handleChange} from "@/js/Utils/Utils";
import {Link, useForm} from "@inertiajs/react";

import {ChevronLeftIcon} from "@heroicons/react/24/outline";
import AdminLayout from "@/js/Layouts/AdminLayout";
import Label from "@/js/Components/Forms/Label";
import Input from "@/js/Components/Forms/Input";
import InputError from "@/js/Components/Forms/InputError";
import Select from "@/js/Components/Forms/Select";
import Button from "@/js/Components/Button";

export default function Edit({ role, abilities }) {
    const meta = [
        { property: 'og:title', content: `Admin > Roles > Edit ${role.title} | FranciscoSolis` },
    ]

    const {data, setData, patch, processing, errors, transform} = useForm(`EditRole:${role.id}`, {
        title: role.title,
        name: role.name,
        permissions: [],
    })

    useEffect(() => {
        setData('permissions', role.abilities.map(it => ({
            label: `${it.title} (${it.name})`,
            value: it.name,
        })))
    });

    const save = () => {
        // Use transform to transform the permissions into a flat array of values
        // instead of an array of objects.

        transform(prev => ({
            ...prev,
            permissions: prev.permissions.map(it => it.value),
        }));

        patch(route('admin.roles.update', { role: role.name }), {
            preserveScroll: true,
        })
    }

    const options = (abilities || []).map(it => ({
        label: `${it.title} (${it.name})`,
        value: it.name,
    }))

    const defaultOptions = (role.abilities || []).map(it => ({
        label: `${it.title} (${it.name})`,
        value: it.name,
    }));

    return (
        <AdminLayout title={`Admin > Roles > Edit ${role.title}`} meta={meta}>
            <div className="w-full">
                <div className="flex">
                    <Link preserveState href={route('admin.roles')} className="flex items-center mb-2 text-blue-500 text-sm cursor-pointer"><ChevronLeftIcon className="w-5 h-5"/> Go Back</Link>
                </div>

                <h1 className="text-xl font-bold">Editing {role.title}</h1>
                <hr className="w-1/4"/>

                <div className="w-2/3">
                    <div className="mt-5">
                        <Label forInput="title" value="Display"/>

                        <Input
                            type="text"
                            name="title"
                            value={data.title}
                            placeholder="Admin Users"
                            className="mt-1 block w-full"
                            isFocused={true}
                            handleChange={e => handleChange(setData, e)}
                        />

                        <InputError message={errors.title} className="mt-2"/>
                    </div>

                    <div className="mt-5">
                        <Label forInput="name" value="Identifier"/>

                        <Input
                            type="text"
                            name="name"
                            value={data.name}
                            placeholder="admin-users"
                            className="mt-1 block w-full"
                            handleChange={e => handleChange(setData, e)}
                        />

                        <InputError message={errors.name} className="mt-2"/>
                    </div>

                    <div className="mt-5">
                        <Label forInput="permissions" value="Permissions"/>

                        <Select
                            name="permissions"
                            defaultValue={defaultOptions}
                            options={options}
                            onChange={values => setData('permissions', values)}
                            isClearable
                            isMulti
                        />

                        <InputError message={errors.permissions} className="mt-2"/>
                    </div>

                    <div className="mt-5">
                        <Button processing={processing} onClick={save} color={400} type="button">Save</Button>
                    </div>
                </div>
            </div>
        </AdminLayout>
    )
}
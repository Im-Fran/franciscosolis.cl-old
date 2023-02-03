import {Link, router, useForm} from "@inertiajs/react";
import {handleChange, handleError} from "@/js/Utils/Utils";

import AdminLayout from "@/js/Layouts/AdminLayout";
import {ChevronLeftIcon, ShieldCheckIcon} from "@heroicons/react/24/outline";
import Label from "@/js/Components/Forms/Label";
import Input from "@/js/Components/Forms/Input";
import InputError from "@/js/Components/Forms/InputError";
import UserProfilePicture from "@/js/Components/UserProfilePicture";
import Button from "@/js/Components/Button";
import Checkbox from "@/js/Components/Forms/Checkbox";
import toast from "react-hot-toast";
import Select from "@/js/Components/Forms/Select";

export default function Edit ({ user, abilities, roles }) {
    const meta = [
        { property: 'og:title', content: `Admin > Users > Edit ${user.name} | FranciscoSolis` },
    ]

    const abilitiesOptions = abilities.map((ability) => ({
        label: ability.title,
        value: ability.name,
    }));

    const userAbilities = user.abilities.map((ability) => ({
        label: ability.title,
        value: ability.name,
    }));

    const rolesOptions = roles.map((role) => ({
        label: role.title,
        value: role.name,
    }));

    const userRoles = user.roles.map((role) => ({
        label: role.title,
        value: role.name,
    }));

    const {data, setData, errors, setError, clearErrors, patch, transform } = useForm({
        name: user.name,
        email: user.email,
        abilities: userAbilities,
        roles: userRoles,
    })

    const submit = (e) => {
        e.preventDefault();
        e.stopPropagation();
        // Now we return just the value of the abilities and roles.
        transform((form) => ({
            ...form,
            abilities: data.abilities.map((it) => it.value),
            roles: data.roles.map((it) => it.value),
        }));


        patch(route('admin.users.update', { user: user.slug }), {
            preserveScroll: true,
            onSuccess: () => {
                toast.success('Settings updated successfully.')
            },
            onError: (err) => {
                handleError(err, 'There was an error updating your settings.')
            },
            only: ['user', 'flash', 'errors'],
        });
    };

    const privacyForm = useForm(`AdminEditUserPrivacy:${user.id}`, {
        'activity.public': user.settings['activity.public'],
    })

    const submitPrivacy = (e) => {
        e.preventDefault();
        e.stopPropagation();
        privacyForm.transform((form) => ({
            ...form,
            'activity.public': !!form['activity.public'],
        }));
        privacyForm.post(route('admin.users.privacy', { user: user.slug }), {
            preserveScroll: true,
            onSuccess: () => {
                toast.success('Privacy settings updated successfully.')
            },
            onError: (err) => {
                handleError(err, 'There was an error updating the settings.')
            },
            only: ['user', 'flash', 'errors'],
        });
    }

    const onBlurName = (e) => {
        const name = e.target.value || '';
        if(name.length < 4) {
            setError('name', 'Name must be at least 3 characters.');
        } else if(name.length > 255){
            setError('name', 'Name cannot be longer than 255 characters.');
        } else if(name.startsWith('.') || name.startsWith('_')) {
            setError('name', 'Name cannot start with a dot or underscore.');
        } else if(name.endsWith('.') || name.endsWith('_')) {
            setError('name', 'Name cannot end with a dot or underscore.');
        } else if ([0,1,2,3,4,5,6,7,8,9].filter(it => name.startsWith(`${it}`)).length > 0) {
            setError('name', 'Name cannot start with a number.');
        } else {
            clearErrors('name');
        }
    };

    const resetImage = () => {
        if(user.profile_photo_path == null) {
            toast.error('There\'s no profile picture to reset.');
            return
        }

        router.delete(route('admin.users.image.reset', { user: user.slug }), {
            onSuccess: () => toast.success('Profile picture reset successfully.'),
            onError: (err) => handleError(err, 'There was an error resetting the profile picture.'),
        })
    }

    return (
        <AdminLayout title={`Admin > Users > Edit ${user.name}`} meta={meta}>
            <div className="flex flex-col w-full items-start">
                <div className="flex">
                    <Link preserveState href={route('admin.users')} className="flex items-center mb-2 text-blue-500 text-sm cursor-pointer"><ChevronLeftIcon className="w-5 h-5"/> Go Back</Link>
                </div>
                <form onSubmit={submit} className="mb-5 w-full">
                    <h2 className="flex text-xl">Editing {user.name}'s Account</h2>
                    <hr className="w-1/3 border-0 border-t-2 border-gray-500 mb-10"/>

                    <div className="grid grid-cols-4 gap-5 mt-5">
                        <div className="col-span-1">
                            <Label forInput="name" value="Name"/>

                            <Input
                                type="text"
                                name="name"
                                placeholder="Im.Fran_"
                                className="mt-1 w-full"
                                autoComplete="username"
                                pattern="([a-zA-Z]+[a-zA-Z0-9_\. ][a-zA-Z0-9]+){4,255}"
                                handleChange={(e) => handleChange(setData, e)}
                                onBlur={onBlurName}
                                value={data.name}
                                isFocused
                                required
                            />

                            <InputError message={errors.name} className="mt-2" />
                        </div>

                        <div className="col-span-1">
                            <Label forInput="email" value="Email"/>

                            <Input
                                type="email"
                                name="email"
                                placeholder="fran@franciscosolis.cl"
                                className="mt-1 w-full"
                                autoComplete="username"
                                handleChange={(e) => handleChange(setData, e)}
                                value={data.email}
                                isFocused
                                required
                            />

                            <InputError message={errors.email} className="mt-2" />
                        </div>

                        <div className="grid grid-cols-4 gap-2 col-span-4">
                            <div className="col-span-1">
                                <UserProfilePicture user={user} size={1024} sizeClass="h-32 w-32" showStatus={false}/>
                            </div>
                            <div className="col-span-2">
                                <Button type="button" color={200} onClick={resetImage}>Reset Image</Button>
                            </div>
                        </div>

                        <div className="col-span-2">
                            <Label forInput="abilities" value="Abilities"/>

                            <Select
                                name="abilities"
                                defaultValue={userAbilities}
                                options={abilitiesOptions}
                                onChange={values => setData('abilities', values)}
                                isClearable
                                isMulti
                            />

                            <InputError message={errors.abilities} className="mt-2" />
                        </div>

                        <div className="col-span-2 col-start-1">
                            <Label forInput="roles" value="Roles"/>

                            <Select
                                name="roles"
                                defaultValue={userRoles}
                                options={rolesOptions}
                                onChange={values => setData('roles', values)}
                                isClearable
                                isMulti
                            />

                            <InputError message={errors.roles} className="mt-2" />
                        </div>
                    </div>

                    {/* Save button */}
                    <Button color={100} className="!text-sm mt-10">Save</Button>
                </form>

                <div className="my-10"/>

                <form onSubmit={submitPrivacy} className="mb-5 w-full">
                    <h2 className="flex text-xl"><ShieldCheckIcon className="w-6 h-6"/>&nbsp;Privacy Settings</h2>
                    <hr className="w-1/4 border-0 border-t-2 border-gray-500 mb-10"/>

                    {/* Activity Public */}
                    <div className="mt-4">
                        <Checkbox center={false} name="activity.public" value={privacyForm.data['activity.public']} handleChange={(e) => handleChange(privacyForm.setData, e)} label="Activity Public" info="If enabled everyone will be able to see if you're online or not." />
                    </div>

                    {/* Save button */}
                    <Button color={100} className="!text-sm">Save</Button>
                </form>
            </div>
        </AdminLayout>
    );
}
import AccountLayout from "@/js/Layouts/AccountLayout";

import { router, usePage, useForm } from "@inertiajs/react";
import {handleError, fixForms, handleChange } from "@/js/Utils/Utils";
import toast from 'react-hot-toast';
import Button from "@/js/Components/Button";
import Label from "@/js/Components/Forms/Label";
import Input from "@/js/Components/Forms/Input";
import InputError from "@/js/Components/Forms/InputError";

export default function Access() {
    const meta = [
        { property: 'og:title', content: 'Account > Security > Login & Sessions | FranciscoSolis' },
    ];

    const { auth } = usePage().props;
    const { two_factor_enabled } = auth.user;

    const { data, setData, errors, patch, setError, clearErrors } = useForm(fixForms({
        password: '',
        password_confirmation: '',
    }));

    const updatePassword = (e) => {
        e.stopPropagation()
        e.preventDefault()

        patch(route('account.security.access.password'), {
            preserveScroll: true,
            onSuccess: () => {
                toast.success('Password updated successfully.');
            },
            onError: (error) => {
                handleError(error, 'There was an error updating your password.');
            },
        });
    };

    const handleBlur = (e) => {
        if(data.password !== data.password_confirmation) {
            setError('password_confirmation', 'The password does not match.');
        } else {
            clearErrors('password_confirmation');
        }
    }

    return (
        <AccountLayout title="Security > Access" meta={meta}>
            <div className="flex flex-col w-full items-start">
                <form onSubmit={updatePassword} className="mb-5 w-full">
                    <h2 className="text-xl">Account Password</h2>
                    <hr className="w-1/4 border-0 border-t-2 border-gray-500 mb-10"/>

                    {/* Password + Password Confirmation */}
                    <div className="grid grid-cols-3 gap-12 mb-5">
                        {/* Password */}
                        <div className="flex flex-col">
                            <Label forInput="password" value="Password" info="This will be your new password."/>

                            <Input
                                type="password"
                                name="password"
                                placeholder="•••••••"
                                className="mt-1 w-full"
                                autoComplete="new-password"
                                handleChange={(e) => handleChange(setData, e)}
                                value={data.password}
                                required
                            />

                            <InputError message={errors.password} className="mt-2" />
                        </div>

                        {/* Password Confirmation */}
                        <div className="flex flex-col">
                            <Label forInput="password_confirmation" value="Password Confirmation"/>

                            <Input
                                type="password"
                                name="password_confirmation"
                                placeholder="•••••••"
                                className="mt-1 w-full"
                                autoComplete="new-password"
                                handleChange={(e) => handleChange(setData, e)}
                                handleBlur={handleBlur}
                                value={data.password_confirmation}
                                required
                            />

                            <InputError message={errors.password_confirmation} className="mt-2" />
                        </div>
                    </div>

                    {/* Save button */}
                    <Button color={100} className="!text-sm">Update Password</Button>
                </form>


                <div className="mb-5 w-full">
                    <h2 className="text-xl">Two Factor Authentication</h2>
                    <hr className="w-1/4 border-0 border-t-2 border-gray-500 mb-10"/>

                    <div className="flex gap-6">
                        <Button onClick={() => router.visit(route('account.security.access.two-factor-auth.setup'))} type="button" color={300}>
                            {two_factor_enabled ? 'Manage' : 'Enable'} 2FA
                        </Button>
                        {two_factor_enabled && <Button onClick={() => router.post(route('account.security.access.two-factor-auth.delete'), { _method: 'delete' })}
                                 type="button" color={200}>Disable 2FA</Button>}
                    </div>
                </div>
            </div>
        </AccountLayout>
    );
}

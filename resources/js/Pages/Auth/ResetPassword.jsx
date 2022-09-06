import { useEffect } from 'react';
import { useForm } from '@inertiajs/inertia-react';

import App from '@/Layouts/App';
import Button from '@/Components/Button';
import Input from '@/Components/Forms/Input';
import InputError from '@/Components/Forms/InputError';
import Label from '@/Components/Forms/Label';

export default function ResetPassword({ token, email }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        token: token,
        email: email,
        password: '',
        password_confirmation: '',
    });

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.value);
    };

    const submit = (e) => {
        e.preventDefault();

        post(route('password.update'));
    };

    return (
        <App title="Reset Password" horizontal="center" vertical="center">

            <form className="flex flex-col items-center justify-center shadow-xl border border-brand-500 dark:border-none dark:bg-gray-800 rounded-2xl w-5/6 md:w-1/2 h-[28rem] py-5" onSubmit={submit}>
                <div className="mb-10 font-black text-3xl">Reset Password</div>

                <div className="w-2/3">
                    <Label forInput="email" value="Email" />

                    <Input
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        handleChange={onHandleChange}
                    />

                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div className="mt-4">
                    <Label forInput="password" value="Password" />

                    <Input
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                        isFocused={true}
                        handleChange={onHandleChange}
                    />

                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="mt-4">
                    <Label forInput="password_confirmation" value="Confirm Password" />

                    <Input
                        type="password"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                        handleChange={onHandleChange}
                    />

                    <InputError message={errors.password_confirmation} className="mt-2" />
                </div>

                <div className="flex items-center justify-end mt-4">
                    <Button className="ml-4" processing={processing}>
                        Reset Password
                    </Button>
                </div>
            </form>
        </App>
    );
}

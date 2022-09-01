import React, { useEffect } from 'react';
import App from '@/Layouts/App';
import Button from '@/Components/Button';
import Input from '@/Components/Forms/Input';
import Label from '@/Components/Forms/Label';
import Checkbox from '@/Components/Forms/Checkbox';
import InputError from '@/Components/Forms/InputError';
import { Link, useForm } from '@inertiajs/inertia-react';


export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: '',
    });

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value);
    };

    const submit = (e) => {
        e.preventDefault();

        post(route('login'));
    };

    return (
        <App title="Sign In" horizontal="center" vertical="center">

            <form className="flex flex-col items-center justify-center shadow-xl border border-brand-500 dark:border-none dark:bg-gray-800 rounded-2xl w-5/6 md:w-1/2 h-[28rem] py-5" onSubmit={submit}>
                <div className="mb-10 font-black text-3xl">Log In</div>

                <div className="w-2/3">
                    <Label forInput="email" value="Email" />

                    <Input
                        type="text"
                        name="email"
                        value={data.email}
                        placeholder="fran@franciscosolis.cl"
                        className="mt-1 block w-full"
                        autoComplete="username"
                        isFocused={true}
                        handleChange={onHandleChange}
                    />

                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div className="w-2/3 mt-4">
                    <Label forInput="password" value="Password" />

                    <Input
                        type="password"
                        name="password"
                        placeholder="•••••••"
                        value={data.password}
                        className="mt-1 block w-full"
                        autoComplete="current-password"
                        handleChange={onHandleChange}
                    />

                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="block mt-4">
                    <Checkbox name="remember" value={data.remember} handleChange={onHandleChange} label="Remember me" />
                </div>

                <div className="flex items-center justify-end mt-4">
                    {canResetPassword && (
                        <Link href={route('password.request')} className="underline text-sm hover:opacity-75 transform-all duration-300">
                            Forgot your password?
                        </Link>
                    )}

                    <Button className="ml-4" processing={processing}>
                        Log in
                    </Button>
                </div>
            </form>
        </App>
    );
}

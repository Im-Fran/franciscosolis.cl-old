import { useForm } from '@inertiajs/react';

import App from '@/js/Layouts/App';
import Button from '@/js/Components/Button';
import Label from '@/js/Components/Forms/Label';
import Input from '@/js/Components/Forms/Input';
import InputError from '@/js/Components/Forms/InputError';

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.value);
    };

    const submit = (e) => {
        e.preventDefault();

        post(route('password.email'));
    };

    return (
        <App title="Forgot Password" vertical="center" horizontal="center">
            <form className="flex flex-col items-center justify-center shadow-xl border border-brand-500 dark:border-none dark:bg-[#303030] rounded-2xl w-5/6 md:w-1/2 h-[28rem] py-5" onSubmit={submit}>
                <h1 className="text-2xl font-black mb-10">Password Reset</h1>

                <div className="flex flex-col mx-20">
                    <div className="mb-4 text-md text-gray-600 dark:text-gray-200 text-center items-center">
                        Forgot your password? No problem. Just let us know your email address and we will email you a password
                        reset link that will allow you to choose a new one.
                    </div>
                </div>

                <div className="mt-5 w-1/3">
                    <Label forInput="email" value="Email Address"/>

                    <Input
                        type="text"
                        name="email"
                        value={data.email}
                        placeholder="fran@franciscosolis.cl"
                        className="mt-1 block w-full"
                        isFocused={true}
                        handleChange={onHandleChange}
                    />

                    <InputError message={errors.email} className="mt-2" />
                </div>


                <div className="flex items-center justify-center mt-4 w-full">
                    <Button processing={processing}>
                        Email Password Reset Link
                    </Button>
                </div>
            </form>
        </App>
    );
}

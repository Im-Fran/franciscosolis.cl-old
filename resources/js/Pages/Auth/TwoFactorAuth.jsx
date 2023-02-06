import { useEffect } from 'react';
import { useForm } from '@inertiajs/react';

import App from '@/js/Layouts/App';
import Button from '@/js/Components/Button';
import Input from '@/js/Components/Forms/Input';
import InputError from '@/js/Components/Forms/InputError';
import Label from '@/js/Components/Forms/Label';
import {handleChange} from "@/js/Utils/Utils";

export default function ConfirmPassword() {
    const { data, setData, post, processing, reset, errors, clearErrors, setError } = useForm({
        one_time_password: '',
    });

    const onBlur = () => {
        if(data.one_time_password.length !== 6 && data.one_time_password.length !== 23) {
            setError('one_time_password', 'The 2FA Code must be 6 characters.');
        } else if (/[0-9]{6}|[A-Za-z0-9]{6}\.[A-Za-z0-9]{4}\.[A-Za-z0-9]{6}\.[A-Za-z0-9]{4}/.test(data.one_time_password) === false) {
            setError('one_time_password', 'Please make sure you\'re using a valid 2FA Code or Backup Code.');
        } else {
            clearErrors('one_time_password');
        }
    };

    useEffect(() => {
        return () => {
            reset('one_time_password');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();

        post(route('2fa'));
    };

    return (
        <App title="Two Factor Authentication" vertical="center" horizontal="center">
            <form className="flex flex-col items-center justify-start shadow-xl border border-brand-500 dark:border-none dark:bg-[#303030] rounded-2xl w-5/6 md:w-1/2 py-10" onSubmit={submit}>
                <div className="mb-5 font-black text-3xl">Two Factor Authentication</div>
                <div className="mb-4 text-sm">
                    Please input your 2FA Code to continue.
                </div>

                <div className="mt-4">
                    <Label forInput="one_time_password" value="2FA Code" />

                    <Input
                        type="text"
                        pattern="[0-9]{6}|[A-Za-z0-9]{6}\.[A-Za-z0-9]{4}\.[A-Za-z0-9]{6}\.[A-Za-z0-9]{4}"
                        name="one_time_password"
                        value={data.one_time_password}
                        className="mt-1 block w-full"
                        isFocused={true}
                        handleChange={(e) => handleChange(setData, e)}
                        handleBlur={onBlur}
                    />

                    <InputError message={errors.one_time_password} className="mt-2" />
                </div>

                <div className="flex items-center justify-end mt-4">
                    <Button className="ml-4" processing={processing}>
                        Submit
                    </Button>
                </div>
            </form>
        </App>
    );
}

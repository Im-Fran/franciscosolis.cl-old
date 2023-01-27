import { useEffect } from 'react';
import { useForm } from '@inertiajs/react';

import App from '@/js/Layouts/App';
import Button from '@/js/Components/Button';
import Input from '@/js/Components/Forms/Input';
import InputError from '@/js/Components/Forms/InputError';
import Label from '@/js/Components/Forms/Label';

export default function ConfirmPassword() {
    const { data, setData, post, processing, errors, reset } = useForm({
        password: '',
    });

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.value);
    };

    const submit = (e) => {
        e.preventDefault();

        post(route('password.confirm'));
    };

    return (
        <App title="Confirm Password" vertical="center" horizontal="center" meta={[{ property: 'og:title', content: 'Confirm Password | FranciscoSolis' }]}>
            <form className="flex flex-col items-center justify-start shadow-xl border border-brand-500 dark:border-none dark:bg-[#303030] rounded-2xl w-5/6 md:w-1/2 py-10" onSubmit={submit}>
                <div className="mb-5 font-black text-3xl">Confirm Password</div>
                <div className="mb-4 text-sm">
                    This is a secure area of the application. Please confirm your password before continuing.
                </div>

                <div className="mt-4">
                    <Label forInput="password" value="Password" />

                    <Input
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full"
                        isFocused={true}
                        handleChange={onHandleChange}
                        autoComplete={"current-password"}
                    />

                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="flex items-center justify-end mt-4">
                    <Button className="ml-4" processing={processing}>
                        Confirm
                    </Button>
                </div>
            </form>
        </App>
    );
}

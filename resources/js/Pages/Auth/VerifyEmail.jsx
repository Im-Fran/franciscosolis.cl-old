import { useEffect } from "react";
import { router, Link, useForm, usePage } from '@inertiajs/react';

import App from '@/js/Layouts/App';
import Button from '@/js/Components/Button';

export default function VerifyEmail({ status }) {
    const { post, processing } = useForm();
    const { auth } =  usePage().props

    const submit = (e) => {
        e.preventDefault();

        post(route('verification.send'));
    };

    useEffect(() => {
        if(window.Echo && auth.check && auth.user) {
            const channel = window.Echo.private('App.Models.User.' + auth.user.id).notification((notification) => {
                if(notification.type === 'App\\Notifications\\Account\\EmailVerifiedNotification') {
                    router.visit(route('account'))
                }
            });

            return () => (channel && channel.unsubscribe())
        }
    }, [window.Echo, auth.user, auth.check]);

    return (
        <App title="Email Verification" vertical="center" horizontal="center" meta={[{ property: 'og:title', content: 'Auth > Verify Email | FranciscoSolis' }]}>
            <div className="flex flex-col items-center justify-between shadow-xl border border-brand-500 dark:border-none dark:bg-[#303030] rounded-2xl w-5/6 md:w-1/2 h-[24rem] p-10">

                <h1 className="text-2xl font-black mb-10">Email Verification</h1>

                <div className="flex flex-col mx-20">
                    <div className="mb-4 text-md text-gray-600 dark:text-gray-200 text-center items-center">
                        Thanks for signing up! Before getting started, could you verify your email address by clicking on the
                        link we just emailed to you? If you didn't receive the email, we will gladly send you another.
                    </div>

                    {status === 'verification-link-sent' && (
                        <div className="mb-4 font-medium text-sm text-green-600">
                            A new verification link has been sent to the email address you provided during registration.
                        </div>
                    )}
                </div>

                <form onSubmit={submit}>
                    <div className="mt-4 flex flex-row items-center justify-between gap-5">
                        <Button processing={processing}>Resend Verification Email</Button>

                        <Link
                            href={route('logout')}
                            method="post"
                            as="button"
                            className="underline text-sm hover:opacity-75 transform-all duration-300"
                        >
                            Log Out
                        </Link>
                    </div>
                </form>
            </div>
        </App>
    );
}

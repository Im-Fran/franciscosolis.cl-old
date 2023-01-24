import {useState, useEffect} from "react";
import { router, Link, useForm, usePage } from "@inertiajs/react";
import { handleError, fixForms, handleChange } from "@/js/Utils/Utils";
import QRCode from 'qrcode';
import jsPDF from 'jspdf';

import AccountLayout from "@/js/Layouts/AccountLayout";
import Button from "@/js/Components/Button";
import Label from "@/js/Components/Forms/Label";
import Input from "@/js/Components/Forms/Input";
import InputError from "@/js/Components/Forms/InputError";
import Clipboard from 'react-clipboard.js';
import {ChevronLeftIcon, InformationCircleIcon,ExclamationTriangleIcon} from "@heroicons/react/24/outline";

export default function TwoFactorSetup({ secret, qr_url, recovery_codes }) {
    const { auth } = usePage().props;

    const oneTimePasswordPattern = '[0-9]{6}|[A-Za-z0-9]{6}\.[A-Za-z0-9]{4}\.[A-Za-z0-9]{6}\.[A-Za-z0-9]{4}';
    const [showQR, setShowQR] = useState(true);
    const [hasUsedCodes, setHasUsedCodes] = useState(false);

    useEffect(() => {
        setHasUsedCodes(recovery_codes.includes('USED'))
    }, [recovery_codes]);

    useEffect(() => {
        if(secret !== 'hidden'){
            try {
                (async () => (document.getElementById('setup_qr_light') || { src: '' }).src = await QRCode.toDataURL(qr_url, {
                    errorCorrectionLevel: 'H',
                    type: 'image/jpeg',
                    quality: 0.3,
                    margin: 1,
                    color: {
                        dark:  "#212121d9",
                        light: "#ffffff",
                    }
                }))();
            } catch(err) {
                handleError(err, 'Error generating light QR code. Please try again later.');
            }

            try {
                (async () => (document.getElementById('setup_qr_dark') || { src: '' }).src = await QRCode.toDataURL(qr_url, {
                    errorCorrectionLevel: 'H',
                    type: 'image/jpeg',
                    quality: 0.3,
                    margin: 1,
                    color: {
                        dark: "#ffffff",
                        light:"#212121d9",
                    }
                }))()
            }catch(err) {
                handleError(err, 'Error generating light QR code. Please try again later.');
            }
        }
    }, [qr_url]);

    const toggleShowQR = () => {
        setShowQR((prev) => !prev);
    }

    const meta = [
        { property: 'og:title', content: 'Account > Security > 2FA Setup | FranciscoSolis' },
    ];

    const { data, setData, errors, post, setError, clearErrors } = useForm(fixForms({
        one_time_password: '',
    }));

    const onBlur = () => {
        if(data.one_time_password.length !== 6 && data.one_time_password.length !== 23) {
            setError('one_time_password', 'The one time password must be 6 characters, or the backup code must be 23 characters.');
        } else if(new RegExp(oneTimePasswordPattern).test(data.one_time_password) === false) {
            setError('one_time_password', 'The one time password must be numeric.');
        } else {
            clearErrors('one_time_password');
        }
    };

    const downloadCodes = () => {
        const url = new jsPDF({
            orientation: 'p',
            unit: 'mm',
            format: 'a4',
            putOnlyUsedFonts:true,
            floatPrecision: 16,
        }).setFontSize(10).text([
            'These are your backup codes. Please keep them safe and do not share them with anyone.',
            '',
            'If you lose access to your 2FA codes, you can use these codes to access your account.',
            '',
            'If you have already used one of these codes, please regenerate them.',
            '',
            'Backup Codes:',
            '',
            ...recovery_codes.map((code, index) => `${index + 1}. ${code}`),
        ], 10, 10).output('dataurlstring');

        const link = document.createElement('a');
        link.style.display = 'none';
        link.href = url;
        link.download = 'franciscosolis.cl - ' + auth.user.name + ' - Backup Codes.pdf';
        document.body.appendChild(link);
        link.click();
        link.remove();
    };

    const submit = (e) => {
        e.stopPropagation()
        e.preventDefault()

        post(route('account.security.access.two-factor-auth.validate'), {
            onError: err => {
                handleError(err, 'There was an error verifying your one time password.');
            },
            only: ['secret', 'recovery_codes', 'qr_url', 'errors', 'flash'],
            preserveScroll: true,
        })
    };

    const regenerateCodes = () => {
        router.patch(route('account.security.access.two-factor-auth.recovery-codes.regenerate'), {
            only: ['recovery_codes', 'errors', 'flash'],
            preserveScroll: true,
        })
    }

    const regenerateSecret = () => {
        router.patch(route('account.security.access.two-factor-auth.secret.regenerate'), {
            only: ['secret', 'qr_url', 'errors', 'flash'],
            preserveScroll: true,
        })
    }

    return (
        <AccountLayout title="Security > 2FA Setup" meta={meta}>
            <div className="flex flex-col w-full items-start">
                <form onSubmit={submit} className="mb-5 w-full">
                    <div className="flex">
                        <Link preserveState href={route('account.security.access')} className="flex items-center mb-2 text-blue-500 text-sm cursor-pointer"><ChevronLeftIcon className="w-5 h-5"/> Go Back</Link>
                    </div>

                    {secret === 'hidden' && recovery_codes && <>
                        <h2 className="flex items-center text-2xl">
                            Backup Codes&nbsp;
                            <InformationCircleIcon className="h-5 w-5" data-tip="These are codes that you'll be able to use in case you lose your access to the 2FA codes."/>&nbsp;
                            {hasUsedCodes && <ExclamationTriangleIcon className="h-5 w-5 fill-orange-400" data-tip="You have used some of the backup codes! Please regenerate them ASAP."/>}
                        </h2>
                        <hr className="w-1/4 border-0 border-t-2 border-gray-500 mb-5"/>
                        <div className="flex flex-col mb-10">
                            {/* Display the 8 recovery codes as a list of 4 on the left and 4 on the right with bullet points */}
                            <div className="flex flex-col md:flex-row" id="backup-codes">
                                <div className="flex flex-col w-full md:w-1/3">
                                    {recovery_codes.slice(0, 4).filter(it => it !== 'USED').map((code, index) => (
                                        <div key={index} className="flex items-center">
                                            <span className="mr-2">•</span>
                                            <span className="text-sm cursor-pointer" data-clipboard={code} data-tip="Click to copy">{code}</span>
                                        </div>
                                    ))}
                                </div>
                                <div className="flex flex-col w-full md:w-1/4">
                                    {recovery_codes.slice(4, 8).filter(it => it !== 'USED').map((code, index) => (
                                        <div key={index} className="flex items-center">
                                            <span className="mr-2">•</span>
                                            <span className="text-sm cursor-pointer" data-clipboard={code} data-tip="Click to copy">{code}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Download button */}
                            <div className="flex flex-col md:flex-row md:gap-5 mt-5">
                                <Button type="button" color={400} onClick={() => downloadCodes()}>
                                    Download Codes
                                </Button>
                                <Button type="button" color={200} onClick={() => regenerateCodes()}>
                                    Regenerate Codes
                                </Button>
                            </div>
                        </div>
                    </>}

                    <h2 className="flex items-center text-xl">2FA {secret !== 'hidden' ? 'Setup' : 'Test'}&nbsp;<InformationCircleIcon className="h-5 w-5" data-tip={secret === 'hidden' ? 'Here you\'ll be able to test your 2FA codes!' : 'Setup your 2FA and test the code!'}/></h2>
                    <hr className="w-1/4 border-0 border-t-2 border-gray-500 mb-5"/>

                    {secret !== 'hidden' && <div className="flex flex-col mb-10">
                        <span>Scan the QR Code to begin setup:</span>
                        <div className="flex">
                            <div className={showQR ? '' : 'hidden'}>
                                <img className="py-2 block dark:hidden" id="setup_qr_light"></img>
                                <img className="py-2 hidden dark:block" id="setup_qr_dark"></img>

                                <div className="flex flex-col md:flex-row gap-5 mt-2">
                                    <Button type="button" onClick={toggleShowQR}>Show Key String</Button>
                                    <Button type="button" color={200} onClick={regenerateSecret}>Regenerate 2FA Secret</Button>
                                </div>
                            </div>
                            <div className={"flex flex-col" + (showQR ? ' hidden ' : '')}>
                                <Label forInput="secret" value="Secret"/>
                                <Clipboard data-clipboard-text={secret}>
                                    <Input
                                        name="secret"
                                        value={secret}
                                        className="w-[44rem]"
                                        readOnly
                                        type="text"
                                        handleClick={e => e.target.select()}
                                    />
                                </Clipboard>

                                <div className="flex flex-col md:flex-row gap-5 mt-2">
                                    <Button type="button" onClick={toggleShowQR}>Show QR Code</Button>
                                    <Button type="button" color={200} onClick={regenerateSecret}>Regenerate 2FA Secret</Button>
                                </div>
                            </div>
                        </div>
                    </div>}

                    <div className="grid grid-cols-3 gap-12 mb-5">
                        {/* One Time Password */}
                        <div className="flex flex-col">
                            <Label forInput="one_time_password" value="2FA Code" info="Write here the code generated by the app"/>

                            <Input
                                type="text"
                                name="one_time_password"
                                placeholder="123456"
                                className="mt-1 w-full"
                                autoComplete="one-time-password"
                                handleChange={(e) => handleChange(setData, e)}
                                handleBlur={onBlur}
                                value={data.one_time_password}
                                pattern={oneTimePasswordPattern}
                                required
                            />

                            <InputError message={errors.one_time_password} className="mt-2" />
                        </div>
                    </div>

                    {/* Save button */}
                    <Button color={100} className="!text-sm">Submit</Button>
                </form>
            </div>
        </AccountLayout>
    );
}

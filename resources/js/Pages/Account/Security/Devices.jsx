import AccountLayout from "@/js/Layouts/AccountLayout";

export default function Devices({ sessions }) {
    const meta = [
        { property: 'og:title', content: 'Account > Security > Login & Sessions | FranciscoSolis' },
    ];

    return (
        <AccountLayout title="Security > Devices" meta={meta}>
            <div className="flex flex-col w-full items-start">
                DEVICES
            </div>
        </AccountLayout>
    );
}

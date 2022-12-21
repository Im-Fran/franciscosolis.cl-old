import { Inertia } from '@inertiajs/inertia';

import { ComputerDesktopIcon, DevicePhoneMobileIcon } from '@heroicons/react/24/outline';
import RelativeTime from "@/js/Components/RelativeTime";
import AccountLayout from "@/js/Layouts/AccountLayout";

export default function Devices({ sessions }) {
    const meta = [
        { property: 'og:title', content: 'Account > Security > Login & Sessions | FranciscoSolis' },
    ];

    const logout = (e, session_id) => {
        e.stopPropagation()
        e.preventDefault()

        Inertia.post(route('account.security.access.devices.delete'), {
            _method: 'DELETE',
            session_id: session_id,
         }, {
            preserveScroll: true,
        });
    };

    return (
        <AccountLayout title="Security > Devices" meta={meta}>
            <div className="flex flex-col w-full items-start mb-5">
                <h2 className="text-xl">Devices</h2>
                <hr className="w-1/4 border-0 border-t-2 border-gray-500 mb-10"/>

                <div className="flex flex-col w-full">
                    <div className="overflow-x-auto bg-white rounded-lg shadow overflow-y-auto relative">
                        <table className="border-collapse table-auto w-full whitespace-no-wrap bg-white dark:bg-brand-500 table-striped relative">
                            <thead>
                                <tr className="text-left">
                                    <th className="py-2 px-6 sticky top-0 border-b border-gray-200 bg-gray-100 dark:bg-zinc-800">Device</th>
                                    <th className="py-2 px-6 sticky top-0 border-b border-gray-200 bg-gray-100 dark:bg-zinc-800">Last Used</th>
                                    <th className="py-2 px-6 sticky top-0 border-b border-gray-200 bg-gray-100 dark:bg-zinc-800">IP Address</th>
                                    <th className="py-2 px-6 sticky top-0 border-b border-gray-200 bg-gray-100 dark:bg-zinc-800">Location</th>
                                    <th className="py-2 px-6 sticky top-0 border-b border-gray-200 bg-gray-100 dark:bg-zinc-800">Browser</th>
                                    <th className="py-2 px-6 sticky top-0 border-b border-gray-200 bg-gray-100 dark:bg-zinc-800">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {sessions.map((session) => (
                                    <tr key={session.id} className="hover:bg-gray-100 dark:hover:bg-neutral-700 border-b border-gray-200 py-10">
                                        <td className="py-2 px-6">
                                            <span className="flex">
                                                {session.agent.type === 'Desktop' && <ComputerDesktopIcon className="w-6 h-6"/>}
                                                {session.agent.type === 'Mobile' && <DevicePhoneMobileIcon className="w-6 h-6"/>}
                                                &nbsp;
                                                {session.agent.type}&nbsp;({session.agent.platform})
                                            </span>
                                        </td>
                                        <td className="py-2 px-6"><RelativeTime date={session.last_active}/></td>
                                        <td className="py-2 px-6">{session.ip_address}</td>
                                        <td className="py-2 px-6">{session.location}</td>
                                        <td className="py-2 px-6">{session.agent.browser}</td>
                                        <td className="py-2 px-6">
                                            <button onClick={(e) => logout(e, session.id)} className="bg-brand-200 bg-opacity-75 hover:bg-opacity-100 text-white font-bold py-2 px-4 rounded">
                                                Logout
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Log out of all devices but this one */}
                <div className="flex flex-col w-full items-end mt-10">
                    <div className="flex">
                        <button onClick={(e) => logout(e, 'all')} className="bg-brand-200 bg-opacity-75 hover:bg-opacity-100 text-white font-bold py-2 px-4 rounded">
                            Log out of all devices
                        </button>
                    </div>
                </div>
            </div>
        </AccountLayout>
    );
}

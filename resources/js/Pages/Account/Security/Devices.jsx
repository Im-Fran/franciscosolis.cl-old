import { router } from '@inertiajs/react';

import {ArrowRightOnRectangleIcon, ComputerDesktopIcon, DevicePhoneMobileIcon} from '@heroicons/react/24/outline';
import RelativeTime from "@/js/Components/RelativeTime";
import AccountLayout from "@/js/Layouts/AccountLayout";
import Table from '@/js/Components/Table/Table';
import Column from '@/js/Components/Table/Column';
import Row from '@/js/Components/Table/Row';
import RowItem from '@/js/Components/Table/RowItem';
import Button from "@/js/Components/Button";

export default function Devices({ sessions }) {
    const logout = (session_id) => {
        router.post(route('account.security.access.devices.delete'), {
            _method: 'DELETE',
            session_id: session_id,
         }, {
            preserveScroll: true,
        });
    };

    return (
        <AccountLayout title="Security > Devices">
            <div className="flex flex-col w-full items-start mb-5">
                <div className="flex flex-col w-full">
                    <div className="overflow-x-auto overflow-y-auto relative">
                        <Table>
                            <Table.Columns>
                                <Column>Device</Column>
                                <Column sort="last_activity">Last Used</Column>
                                <Column sort="ip_address">IP Address</Column>
                                <Column sort="user_agent">Browser</Column>
                                <Column>Location</Column>
                                <Column>Actions</Column>
                            </Table.Columns>
                            <Table.Rows>
                                {sessions.map((session) => (
                                    <Row key={session.id}>
                                        <RowItem>
                                            <span className="flex">
                                                {session.agent.type === 'Desktop' && <ComputerDesktopIcon className="w-6 h-6" />}
                                                {session.agent.type === 'Mobile' && <DevicePhoneMobileIcon className="w-6 h-6" />}
                                                &nbsp;
                                                {session.agent.type}&nbsp;({session.agent.platform})
                                            </span>
                                        </RowItem>
                                        <RowItem><RelativeTime date={session.last_used_at} /></RowItem>
                                        <RowItem>{session.ip_address}</RowItem>
                                        <RowItem>{session.agent.browser}</RowItem>
                                        <RowItem>{session.location}</RowItem>
                                        <RowItem>
                                            <Button color={200} onClick={() => logout(session.id)}><ArrowRightOnRectangleIcon className="w-6 h-6"/>&nbsp;Log out</Button>
                                        </RowItem>
                                    </Row>
                                ))}
                            </Table.Rows>
                        </Table>
                    </div>
                </div>

                {/* Log out of all devices but this one */}
                <div className="flex flex-col w-full items-end mt-10">
                    <div className="flex">
                        <Button color={200} onClick={() => logout('all')} className="flex items-center h-8 my-auto">Log out of all devices</Button>
                    </div>
                </div>
            </div>
        </AccountLayout>
    );
}

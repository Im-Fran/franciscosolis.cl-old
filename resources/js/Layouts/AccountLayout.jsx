import {
    UserIcon,
    Bars4Icon,
    Cog6ToothIcon,
    KeyIcon,
    QueueListIcon,
    BellIcon,
    LockClosedIcon,
    LockOpenIcon,
    ComputerDesktopIcon,
    LinkIcon,
} from '@heroicons/react/24/outline';

import App from "@/js/Layouts/App";
import Sidebar from "@/js/Components/Sidebar/Sidebar";
import SidebarLink from "@/js/Components/Sidebar/SidebarLink";
import SidebarTitle from "@/js/Components/Sidebar/SidebarTitle";

export default function AccountLayout({ children, title, className = '' }) {
    return (
        <App title={title} vertical="top" horizontal="center">
            <Sidebar className="mx-5">
                <Sidebar.Links>
                    <SidebarTitle title="ACCOUNT" icon={<UserIcon className="w-6 h-6"/>}/>
                    <SidebarLink title="Overview" icon={<Bars4Icon className="w-6 h-6"/>} href={route('account')} activeRoute="account"/>
                    <SidebarLink title="Settings" icon={<Cog6ToothIcon className="w-6 h-6"/>} href={route('account.settings')} activeRoute="account.settings"/>

                    <div className="my-5"/>

                    <SidebarTitle title="SECURITY" icon={<LockClosedIcon className="w-6 h-6"/>}/>
                    <SidebarLink title="Access" icon={<KeyIcon className="w-6 h-6"/>} href={route('account.security.access')} activeRoute={['account.security.access', 'account.security.access.two-factor-auth.setup']}/>
                    <SidebarLink title="Devices" icon={<ComputerDesktopIcon className="w-6 h-6"/>} href={route('account.security.access.devices')} activeRoute="account.security.access.devices"/>
                    <SidebarLink title="API Keys" icon={<LockOpenIcon className="w-6 h-6"/>} href={route('account.security.access.api-keys')} activeRoute="account.security.access.api-keys"/>

                    <div className="my-5"/>

                    <SidebarTitle title="OTHERS" icon={<QueueListIcon className="w-6 h-6"/>}/>
                    <SidebarLink title="Notifications" icon={<BellIcon className="w-6 h-6"/>} href={route('account.notifications')} activeRoute="account.notifications"/>
                    <SidebarLink title="Integrations" icon={<LinkIcon className="w-6 h-6"/>} href={'#'} disabled soon/>
                </Sidebar.Links>

                <Sidebar.Content>
                    <div className={"flex flex-col items-center justify-start w-full h-full mt-10 md:mt-0 " + className}>
                        {children}
                    </div>
                </Sidebar.Content>
            </Sidebar>
        </App>
    );
}

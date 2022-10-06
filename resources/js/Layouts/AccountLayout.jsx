import { UserIcon, Bars4Icon, Cog6ToothIcon, KeyIcon, QueueListIcon, BellIcon, LockClosedIcon } from '@heroicons/react/24/outline';

import App from "@/js/Layouts/App";
import Sidebar from "@/js/Components/Sidebar/Sidebar";
import SidebarLink from "@/js/Components/Sidebar/SidebarLink";
import SidebarTitle from "@/js/Components/Sidebar/SidebarTitle";

export default function AccountLayout({ children, title, meta, className }) {
    return (
        <App title={title} meta={meta} vertical="top" horizontal="center">
            <Sidebar className="mx-5">
                <Sidebar.Links>
                    <SidebarTitle title="ACCOUNT" icon={<UserIcon className="w-6 h-6"/>}/>
                    <SidebarLink title="Overview" icon={<Bars4Icon className="w-6 h-6"/>} href={route('account')} active/>
                    <SidebarLink title="Settings" icon={<Cog6ToothIcon className="w-6 h-6"/>} href={route('account.settings')}/>

                    <div className="my-5"/>

                    <SidebarTitle title="SECURITY" icon={<LockClosedIcon className="w-6 h-6"/>}/>
                    <SidebarLink title="Login & Sessions" icon={<KeyIcon className="w-6 h-6"/>} href={'#'}/>

                    <div className="my-5"/>

                    <SidebarTitle title="OTHERS" icon={<QueueListIcon className="w-6 h-6"/>}/>
                    <SidebarLink title="Notifications" icon={<BellIcon className="w-6 h-6"/>} href={route('account.notifications')}/>
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

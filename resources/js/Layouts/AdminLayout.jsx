import {
    UsersIcon,
    Bars4Icon,
    ClipboardIcon,
    KeyIcon,
    CheckBadgeIcon,
    ShieldCheckIcon,
} from '@heroicons/react/24/outline';

import App from "@/js/Layouts/App";
import Sidebar from "@/js/Components/Sidebar/Sidebar";
import SidebarLink from "@/js/Components/Sidebar/SidebarLink";
import SidebarTitle from "@/js/Components/Sidebar/SidebarTitle";

export default function AdminLayout({ children, title, meta, className }) {
    return (
        <App title={title} meta={meta} vertical="top" horizontal="center">
            <Sidebar className="mx-5">
                <Sidebar.Links>
                    <SidebarTitle title="OVERVIEW" icon={<Bars4Icon className="w-6 h-6"/>}/>
                    <SidebarLink title="Dashboard" icon={<ClipboardIcon className="w-6 h-6"/>} href={route('admin.dashboard')} activeRoute="admin.dashboard"/>
                    <SidebarLink title="Users" icon={<UsersIcon className="w-6 h-6"/>} href={route('admin.users')} activeRoute={['admin.users', 'admin.users.edit']}/>

                    <div className="my-5"/>

                    <SidebarTitle title="ACCESS" icon={<CheckBadgeIcon className="w-6 h-6"/>}/>
                    <SidebarLink title="Permissions" icon={<KeyIcon className="w-6 h-6"/>} href={route('admin.abilities')} activeRoute="admin.abilities"/>
                    <SidebarLink title="Roles" icon={<ShieldCheckIcon className="w-6 h-6"/>} href={route('admin.roles')} activeRoute={['admin.roles', 'admin.roles.edit']}/>

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

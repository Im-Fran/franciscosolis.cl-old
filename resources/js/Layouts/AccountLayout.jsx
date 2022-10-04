import App from "@/js/Layouts/App";
import Sidebar from "@/js/Components/Sidebar/Sidebar";
import SidebarLink from "@/js/Components/Sidebar/SidebarLink";
import SidebarTitle from "@/js/Components/Sidebar/SidebarTitle";

export default function AccountLayout({ children, title, meta, className }) {
    return (
        <App title={title} meta={meta} vertical="top" horizontal="center">
            <Sidebar className="mx-5">
                <Sidebar.Links>
                    <SidebarTitle title="ACCOUNT" icon="fa-user"/>
                    <SidebarLink title="Overview" icon="fa-bars-staggered" href={route('account')}/>
                    <SidebarLink title="Settings" icon="fa-user-cog" href={route('account.settings')}/>
                    <div className="my-5"/>
                    <SidebarTitle title="SECURITY" icon="fa-shield-alt"/>
                    <SidebarLink title="Login & Sessions" icon="fa-key" href={'#'}/>
                    <div className="my-5"/>
                    <SidebarTitle title="OTHERS" icon="fa-list"/>
                    <SidebarLink title="Notifications" icon="fa-bell" href={route('account.notifications')}/>
                </Sidebar.Links>

                <Sidebar.Content>
                    <div className={"flex flex-col items-center justify-start w-full h-full " + className}>
                        {children}
                    </div>
                </Sidebar.Content>
            </Sidebar>
        </App>
    );
}

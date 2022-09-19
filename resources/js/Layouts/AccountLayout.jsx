import App from "@/Layouts/App";
import Sidebar from "@/Components/Sidebar/Sidebar";
import SidebarLink from "@/Components/Sidebar/SidebarLink";
import SidebarTitle from "@/Components/Sidebar/SidebarTitle";

export default function AccountLayout({ children, title, meta }) {
    return (
        <App title={title} meta={meta} vertical="top" horizontal="center">
            <Sidebar className="mx-5">
                <Sidebar.Links>
                    <SidebarTitle title="ACCOUNT" icon="fa-user"/>
                    <SidebarLink title="Overview" icon="fa-bars-staggered" href={route('account')}/>
                    <SidebarLink title="Settings" icon="fa-user-cog" href={route('account.settings')}/>
                </Sidebar.Links>

                <Sidebar.Content>
                    <div className="flex flex-col items-center justify-start w-full h-full">
                        {children}
                    </div>
                </Sidebar.Content>
            </Sidebar>
        </App>
    );
}

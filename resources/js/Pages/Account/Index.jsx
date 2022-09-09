import App from "@/Layouts/App";
import Sidebar from "@/Components/Sidebar/Sidebar";
import SidebarLink from "@/Components/Sidebar/SidebarLink";
import SidebarTitle from "@/Components/Sidebar/SidebarTitle";

export default function Index({ notifications }) {
    return (
        <App title="My Account" vertical="top" horizontal="center">
            <Sidebar className="mx-5">
                <Sidebar.Links>
                    <SidebarTitle title="ACCOUNT" icon="fa-user"/>
                    <SidebarLink title="Overview" icon="fa-bars-staggered" href="#"/>
                    <SidebarLink title="Settings" icon="fa-user-cog" href="#"/>
                </Sidebar.Links>

                <Sidebar.Content>
                    Content!
                </Sidebar.Content>
            </Sidebar>
        </App>
    );
}

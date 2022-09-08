import App from "@/Layouts/App";
import Sidebar from "@/Components/Sidebar/Sidebar";
import SidebarLink from "@/Components/Sidebar/SidebarLink";

export default function Index({ notifications }) {
    const links = [

    ];
    return (
        <App title="My Account" vertical="top" horizontal="center">
            <Sidebar>
                <Sidebar.Links>
                    <SidebarLink title="Account" href="#"/>
                </Sidebar.Links>

                <Sidebar.Content>
                    Content!
                </Sidebar.Content>
            </Sidebar>
        </App>
    );
}

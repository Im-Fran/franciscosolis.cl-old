import {useRef} from "react";

import AccountLayout from "@/js/Layouts/AccountLayout";
import Table from "@/js/Components/Table/Table";
import Column from "@/js/Components/Table/Column";
import Pagination from "@/js/Components/Pagination";
import CreateAPIKeyModal from "@/js/Components/Modals/Account/CreateAPIKeyModal";
import {PlusIcon} from "@heroicons/react/24/outline";

export default function ApiKeys({ apiKeys, abilities }) {

    const CreateApiKeyModalRef = useRef(null);

    return (
        <AccountLayout title="Account > API Keys">
            <CreateAPIKeyModal availableAbilities={abilities} ref={CreateApiKeyModalRef}/>
            <Table>
                <Table.Columns>
                    <Column sort="id">Id</Column>
                    <Column sort="api_key">API Key</Column>
                    <Column sort="label">Label</Column>
                </Table.Columns>
                <Table.Rows>

                </Table.Rows>
                <Table.Pagination>
                    <Pagination data={apiKeys} queryField="search" searchDisplay="Search API Keys" only={['apiKeys']}>
                        <PlusIcon className="w-6 h-6 cursor-pointer" onClick={() => CreateApiKeyModalRef.current?.open()}/>
                    </Pagination>
                </Table.Pagination>
            </Table>
        </AccountLayout>
    );
}
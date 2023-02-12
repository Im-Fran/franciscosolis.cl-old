import {useRef} from "react";

import AccountLayout from "@/js/Layouts/AccountLayout";
import Table from "@/js/Components/Table/Table";
import Column from "@/js/Components/Table/Column";
import Pagination from "@/js/Components/Pagination";
import CreateAPIKeyModal from "@/js/Components/Modals/Account/CreateAPIKeyModal";
import {PencilSquareIcon, PlusIcon, TrashIcon} from "@heroicons/react/24/outline";
import Row from "@/js/Components/Table/Row";
import RowItem from "@/js/Components/Table/RowItem";
import Button from "@/js/Components/Button";
import EditAPIKeyModal from "@/js/Components/Modals/Account/EditAPIKeyModal";
import {obfuscateText} from "@/js/Utils/Utils";
import {router} from "@inertiajs/react";
import toast from "react-hot-toast";

export default function ApiKeys({ apiKeys, abilities }) {

    const CreateApiKeyModalRef = useRef(null);
    const EditApiKeyModalRef = useRef(null);

    return (
        <AccountLayout title="Account > API Keys">
            <CreateAPIKeyModal availableAbilities={abilities} ref={CreateApiKeyModalRef}/>
            <EditAPIKeyModal availableAbilities={abilities} ref={EditApiKeyModalRef}/>
            <Table>
                <Table.Columns>
                    <Column sort="id">Id</Column>
                    <Column sort="api_key">API Key</Column>
                    <Column sort="label">Label</Column>
                    <Column>Actions</Column>
                </Table.Columns>
                <Table.Rows>
                    {apiKeys.data.map(it => (
                        <Row key={it.id}>
                            <RowItem>#{it.id}</RowItem>
                            <RowItem>
                                <span data-clipboard={it.api_key}>{it.api_key.substring(0, 7) + obfuscateText(it.api_key.substring(7))}</span>
                            </RowItem>
                            <RowItem>{it.label}</RowItem>
                            <RowItem className="flex items-center gap-5">
                                <Button type="button" onClick={() => EditApiKeyModalRef.current?.open(it)} color={600}><PencilSquareIcon className="w-5 h-5"/>&nbsp;Edit</Button>
                                <Button type="button" onClick={() => router.delete(route('account.security.access.api-keys.delete', { apiKey: it.label }), {
                                    onSuccess: () => {
                                        toast.success('Successfully removed ' + it.label)
                                    }
                                })} color={200} needsConfirmation><TrashIcon className="w-5 h-5"/>&nbsp;Delete</Button>
                            </RowItem>
                        </Row>
                    ))}
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
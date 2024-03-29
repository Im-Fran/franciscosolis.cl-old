import { useState, useRef } from 'react';
import { Link, router } from '@inertiajs/react';

import { ChevronLeftIcon, ChevronDoubleLeftIcon, ChevronRightIcon, ChevronDoubleRightIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import Modal from '@/js/Components/Modals/Modal';
import ModalIcon from '@/js/Components/Modals/ModalIcon';
import Button from '@/js/Components/Button';
import Label from "@/js/Components/Forms/Label";
import Input from "@/js/Components/Forms/Input";
export default function Pagination({ children, data, only = null, queryField = null, searchDisplay = null }) {

    const first = () => {
        if(data.last_page <= 3)
            return 1

        if(data.current_page === data.last_page) {
            return data.current_page - 2
        } else if((data.current_page - 1) > 1) {
            return data.current_page - 1
        } else {
            return 1
        }
    }
    const second = () => {
        if(data.last_page <= 3)
            return 2

        if(data.current_page === data.last_page) {
            return data.current_page - 1
        } else if (data.current_page > 2) {
            return data.current_page
        } else {
            return 2
        }
    }
    const third = () => {
        if(data.last_page <= 3)
            return 3

        if (data.current_page === data.last_page) {
            return Number.parseInt(data.current_page)
        } else if(data.current_page > 2) {
            return data.current_page + 1
        } else {
            return 3
        }
    }

    const items = () => [
        first(),
        second(),
        third(),
    ].map(item => ({
        url: data.links[item] ? data.links[item].url : '#',
        active: item === data.current_page,
        display: item,
    })).map(item => (
        <Link only={only || []} key={item.display} href={item.url} disabled={!item.active} className="flex items-center justify-center w-10 h-10 transition duration-300 hover:-translate-y-1 ">
            { item.display }
        </Link>
    ))

    const ModalRef = useRef(null);
    const [focusSearch, setFocusSearch] = useState(false);
    const onModalOpen = () => {
        setFocusSearch(true);
    }
    const onModalClose = () => {
        setFocusSearch(false);
    }

    const [currentSearch, setCurrentSearch] = useState((new URL(window.location.href)).searchParams.get(queryField) || '');
    const submitSearch = () => {
        router.reload({
            only: only || [],
            data: {
                [queryField]: currentSearch,
            },
            preserveScroll: false,
            onStart: () => {
                ModalRef.current?.close();
            },
            onError: () => {
                ModalRef.current?.open();
            },
            onSuccess: () => {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth',
                })
            }
        })
    }

    return (
        <div className="flex justify-center gap-6">
            {queryField && <div className="relative flex items-center justify-center w-10 h-10">
                <Modal ref={ModalRef} title={searchDisplay} onModalOpen={onModalOpen} onModalClose={onModalClose}>
                    <Modal.Icon>
                        <ModalIcon color="bg-blue-300 dark:bg-gray-600 text-white" icon={<MagnifyingGlassIcon className="w-6 h-6"/>}/>
                    </Modal.Icon>

                    <Modal.Body>
                        <form onSubmit={e => { e.preventDefault(); submitSearch();}} className="mt-5">
                            <Label value="Search" />

                            <Input
                                type="text"
                                value={currentSearch}
                                placeholder="Search..."
                                className="mt-1 block w-full"
                                isFocused={focusSearch}
                                handleChange={e => setCurrentSearch(e.target.value)}
                            />
                        </form>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button color={100} onClick={submitSearch}>Search</Button>
                        <Button color={200} onClick={() => ModalRef.current?.close()}>Cancel</Button>
                    </Modal.Footer>
                </Modal>
                <MagnifyingGlassIcon className={"absolute w-6 h-6 cursor-pointer transition duration-300 hover:-translate-y-1 " + (currentSearch?.length > 0 ? 'animate-bounce' : '')} onClick={() => ModalRef.current?.open()}/>
            </div>}

            <Link href={data.first_page_url} disabled={first() === 1} className="flex items-center justify-center w-10 h-10 transition duration-300 hover:-translate-y-1">
                <ChevronDoubleLeftIcon className="h-6 w-6"/>
            </Link>

            <Link href={data.prev_page_url} disabled={first() === 1} className="flex items-center justify-center w-10 h-10 transition duration-300 hover:-translate-y-1">
                <ChevronLeftIcon className="h-6 w-6"/>
            </Link>

            { items() }

            <Link href={data.next_page_url} disabled={third() === data.last_page} className="flex items-center justify-center w-10 h-10 transition duration-300 hover:-translate-y-1">
                <ChevronRightIcon className="h-6 w-6"/>
            </Link>

            <Link href={data.last_page_url} disabled={third() === data.last_page} className="flex items-center justify-center w-10 h-10 transition duration-300 hover:-translate-y-1">
                <ChevronDoubleRightIcon className="h-6 w-6"/>
            </Link>

            {children && <div className="relative flex items-center justify-center w-10 h-10">
                {children}
            </div>}
        </div>
    )
}

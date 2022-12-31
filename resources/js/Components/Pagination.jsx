import { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import { Link } from '@inertiajs/inertia-react'
import { handleChange } from '@/js/Utils/Utils';

import { ChevronLeftIcon, ChevronDoubleLeftIcon, ChevronRightIcon, ChevronDoubleRightIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import Modal from '@/js/Components/modals/Modal';
import ModalIcon from '@/js/Components/modals/ModalIcon';
import Button from '@/js/Components/Button';
import Label from "@/js/Components/Forms/Label";
import Input from "@/js/Components/Forms/Input";
import InputError from "@/js/Components/Forms/InputError";
export default function Pagination({ children, data, only = null, queryField = null, searchDisplay = null }) {

    const first = () => {
        if(data.last_page <= 3)
            return 1

        if(data.current_page == data.last_page) {
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

        if(data.current_page == data.last_page) {
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

        if (data.current_page == data.last_page) {
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
        active: item == data.current_page,
        display: item,
    })).map(item => (
        <Link only={only || []} key={item.display} href={item.url} disabled={!item.active} className="flex items-center justify-center w-10 h-10 ">
            { item.display }
        </Link>
    ))

    const [show, setShow] = useState(false);
    const toggleShow = () => setShow((prev) => !prev);

    const [currentSearch, setCurrentSearch] = useState((new URL(window.location.href)).searchParams.get(queryField) || '');
    const submitSearch = () => {
        Inertia.reload({
            only: only || [],
            data: {
                [queryField]: currentSearch,
            },
            preserveScroll: false,
            onStart: () => {
                setShow(false)
            },
        })
    }

    return (
        <div className="flex justify-center gap-6">
            {queryField && <div className="relative flex items-center justify-center w-10 h-10">
                <Modal title={searchDisplay} show={show} toggleShow={toggleShow}>
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
                                isFocused={true}
                                handleChange={e => setCurrentSearch(e.target.value)}
                            />
                        </form>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button color={100} onClick={submitSearch}>Search</Button>
                        <Button color={200} onClick={toggleShow}>Cancel</Button>
                    </Modal.Footer>
                </Modal>
                <MagnifyingGlassIcon className="absolute w-6 h-6 cursor-pointer" onClick={toggleShow}/>
            </div>}

            <Link href={data.first_page_url} disabled={first() == 1} className="flex items-center justify-center w-10 h-10 ">
                <ChevronDoubleLeftIcon className="h-6 w-6"/>
            </Link>

            <Link href={data.prev_page_url} disabled={first() == 1} className="flex items-center justify-center w-10 h-10 ">
                <ChevronLeftIcon className="h-6 w-6"/>
            </Link>

            { items() }

            <Link href={data.next_page_url} disabled={third() == data.last_page} className="flex items-center justify-center w-10 h-10 ">
                <ChevronRightIcon className="h-6 w-6"/>
            </Link>

            <Link href={data.last_page_url} disabled={third() == data.last_page} className="flex items-center justify-center w-10 h-10 ">
                <ChevronDoubleRightIcon className="h-6 w-6"/>
            </Link>

            {children && <div className="relative flex items-center justify-center w-10 h-10">
                {children}
            </div>}
        </div>
    )
}

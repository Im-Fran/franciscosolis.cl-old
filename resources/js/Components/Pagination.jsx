import { Link } from '@inertiajs/inertia-react'

import { ChevronLeftIcon, ChevronDoubleLeftIcon, ChevronRightIcon, ChevronDoubleRightIcon } from '@heroicons/react/24/outline';

export default function Pagination({ data, only = null }) {

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
        <Link only={only} key={item.display} href={item.url} disabled={!item.active} className="flex items-center justify-center w-10 h-10 ">
            { item.display }
        </Link>
    ))


    return (
        <div className="flex justify-center gap-6">

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
        </div>
    )
}

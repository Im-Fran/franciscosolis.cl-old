import {useEffect, useState} from "react";
import {router} from "@inertiajs/react";

import { ChevronUpIcon, ChevronDownIcon, ChevronUpDownIcon } from "@heroicons/react/24/outline";

export default function Column({ children, content, className = '', sort = null, only = null }) {
    const [orderBy, setOrderBy] = useState(null)
    const [order, setOrder] = useState(null)

    useEffect(() => {
        if (sort) {
            const url = new URL(window.location.href)
            setOrderBy(url.searchParams.get('orderBy'))
            setOrder(url.searchParams.get('order'))
        }
    }, [sort, window.location.search])

    const toggleSort = () => {
        const url = new URL(window.location.href)
        const newSort = orderBy === 'asc' ? 'desc' : 'asc'
        url.searchParams.set('order', sort)
        url.searchParams.set('orderBy', newSort)
        setOrderBy(newSort)
        router.visit(url.toString(), {
            preserveScroll: true,
            preserveState: true,
            only: only || []
        })
    }

    return (
        <th className={"py-2 px-6 sticky z-20 top-0 border-b border-gray-200 bg-gray-100 dark:bg-zinc-800 " + className}>
            <div className="flex items-center gap-2">
                { content || children || '' }
                {sort && <button onClick={toggleSort} className="flex flex-row items-center gap-2">
                    {sort !== order && <ChevronUpDownIcon className="w-5 h-5 text-gray-400"/>}
                    {orderBy === 'asc' && sort === order && <ChevronUpIcon className="w-5 h-5 text-brand-100"/>}
                    {orderBy === 'desc' && sort === order && <ChevronDownIcon className="w-5 h-5 text-brand-100"/>}
                </button>}
            </div>
        </th>
    )
}

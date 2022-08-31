import React from 'react'
import { Link } from '@inertiajs/inertia-react'

const anchorLinks = ['mailto'];

export default function({ href, children, className }) {
    if(anchorLinks.filter(it => href.startsWith(it)).length > 0) {
        return (<a href={href} className="link link-underline link-underline-white">{children}</a>);
    } else {
        return (<Link href={href} className="link link-underline link-underline-white">{children}</Link>);
    }
}
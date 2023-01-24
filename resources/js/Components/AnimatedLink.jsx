import { Link } from '@inertiajs/react'

export default function({ href, children, className }) {
    const anchorLinks = ['mailto'];

    if(anchorLinks.filter(it => href.startsWith(it)).length > 0) {
        return (<a href={href} className={"link link-underline link-underline-white " + className}>{children}</a>);
    } else {
        return (<Link href={href} className={"link link-underline link-underline-white " + className}>{children}</Link>);
    }
}

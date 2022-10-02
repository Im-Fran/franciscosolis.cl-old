import { Link } from '@inertiajs/inertia-react'

export default function({ href, children, className }) {
    const anchorLinks = ['mailto'];

    if(anchorLinks.filter(it => href.startsWith(it)).length > 0) {
        return (<a href={href} className="link link-underline link-underline-white">{children}</a>);
    } else {
        return (<Link href={href} className="link link-underline link-underline-white">{children}</Link>);
    }
}

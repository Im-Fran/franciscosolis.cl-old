import { Component as ReactComponent } from 'react'

function Links() {
    return null;
}

function Content() {
    return null;
}

class Sidebar extends ReactComponent {
    static Links = Links;
    static Content = Content;

    render() {
        const { children, className } = this.props;
        const links = children.find(child => child.type === Links);
        const content = children.find(child => child.type === Content);

        return (
            <div className={"md:grid md:grid-cols-6 md:gap-3 w-full " + className}>
                <div className="w-full col-span-1">
                    <ul className="list-disc list-inside">
                        {links ? links.props.children : null}
                    </ul>
                </div>
                <div className="w-full col-span-4 md:ml-5">
                    {content ? content.props.children : null}
                </div>
            </div>
        );
    }
}

export default Sidebar;

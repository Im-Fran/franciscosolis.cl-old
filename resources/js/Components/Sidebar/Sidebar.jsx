import { Component as ReactComponent } from 'react'

const Links = () => null
const Content = () => null

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
                        {links ? links.props.children : <></>}
                    </ul>
                </div>
                <div className="w-full col-span-5 md:ml-5">
                    {content ? content.props.children : <></>}
                </div>
            </div>
        );
    }
}

export default Sidebar;

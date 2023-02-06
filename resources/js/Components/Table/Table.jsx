import {Component as ReactComponent} from 'react'

function Columns() {
    return null;
}

function Rows() {
    return null;
}

function Pagination() {
    return null;
}

class Table extends ReactComponent {
    static Columns = Columns;
    static Rows = Rows;
    static Pagination = Pagination;

    render() {
        const {children, className = ''} = this.props;
        const columns = children.find(child => child.type === Columns);
        const rows = children.find(child => child.type === Rows);
        const pagination = children.find(child => child.type === Pagination);

        return (
            <div className="flex flex-col gap-6 w-full">
                <div className="flex flex-col w-full overflow-scroll scroll-smooth">
                    <table className={"border-collapse table-auto w-full whitespace-no-wrap bg-white dark:bg-brand-500 table-striped relative " + className}>
                        <thead>
                            <tr className="text-left">{columns ? columns.props.children : <></>}</tr>
                        </thead>
                        <tbody>
                            {rows ? rows.props.children : <></>}
                        </tbody>
                    </table>
                </div>
                {pagination ? <div className={"flex flex-col w-full" + (pagination.props.position === 'left' ? 'items-start' : (pagination.props.position === 'right' ? 'items-end' : 'items-center'))}>{pagination.props.children}</div> : <></>}
            </div>
        );
    }
}

export default Table;

import App from '@/Layouts/App';
import { Link } from '@inertiajs/inertia-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Error({ errors, exception, data }){

    console.log(data, exception, errors);

    return (
        <App title="Error" vertical="center" horizontal="center">
            <div className="flex flex-col items-center text-center">
                <h1 className="text-brand-100 font-bold text-8xl">O.o</h1>
                <h1 className="text-brand-100 text-2xl mt-10">Error { data.code }</h1>
                <span className="text-md text-brand-500 dark:text-brand-600 mt-2">{ data.message }</span>
                <span className="text-brand-500 dark:text-brand-600 mb-5">If you think this error is unexpected please try again later, or join <a href="https://go.theprogramsrc.xyz/discord" target="_blank" className="text-brand-100">our discord</a> and create a ticket.</span>
                <Link className="p-2 bg-brand-100 rounded-full text-white flex items-center" href={route('home')}><FontAwesomeIcon icon="fa-arrow-left"/>&nbsp;Go Home</Link>
                <span className="mt-20 text-brand-500 dark:text-brand-600">Host: { data.host } - Time: { data.timestamp }</span>
            </div>
        </App>
    );
}

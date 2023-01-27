import {handleImageSize} from "@/js/Utils/Utils";
import {useEffect, useState} from "react";
import dayjs from "dayjs";

export default function ({ id = null, user, sizeClass = 'h-8 w-8', size = 32, statusClassSize = 'w-2 h-2', showStatus = true, className = '', imageClassName = '' }) {

    const [online, setOnline] = useState(user.is_online);

    useEffect(() => {
        const interval = setInterval(() => {
            setOnline(dayjs().diff(dayjs(user.last_activity_at), 'minute') < 5);
        });

        return () => clearInterval(interval);
    }, [user, online])

    return <div className={"relative " + sizeClass + ' ' + className}>
        {showStatus && online && <span className={"absolute top-0 left-0 " + statusClassSize}>
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75"></span>
            <span className={"absolute inline-flex rounded-full bg-brand-400 " + statusClassSize}></span>
        </span>}
        <img id={id} className={"rounded-full border-2 border-white object-cover " + imageClassName + ' ' + sizeClass} src={handleImageSize(user.profile_photo_url, size)} alt={user.name + '\'s Profile Picture'} loading="lazy" />
    </div>;
}

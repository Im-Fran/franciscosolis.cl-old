import {handleImageSize} from "@/js/Utils/Utils";
import {useEffect, useState} from "react";

export default function ({ id = null, user, sizeClass = 'h-8 w-8', size = 32, statusClassSize = 'w-2 h-2', showStatus = true, className = '', imageClassName = '' }) {
    const [lastPing, setLastPing] = useState(user.last_activity_at)

    useEffect(() => {
        const channel = window.Echo?.private(`UserActivity.${user.slug}`).listen('.users.activityping', (e) => {
            setLastPing(e.last_activity_at)
        })

        return () => {
            channel?.stopListening('.users.activityping')
            window.Echo?.leave(`UserActivity.${user.slug}`)
        }
    }, [user, lastPing])

    return <div className={"relative " + sizeClass + ' ' + className}>
        {showStatus && lastPing && dayjs().diff(dayjs(lastPing), 'minute') < 5 && <span className={"absolute top-0 left-0 " + statusClassSize}>
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75"></span>
            <span className={"absolute inline-flex rounded-full bg-brand-400 " + statusClassSize}></span>
        </span>}
        <img id={id} className={"rounded-full border-2 border-white object-cover " + imageClassName + ' ' + sizeClass} src={handleImageSize(user.profile_photo_url, size)} alt={user.name + '\'s Profile Picture'} loading="lazy" />
    </div>;
}

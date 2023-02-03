import {handleImageSize} from "@/js/Utils/Utils";
import {useEffect, useState} from "react";
import dayjs from 'dayjs'

export default function ({ id = null, user, sizeClass = 'h-8 w-8', size = 32, statusClassSize = 'w-2 h-2', showStatus = true, className = '', imageClassName = '' }) {
    const [lastPing, setLastPing] = useState(user.last_activity_at ? dayjs(user.last_activity_at) : null)
    const [online, setOnline] = useState(false)

    useEffect(() => {
        const channel = window.Echo?.private(`UserActivity.${user.slug}`).listen('.users.activityping', (e) => {
            setLastPing(dayjs(e.last_activity_at))
        })

        return () => {
            channel?.stopListening('.users.activityping')
            window.Echo?.leave(`UserActivity.${user.slug}`)
        }
    }, [user])

    useEffect(() => {
        const updateStatus = () => {
            if(lastPing){
                setOnline(dayjs().diff(lastPing, 'minute') < 5)
            } else if(user.last_activity_at) {
                setOnline(dayjs().diff(dayjs(user.last_activity_at), 'minute') < 5)
            } else {
                setOnline(false)
            }
        }

        const interval = setInterval(updateStatus, 15000);
        setTimeout(updateStatus, 500)

        return () => clearInterval(interval);
    }, [lastPing])

    return <div className={"relative " + sizeClass + ' ' + className}>
        {showStatus && <span className={(online ? 'opacity-100' : 'opacity-0') + " transition duration-300 ease-in-out absolute " + statusClassSize}>
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75"></span>
            <span className={"absolute inline-flex rounded-full bg-brand-400 " + statusClassSize}></span>
        </span>}
        <img id={id} className={"rounded-full border-2 border-white object-cover " + imageClassName + ' ' + sizeClass} src={handleImageSize(user.profile_photo_url, size)} alt={user.name + '\'s Profile Picture'} loading="lazy" />
    </div>;
}

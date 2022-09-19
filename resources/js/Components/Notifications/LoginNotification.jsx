import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function LoginNotification({ notification }) {
    const data = notification.data
    return (
        <div>
            <FontAwesomeIcon icon="fas fa-desktop"/>
            <span className="ml-2">New login from IP <b>{data.ip}</b>. Location: <b>{ data.location }</b>. Device: <b>{ data.device }</b></span>
        </div>
    );
}

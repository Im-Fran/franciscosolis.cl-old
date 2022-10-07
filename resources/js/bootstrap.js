/* Load lodash */
import _ from 'lodash';
window._ = _;

/* Load XSRF Token */
import axios from 'axios';
window.axios = axios;

window.axios.defaults.withCredentials = import.meta.env.VITE_APP_ENV === 'production';
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
let token = document.head.querySelector('meta[name="csrf-token"]');
if (token) {
    window.axios.defaults.headers.common['X-CSRF-TOKEN'] = document.head.querySelector('meta[name="csrf-token"]').content;
} else {
    console.error('CSRF token not found: https://laravel.com/docs/csrf#csrf-x-csrf-token');
}

/* Load WebSocket */
import Echo from 'laravel-echo'
try {
    let host = window.location.origin + ':' + window.websocket_port;
    axios.get(host).then(() => {
        window.Echo = new Echo({
            broadcaster: 'socket.io',
            host: host,
        })
    }).catch(err => {
        console.error('WebSocket is down! If you think this is a mistake, please contact the administrator.', err);
    })
}catch(e){}

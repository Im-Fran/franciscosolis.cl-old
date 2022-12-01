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
    window.axios.defaults.headers.common['X-CSRF-TOKEN'] = token.content;
} else {
    console.error('CSRF token not found: https://laravel.com/docs/csrf#csrf-x-csrf-token');
}

/* Load WebSocket */
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';
window.pusher = Pusher;

try {
    window.Echo = new Echo({
        broadcaster: 'pusher',
        authEndpoint: '/broadcasting/auth',
        key: import.meta.env.VITE_PUSHER_APP_KEY,
        wsHost: import.meta.env.VITE_PUSHER_HOST,
        wsPort: import.meta.env.VITE_PUSHER_PORT,
        wssPort: import.meta.env.VITE_PUSHER_PORT,
        forceTLS: import.meta.env.VITE_PUSHER_SCHEME === 'https',
        disableStats: true,
        enabledTransports: ['ws', 'wss'],
        encrypted: true,
    });
}catch(e){}

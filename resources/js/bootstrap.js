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

import toast from 'react-hot-toast';

/* Clipboard helper */
document.addEventListener('click', e => {
    // check if element has attribute data-clipboard
    if (e.target.hasAttribute('data-clipboard')) {
        const text = e.target.getAttribute('data-clipboard');
        if(navigator.clipboard) {
            navigator.clipboard.writeText(text);
        } else {
            const input = document.createElement('input');
            input.value = text;
            input.readOnly = true;
            document.body.appendChild(input);
            input.select();
            document.execCommand('copy');
            input.remove();
        }
        toast.success('Copied to clipboard!');
    }
})

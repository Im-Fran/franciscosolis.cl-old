/* Load XSRF Token */
import axios from 'axios';
window.axios = axios;

window.axios.defaults.withCredentials = import.meta.env.VITE_APP_ENV === 'production';
window.axios.defaults.headers.common['X-CSRF-TOKEN'] = window.csrf_token;

/* Load WebSocket */
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';

try {
    window.Echo = new Echo({
        broadcaster: 'pusher',
        authEndpoint: '/broadcasting/auth',
        key: import.meta.env.VITE_PUSHER_APP_KEY,
        wsHost: import.meta.env.VITE_PUSHER_HOST,
        wsPort: import.meta.env.VITE_PUSHER_SOKETI_PORT,
        wssPort: import.meta.env.VITE_PUSHER_SOKETI_PORT,
        forceTLS: import.meta.env.VITE_PUSHER_SCHEME === 'https',
        disableStats: true,
        enabledTransports: ['ws', 'wss'],
        encrypted: import.meta.env.VITE_PUSHER_ENCRYPTED === 'true',
        cluster: import.meta.env.VITE_PUSHER_APP_CLUSTER,
    });
    window.pusher = Pusher.instances.length ? Pusher.instances[0] : null;

    window.Echo?.listen('UserActivity', '.heartbeat', (e) => {
        // Push the event to the whole app
        window.dispatchEvent(new CustomEvent('userActivity', { detail: e }));
    });
}catch(e){
    console.error('Failed to connect to Server WebSocket!', e);
}

import toast from 'react-hot-toast';

/* Clipboard helper */
document.addEventListener('click', e => {
    // check if element has attribute data-clipboard
    if (e.target.hasAttribute('data-clipboard')) {
        const text = e.target.getAttribute('data-clipboard');
        window.dispatchEvent(new CustomEvent('clipboard-copy', { detail: { text } }));
    }
})

window.addEventListener('clipboard-copy', e => {
    const text = e.detail.text;
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
    toast.success('Copied to clipboard!\nNew clipboard contents:\n'+text, {
        duration: 7000,
    });
})

/* Markdown */
import MarkdownIt from 'markdown-it';

window.markdown = new MarkdownIt();

/* Token Updater */
document.addEventListener('csrf-update', e => {
    window.csrf_token = e.detail.token;
    window.axios.defaults.headers.common['X-CSRF-TOKEN'] = window.csrf_token;
    document.head.querySelector('meta[name="csrf-token"]').setAttribute('content', window.csrf_token);
    document.querySelectorAll('input[name="_token"]').forEach(el => el?.setAttribute('value', window.csrf_token));

    // Now we update every form
    document.querySelectorAll('form').forEach(form => {
        // Now we check that there are no input with the name '_token' to avoid duplicates
        if(!form.querySelector('input[name="_token"]')) {
            const input = document.createElement('input');
            input.hidden = true
            input.type = 'text'
            input.name = '_token';
            input.setAttribute('value', window.csrf_token)
            console.log(input)
            form.appendChild(input);
        }
    });
})
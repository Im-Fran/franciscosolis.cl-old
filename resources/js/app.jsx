import '@/js/bootstrap';
import '@/js/Utils/Styles'

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import isToday from 'dayjs/plugin/isToday';
import isFuture from '@/js/Utils/dayjs/isFuture';

import { createRoot } from 'react-dom/client';

import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';

dayjs.extend(relativeTime);
dayjs.extend(isToday);
dayjs.extend(isFuture);

createInertiaApp({
    title: (title) => `${title} | FranciscoSolis`,
    progress: {
        color: '#4B5563',
        showSpinner: true,
    },
    resolve: (name) => resolvePageComponent(`./Pages/${name}.jsx`, import.meta.glob(['./Pages/**/*.jsx', '../images/**'])),
    setup: ({el, App, props}) => createRoot(el).render(<App {...props} />),
}).then(() => {
    window.dayjs = dayjs
});

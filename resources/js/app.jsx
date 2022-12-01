import './bootstrap';
import '@/css/app.css';

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import isToday from 'dayjs/plugin/isToday';
import isFuture from './Utils/dayjs/isFuture';

import { createRoot } from 'react-dom/client';

import { createInertiaApp } from '@inertiajs/inertia-react';
import { InertiaProgress } from '@inertiajs/progress';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import PersistentLayout from '@/js/Layouts/PersistentLayout'

dayjs.extend(relativeTime);
dayjs.extend(isToday);
dayjs.extend(isFuture);

createInertiaApp({
    title: (title) => `${title} | FranciscoSolis`,
    resolve: (name) => {
        const page = resolvePageComponent(`./Pages/${name}.jsx`, import.meta.glob(['./Pages/**/*.jsx', '../images/**']))
        page.layout = PersistentLayout
        return page
    },
    setup({ el, App, props }) {
        const root = createRoot(el);
        return root.render(<App {...props} />);
    },
});

InertiaProgress.init({ color: '#4B5563' });

import './bootstrap';
import '@/css/app.css';

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import isToday from 'dayjs/plugin/isToday';
import isFuture from './Utils/dayjs/isFuture';

import { createRoot } from 'react-dom/client';

import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';

import { createInertiaApp } from '@inertiajs/inertia-react';
import { InertiaProgress } from '@inertiajs/progress';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';

dayjs.extend(relativeTime);
dayjs.extend(isToday);
dayjs.extend(isFuture);
library.add(fas, far);

createInertiaApp({
    title: (title) => `${title} | FranciscoSolis`,
    resolve: (name) => resolvePageComponent(`./Pages/${name}.jsx`, import.meta.glob(['./Pages/**/*.jsx', '../images/**'])),
    setup({ el, App, props }) {
        const root = createRoot(el);
        return root.render(<App {...props} />);
    },
});

InertiaProgress.init({ color: '#4B5563' });

import './bootstrap';
import '../css/app.css';

import React from 'react';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { render } from 'react-dom';
import { createInertiaApp } from '@inertiajs/inertia-react';
import { InertiaProgress } from '@inertiajs/progress';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';

library.add(fas, far);

createInertiaApp({
    title: (title) => `${title} | FranciscoSolis`,
    resolve: (name) => resolvePageComponent(`./Pages/${name}.jsx`, import.meta.glob(['./Pages/**/*.jsx', '../images/**'])),
    setup({ el, App, props }) {
        return render(<App {...props} />, el);
    },
});

InertiaProgress.init({ color: '#4B5563' });

import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';
import reactSvgPlugin from 'vite-plugin-react-svg';
import { resolve } from "path";

export default defineConfig({
    server: {
        host: 'localhost',
        port: 3000,
    },
    resolve: {
        alias: {
            '@': resolve(__dirname, 'resources/'),
            '$': resolve(__dirname, 'resources/images'),
        },
    },
    plugins: [
        laravel({
            input: 'resources/js/app.jsx',
            refresh: true,
        }),
        react(),
        reactSvgPlugin({
            defaultExport: 'url',
            titleProp: true,
        }),
    ],
    build: {
        input: {
            app: 'resources/js/app.jsx',
        },
        rollupOptions: {
            output: {
                manualChunks: {
                    'fsolis/react': ['react'],
                    'fsolis/react-dom': ['react-dom'],
                    'fsolis/http-requests': [
                        'axios',
                        '@inertiajs/inertia',
                        '@inertiajs/inertia-react',
                        '@inertiajs/progress'
                    ],
                    'fsolis/ui': [
                        'autoprefixer',
                        'tailwindcss',
                        '@tailwindcss/forms',
                        '@headlessui/react',
                        'react-click-away-listener',
                        'react-hot-toast',
                    ],
                    'fsolis/utils': [
                        'lodash',
                    ],
                    'fsolis/websocket': [
                        'socket.io-client',
                        'laravel-echo',
                    ],
                },
            },
        },
    },
});

import { defineConfig, loadEnv, splitVendorChunkPlugin } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';
import reactSvgPlugin from 'vite-plugin-react-svg';
import { resolve } from "path";

export default defineConfig(({ command, mode }) => {
    const env = loadEnv(mode, process.cwd(), '');
    const host = env.APP_HOST;

    return {
        server: {
            host,
            hmr: { host },
        },
        resolve: {
            alias: {
                '@': resolve(__dirname, 'resources/'),
                '$': resolve(__dirname, 'resources/images'),
            },
        },
        plugins: [
            splitVendorChunkPlugin(),
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
                        'fsolis/react': ['react', 'react-dom'],
                        'fsolis/inertia': ['@inertiajs/react'],
                        'fsolis/http-requests': [
                            'axios',
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
    };
});

import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';
import { resolve } from "path";

export default defineConfig({
    server: {
        host: 'franciscosolis.test',
        port: 3000,

    },
    resolve: {
        alias: {
            '~': resolve(__dirname, 'resources'),
            '@': resolve(__dirname, 'resources/js'),
            '$': resolve(__dirname, 'resources/images'),
        },
    },
    plugins: [
        laravel({
            input: 'resources/js/app.jsx',
            refresh: true,
        }),
        react(),
    ],
});

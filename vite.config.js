import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';
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
    ],
    build: {
        rollupOptions: {
            input: {
                app: 'resources/js/app.jsx',
            },
            output: {
                entryFileNames: '[name].js',
                chunkFileNames: '[name].js',
                assetFileNames: '[name].[ext]'
            }
        },
    },
});

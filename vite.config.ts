import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            '@': '/src', // Alias for src folder
        },
    },
    build: {
        outDir: 'dist',
        assetsInlineLimit: 0, // Ensures Vite serves assets properly
    },
    base: '/valentines-day-game/',
});

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { VitePWA } from 'vite-plugin-pwa';
export default defineConfig({ plugins: [react(), tailwindcss(), VitePWA({ registerType: 'autoUpdate', includeAssets: ['favicon.svg'], manifest: { name: 'Life Filtration Product Showroom', short_name: 'Life Filtration', description: 'Interactive water filtration product showroom', theme_color: '#f8fbfa', background_color: '#f8fbfa', display: 'standalone', orientation: 'landscape', start_url: '/', icons: [{ src: '/favicon.svg', sizes: 'any', type: 'image/svg+xml', purpose: 'any maskable' }] }, workbox: { navigateFallback: '/index.html', globPatterns: ['**/*.{js,css,html,svg,png,webp,jpg,json}'] } })], server: { host: '0.0.0.0' } });

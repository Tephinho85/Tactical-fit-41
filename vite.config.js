import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// OBS: Se você manteve o @tailwindcss/vite instalado antes, basta descomentar a linha abaixo e adicionar tailwindcss() dentro de plugins:
// import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: 'auto',
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,json}'],
        cleanupOutdatedCaches: true
      },
      manifest: {
        name: 'Tactical Fit 41+ | Coach Pro',
        short_name: 'TacticalFit',
        description: 'Treino 45m, TAF Policial, Blindagem Articular e Dieta SII',
        theme_color: '#020617',
        background_color: '#020617',
        display: 'standalone',
        orientation: 'portrait',
        start_url: '/',
        icons: [
          {
            src: '/icon.svg',
            sizes: 'any',
            type: 'image/svg+xml',
            purpose: 'any maskable'
          }
        ]
      }
    })
  ]
})
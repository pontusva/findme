/// <reference types="vitest" />
import { VitePWA } from 'vite-plugin-pwa'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import fs from 'fs'

// https://vitejs.dev/config/
export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './tests/setup.ts',
    coverage: {
      reporter: ['text', 'json', 'html'],
      include: ['src/**/*.{ts,tsx}'],
      reportsDirectory: './tests/unit/coverage'
    }
  },
  plugins: [
    react(),
    VitePWA({
      strategies: 'injectManifest',
      registerType: 'autoUpdate',
      injectRegister: 'auto',
      manifest: {
        name: 'FindMyPet',
        short_name: 'FindMyPet',
        theme_color: '#ffffff',
        icons: [
          {
            src: '/undraw_walk_dreaming_u-58-a.svg',
            sizes: '512x512',
            type: 'image/svg+xml',
            purpose: 'any maskable'
          },
          {
            src: '/manifest-icon-192.maskable.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any maskable'
          },
          {
            src: '/manifest-icon-512.maskable.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ],
        start_url: '/',
        display: 'standalone',
        background_color: '#ffffff',
        description: 'An app to help find lost pets',
        categories: ['utilities'],
        orientation: 'any'
      },
      includeAssets: [
        'favicon.ico',
        'apple-touch-icon.png',
        'masked-icon.svg'
      ],
      devOptions: {
        enabled: true
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}']
      }
    })
  ],

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },

  build: {
    rollupOptions: {
      input: {
        main: './index.html'
      }
    }
  },

  server: {
    port: 5173,
    strictPort: true,
    host: true,
    proxy: {
      '/graphql': {
        target: 'http://localhost:3000', // Replace with your backend URL
        changeOrigin: true,
        secure: false
        // Optionally remove /api from the URL when forwarding to backend
        // rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
})

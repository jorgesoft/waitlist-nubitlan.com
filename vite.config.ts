import path from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

import { seoPrerender } from './vite/seo-prerender'
import { emailSecurityDevApi } from './vite/email-security-dev'
import { solicitudDevApi } from './vite/solicitud-dev'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), emailSecurityDevApi(), solicitudDevApi(), seoPrerender()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})

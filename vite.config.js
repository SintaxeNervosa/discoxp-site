import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          api: ['./src/connection/apiService.js', './src/config/axiosConfig.js'],
        },
      },
    },
    chunkSizeWarningLimit: 600,
  },
})
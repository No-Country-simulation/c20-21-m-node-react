// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000',  // Asegúrate de que este puerto sea el correcto
        changeOrigin: true,
        secure: false,
      },
    },
  },
});

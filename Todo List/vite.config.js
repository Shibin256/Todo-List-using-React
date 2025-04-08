import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server:{
    proxy:{
      '/local':{
      target: 'http://localhost:1012',  // Your backend URL
      changeOrigin: true,
      secure: false,
      rewrite: (path) => path.replace(/^\/local/, ''),
    }
    },
    port:2121
  },
  
})

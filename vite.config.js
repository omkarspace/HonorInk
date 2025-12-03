import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
<<<<<<< HEAD
import { fileURLToPath, URL } from 'node:url'
=======
>>>>>>> e501412cee8a8d731fef59835af1ee644c96d280

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
<<<<<<< HEAD
  resolve: {
    alias: {
      "@": fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
=======
>>>>>>> e501412cee8a8d731fef59835af1ee644c96d280
})

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ command, mode }) => {
  return {
    // vite config
    plugins: [react()],
    define: {
      APP_VERSION: JSON.stringify("1.0.0")
    },
  }
})
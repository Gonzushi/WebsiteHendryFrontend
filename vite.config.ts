import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  // server: {
  //   proxy: {
  //     '/api': {target:'https://api.hendrywidyanto.com',
  //     '/api': {target: 'http://127.0.0.1:8000',
  //     '/api': {target: 'http://localhost:7071',
  //     changeOrigin: true,
  //     secure: false,
  //     rewrite: (path) => path.replace(/^\/api/, ""),
  //   }
  //   }
  // },
  plugins: [react()],
})

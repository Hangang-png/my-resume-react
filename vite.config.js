import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/my-resume-react/',  // 替换成你的GitHub仓库名，注意前后斜杠
  plugins: [react()],
})

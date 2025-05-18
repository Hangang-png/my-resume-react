// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/my-resume-react/', // 必须加上你的 GitHub 仓库名
  plugins: [react()],
})

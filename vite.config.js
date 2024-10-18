import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';  // 导入 path 模块

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        // 手动拆分 Redux 和 Ant Design 依赖
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('antd')) {
              return 'antd-vendor'; // Ant Design 相关
            }
            return 'vendor'; // 其他第三方库
          }
        },
      },
    },
    chunkSizeWarningLimit: 500, // 调整警告阈值
  },
  server: {
    host: '0.0.0.0',  // 允许局域网访问
    port: 3001,        // 设置端口为 3000（你可以修改为任何想要的端口）
  },
    resolve: {
  alias: {
    '@': path.resolve(__dirname, 'src'),  // 设置 '@' 指向 'src' 目录
  },
},

})

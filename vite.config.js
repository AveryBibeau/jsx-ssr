import { defineConfig } from 'vite'
import path from 'path'
import checker from 'vite-plugin-checker'

const devPlugins = [checker({ typescript: true })]

export default defineConfig(({ mode, command }) => {
  const isDev = mode === 'development'
  const isServer = process.env.VITE_BUILD === 'ssr'
  return {
    build: {
      target: 'es2020',
      polyfillModulePreload: false,
      sourcemap: isServer,
    },
    server: {
      watch: { usePolling: true },
    },
    resolve: {
      alias: {
        '##': path.resolve(__dirname, './src'),
      },
    },
    plugins: [...(isDev ? devPlugins : [])],
  }
})

import { visualizer } from 'rollup-plugin-visualizer';
import { defineConfig } from 'vite';
export default defineConfig({
    build: {
        target: 'esnext'
    },
    plugins: [
        visualizer({
            gzipSize: true,
            brotliSize: true
        })
    ]
})
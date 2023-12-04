import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: {
			test: '/src/test/',
			containers: '/src/containers',
			pages: '/src/pages/',
			components: '/src/components',
			providers: '/src/providers',
			assets: '/src/assets',
			config: '/src/core/config',
			constants: '/src/core/constants',
			hooks: '/src/core/hooks',
			models: '/src/core/models',
			services: '/src/core/services',
			store: '/src/core/store',
			utils: '/src/core/utils',
			core: '/src/core',
		},
	},
})

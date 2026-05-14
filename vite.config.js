import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vitest/config'
import dts from 'vite-plugin-dts'

import pkg from './package.json' with { type: 'json' }

export default defineConfig({
	plugins: [
		dts({ rollupTypes: true }),
	],

	build: {
		lib: {
			entry: fileURLToPath(new URL('./src/ColorPicker.ts', import.meta.url)),
			fileName: 'ColorPicker',
			formats: ['es'],
		},
		rolldownOptions: {
			// Prevents bundling peer dependencies.
			external: Object.keys(pkg.peerDependencies),
		},
	},

	test: {
		environment: 'jsdom',
		coverage: {
			include: ['src'],
		},
	},
})

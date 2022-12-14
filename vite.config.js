/// <reference types="vitest" />

import { defineConfig } from 'vite'

export default defineConfig({
	test: {
		environment: 'jsdom',

		// Disables threads because they cause Node to run using workers which break JSDom’s usage of canvas which prevents me from running more than one test at a time.
		// Bug report: https://github.com/vitest-dev/vitest/issues/740
		threads: false,
	},
})

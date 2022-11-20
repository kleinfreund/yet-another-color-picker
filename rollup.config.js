import { defineConfig } from 'rollup'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import terser from '@rollup/plugin-terser'

/*
postcss options:
https://github.com/egoist/rollup-plugin-postcss#options

terser options:
https://github.com/rollup/plugins/tree/master/packages/terser#options
*/

export default defineConfig({
	input: 'src/ColorPicker.js',
	output: {
		dir: 'dist',
	},
	plugins: [
		// Resolves external dependencies (i.e. lit-html).
		nodeResolve(),
		// Minifies JavaScript.
		terser({
			output: {
				comments: false,
				ecma: 2020,
			},
		}),
	],
})

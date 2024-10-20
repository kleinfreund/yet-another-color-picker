import { defineConfig } from 'tsup'

// https://tsup.egoist.dev
export default defineConfig({
	entry: {
		ColorPicker: 'src/ColorPicker.ts',
	},
	format: 'esm',
	dts: true,
	clean: true,
	minify: true,
	terserOptions: {
		output: {
			comments: false,
			ecma: 2020,
		},
	},
})

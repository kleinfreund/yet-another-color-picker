import { defineConfig } from 'tsup'

// https://tsup.egoist.dev
export default defineConfig({
	entry: {
		ColorPicker: 'src/ColorPicker.ts',
	},
	format: 'esm',
	target: 'es2022',
	dts: true,
	clean: true,
	minify: true,
	terserOptions: {
		output: {
			comments: false,
			ecma: 2020,
		},
	},
	noExternal: ['lit-html'],
})

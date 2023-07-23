import { describe, test, expect } from 'vitest'

import { formatAsCssColor } from './formatAsCssColor.js'
import {
	ColorPairHex,
	ColorPairHsl,
	ColorPairHwb,
	ColorPairRgb,
} from '../ColorPicker.js'

describe('formatAsCssColor', () => {
	test.each([
		[{ color: '#fff', format: 'hex' }, false, '#fff'],
		[{ color: '#FFF', format: 'hex' }, false, '#FFF'],
		[{ color: '#000', format: 'hex' }, false, '#000'],
		[{ color: '#000000', format: 'hex' }, false, '#000000'],
		[{ color: '#000000aa', format: 'hex' }, false, '#000000aa'],
		[{ color: '#000000aa', format: 'hex' }, true, '#000000'],
		[{ color: '#112233', format: 'hex' }, true, '#112233'],
		[{ color: '#123a', format: 'hex' }, true, '#123'],
		[{ color: '#123', format: 'hex' }, true, '#123'],
	] as [ColorPairHex, boolean, string][])('works for HEX colors', (pair, excludeAlphaChannel, cssColorString) => {
		expect(formatAsCssColor(pair, excludeAlphaChannel)).toEqual(cssColorString)
	})

	test.each([
		[{ color: { h: 1, s: 1, l: 0.5, a: 1 }, format: 'hsl' }, false, 'hsl(360 100% 50% / 1)'],
		[{ color: { h: 0.75, s: 1, l: 0.5, a: 1 }, format: 'hsl' }, false, 'hsl(270 100% 50% / 1)'],
		[{ color: { h: 1, s: 1, l: 0.5, a: 1 }, format: 'hsl' }, true, 'hsl(360 100% 50%)'],
		[{ color: { h: 0.75, s: 1, l: 0.5, a: 1 }, format: 'hsl' }, true, 'hsl(270 100% 50%)'],
	] as [ColorPairHsl, boolean, string][])('works for HSL colors', (pair, excludeAlphaChannel, cssColorString) => {
		expect(formatAsCssColor(pair, excludeAlphaChannel)).toEqual(cssColorString)
	})

	test.each([
		[{ color: { h: 1, w: 1, b: 1, a: 1 }, format: 'hwb' }, false, 'hwb(360 100% 100% / 1)'],
		[{ color: { h: 0.75, w: 1, b: 1, a: 1 }, format: 'hwb' }, false, 'hwb(270 100% 100% / 1)'],
		[{ color: { h: 1, w: 1, b: 1, a: 1 }, format: 'hwb' }, true, 'hwb(360 100% 100%)'],
		[{ color: { h: 0.75, w: 1, b: 1, a: 1 }, format: 'hwb' }, true, 'hwb(270 100% 100%)'],
	] as [ColorPairHwb, boolean, string][])('works for HWB colors', (pair, excludeAlphaChannel, cssColorString) => {
		expect(formatAsCssColor(pair, excludeAlphaChannel)).toEqual(cssColorString)
	})

	test.each([
		[{ color: { r: 1, g: 1, b: 1, a: 1 }, format: 'rgb' }, false, 'rgb(255 255 255 / 1)'],
		[{ color: { r: 1, g: 0, b: 0, a: 1 }, format: 'rgb' }, false, 'rgb(255 0 0 / 1)'],
		[{ color: { r: 1, g: 1, b: 1, a: 1 }, format: 'rgb' }, true, 'rgb(255 255 255)'],
		[{ color: { r: 1, g: 0, b: 0, a: 1 }, format: 'rgb' }, true, 'rgb(255 0 0)'],
		[{ color: { r: 1, g: 0, b: 0, a: 1 }, format: 'rgb' }, false, 'rgb(255 0 0 / 1)'],
		[{ color: { r: 1, g: 0, b: 0, a: 1 }, format: 'rgb' }, false, 'rgb(255 0 0 / 1)'],
		[{ color: { r: 1, g: 0, b: 0, a: 1 }, format: 'rgb' }, false, 'rgb(255 0 0 / 1)'],
		[{ color: { r: 1, g: 0, b: 0, a: 0.333 }, format: 'rgb' }, false, 'rgb(255 0 0 / 0.33)'],
		[{ color: { r: 0.5, g: 0.5, b: 0.25, a: 1 }, format: 'rgb' }, false, 'rgb(127.5 127.5 63.75 / 1)'],
		[{ color: { r: 0.5, g: 0.75, b: 0.125, a: 1 }, format: 'rgb' }, false, 'rgb(127.5 191.25 31.88 / 1)'],
	] as [ColorPairRgb, boolean, string][])('works for RGB colors', (pair, excludeAlphaChannel, cssColorString) => {
		expect(formatAsCssColor(pair, excludeAlphaChannel)).toEqual(cssColorString)
	})
})

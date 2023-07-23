import { round } from './round.js'

import {
	ColorHsl,
	ColorHwb,
	ColorRgb,
	VisibleColorFormat,
} from '../ColorPicker.js'

type Formatters = {
	hex: (color: string, excludeAlphaChannel: boolean) => string
	hsl: (color: ColorHsl, excludeAlphaChannel: boolean) => string
	hwb: (color: ColorHwb, excludeAlphaChannel: boolean) => string
	rgb: (color: ColorRgb, excludeAlphaChannel: boolean) => string
}

const formatters: Formatters = {
	hex (hex: string, excludeAlphaChannel: boolean): string {
		return excludeAlphaChannel && [5, 9].includes(hex.length) ? hex.substring(0, hex.length - (hex.length - 1) / 4) : hex
	},

	hsl (hsl: ColorHsl, excludeAlphaChannel: boolean): string {
		const h = round(hsl.h * 360)
		const s = round(hsl.s * 100)
		const l = round(hsl.l * 100)

		return `hsl(${h} ${s}% ${l}%` + (excludeAlphaChannel ? ')' : ` / ${round(hsl.a)})`)
	},

	hwb (hwb: ColorHwb, excludeAlphaChannel: boolean): string {
		const h = round(hwb.h * 360)
		const w = round(hwb.w * 100)
		const b = round(hwb.b * 100)

		return `hwb(${h} ${w}% ${b}%` + (excludeAlphaChannel ? ')' : ` / ${round(hwb.a)})`)
	},

	rgb (rgb: ColorRgb, excludeAlphaChannel: boolean): string {
		const r = round(rgb.r * 255)
		const g = round(rgb.g * 255)
		const b = round(rgb.b * 255)

		return `rgb(${r} ${g} ${b}` + (excludeAlphaChannel ? ')' : ` / ${round(rgb.a)})`)
	},
}

/**
 * Formats a given color object as a CSS color string.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function formatAsCssColor (color: any, format: VisibleColorFormat, excludeAlphaChannel: boolean): string {
	return formatters[format](color, excludeAlphaChannel)
}

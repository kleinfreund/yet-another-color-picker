import { round } from './round.js'

import { VisibleColorPair } from '../ColorPicker.js'

/**
 * Formats a given color object as a CSS color string.
 */
export function formatAsCssColor ({ format, color }: VisibleColorPair, excludeAlphaChannel: boolean): string {
	switch (format) {
		case 'hex': {
			return excludeAlphaChannel && [5, 9].includes(color.length) ? color.substring(0, color.length - (color.length - 1) / 4) : color
		}

		case 'hsl': {
			const h = round(color.h)
			const s = round(color.s)
			const l = round(color.l)

			return `hsl(${h} ${s}% ${l}%` + (excludeAlphaChannel ? ')' : ` / ${round(color.a)})`)
		}

		case 'hwb': {
			const h = round(color.h)
			const w = round(color.w)
			const b = round(color.b)

			return `hwb(${h} ${w}% ${b}%` + (excludeAlphaChannel ? ')' : ` / ${round(color.a)})`)
		}

		case 'rgb': {
			const r = round(color.r)
			const g = round(color.g)
			const b = round(color.b)

			return `rgb(${r} ${g} ${b}` + (excludeAlphaChannel ? ')' : ` / ${round(color.a)})`)
		}
	}
}

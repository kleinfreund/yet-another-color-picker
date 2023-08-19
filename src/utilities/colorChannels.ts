import { ColorFormat } from '../ColorPicker.js'
import {
	alpha,
	angle,
	CssValue,
	percentage,
	rgbNumber,
} from './css-values.js'

export const colorChannels: Record<Exclude<ColorFormat, 'hex' | 'hsv'>, Record<string, CssValue>> = {
	hsl: {
		h: angle,
		s: percentage,
		l: percentage,
		a: alpha,
	},
	hwb: {
		h: angle,
		w: percentage,
		b: percentage,
		a: alpha,
	},
	rgb: {
		r: rgbNumber,
		g: rgbNumber,
		b: rgbNumber,
		a: alpha,
	},
}

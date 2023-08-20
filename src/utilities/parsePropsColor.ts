import { colorChannels } from './colorChannels.js'
import { detectFormat } from './detectFormat.js'
import { isValidHexColor } from './isValidHexColor.js'
import {
	ColorPair,
	ColorHsl,
	ColorHsv,
	ColorHwb,
	ColorRgb,
	VisibleColorFormat,
} from '../ColorPicker.js'
import { CssValue } from './css-values.js'

/**
 * Parses a color as it can be provided to the color picker’s `color` prop.
 *
 * Supports all valid CSS colors in string form (e.g. tomato, #f80c, hsl(266.66 50% 100% / 0.8), hwb(0.9 0.9 0.9 / 1), etc.) as well as the color formats used for internal storage by the color picker.
 */
export function parsePropsColor (propsColor: string | ColorHsl | ColorHsv | ColorHwb | ColorRgb): ColorPair | null {
	// 1. Objects
	if (typeof propsColor !== 'string') {
		const format = detectFormat(propsColor)
		return { format, color: propsColor } as ColorPair
	}

	// 2. Strings: hexadecimal
	if (propsColor.startsWith('#')) {
		if (isValidHexColor(propsColor)) {
			return { format: 'hex', color: propsColor }
		} else {
			return null
		}
	}

	// 3. Strings: named
	if (!propsColor.includes('(')) {
		const context = document.createElement('canvas').getContext('2d') as CanvasRenderingContext2D
		context.fillStyle = propsColor
		const color = context.fillStyle

		// Invalid color names yield `'#000000'` which we only know to have come from an invalid color name if it was *not* `'black'`
		if (color === '#000000' && propsColor !== 'black') {
			return null
		}

		return { format: 'hex', color }
	}

	// 4. Strings: functional
	// Split a color string like `rgba(255 255 128 / .5)` into `rgba` and `255 255 128 / .5)`.
	const [cssFormat, rest] = propsColor.split('(') as [string, string]
	const format = cssFormat.substring(0, 3) as Exclude<VisibleColorFormat, 'hex'>
	const parameters = rest
		// Replace all characters that aren’t needed any more, leaving a string like `255 255 128 .5`.
		.replace(/[,/)]/g, ' ')
		// Replace consecutive spaces with one space.
		.replace(/\s+/g, ' ')
		.trim()
		.split(' ')

	// Normalize color to always have an alpha channel in its internal representation.
	if (parameters.length === 3) {
		parameters.push('1')
	}

	const channels = (format + 'a').split('')
	const color = Object.fromEntries(channels.map((channel, index) => {
		const cssValue = colorChannels[format][channel] as CssValue

		return [
			channel,
			cssValue.from(parameters[index] as string),
		]
	})) as ColorHsl | ColorHsv | ColorHwb | ColorRgb

	return { format, color } as ColorPair
}

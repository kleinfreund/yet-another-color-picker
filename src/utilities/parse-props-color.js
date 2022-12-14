/** @typedef {import('../../types/index').ColorFormat} ColorFormat */
/** @typedef {import('../../types/index').ColorHsl} ColorHsl */
/** @typedef {import('../../types/index').ColorHsv} ColorHsv */
/** @typedef {import('../../types/index').ColorHwb} ColorHwb */
/** @typedef {import('../../types/index').ColorRgb} ColorRgb */

import { colorChannels } from './color-channels.js'
import { isValidHexColor } from './is-valid-hex-color.js'

/**
 * Parses a color as it can be provided to the color picker’s `color` prop.
 *
 * Supports all valid CSS colors in string form (e.g. tomato, #f80c, hsl(266.66 50% 100% / 0.8), hwb(0.9 0.9 0.9 / 1), etc.) as well as the color formats used for internal storage by the color picker.
 *
 * @param {string} propsColor
 * @returns {{ format: ColorFormat, color: string | ColorHsl | ColorHsv | ColorHwb | ColorRgb } | null}
 */
export function parsePropsColor (propsColor) {
	if (isValidHexColor(propsColor)) {
		return { format: 'hex', color: propsColor }
	}

	if (!propsColor.includes('(')) {
		const context = /** @type {CanvasRenderingContext2D} */ (document.createElement('canvas').getContext('2d'))
		context.fillStyle = propsColor
		const color = context.fillStyle

		// Invalid color names yield `'#000000'` which we only know to have come from an invalid color name if it was *not* `'black'`
		if (color === '#000000' && propsColor !== 'black') {
			return null
		}

		return { format: 'hex', color }
	}

	// Split a color string like `rgba(255 255 128 / .5)` into `rgba` and `255 255 128 / .5)`.
	const [cssFormat, rest] = /** @type {[string, string]} */ (propsColor.split('('))
	const format = /** @type {ColorFormat} */ (cssFormat.substring(0, 3))
	const parameters = rest
	// Replace all characters that aren’t needed any more, leaving a string like `255 255 128 .5`.
		.replace(/[,/)]/g, ' ')
	// Replace consecutive spaces with one space.
		.replace(/\s+/g, ' ')
		.trim().split(' ')

	// Normalize color to always have an alpha channel in its internal representation.
	if (parameters.length === 3) {
		parameters.push('1')
	}

	const channels = format.split('').concat('a')
	const color = /** @type {ColorHsl | ColorHsv | ColorHwb | ColorRgb} */ (Object.fromEntries(channels.map((channel, index) => [
		channel,
		colorChannels[format][channel].from(parameters[index]),
	])))

	return { format, color }
}

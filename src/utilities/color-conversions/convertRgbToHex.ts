import { ColorRgb } from '../../ColorPicker.js'

/**
 * Converts an RGB color object to an HEX color string.
 */
export function convertRgbToHex (rgb: ColorRgb): string {
	return '#' + Object.values(rgb)
		.map(channel => Math.round(channel * 255).toString(16).padStart(2, '0'))
		.join('')
}

import {
	ColorFormat,
	ColorHsl,
	ColorHsv,
	ColorHwb,
	ColorRgb,
} from '../ColorPicker.js'

/**
 * Lazy function that returns the format of a given color object.
 *
 * Doesn’t handle invalid formats.
 */
export function detectFormat (color: ColorHsl | ColorHsv | ColorHwb | ColorRgb): ColorFormat {
	if (Object.prototype.hasOwnProperty.call(color, 'r')) {
		return 'rgb'
	} else if (Object.prototype.hasOwnProperty.call(color, 'w')) {
		return 'hwb'
	} else if (Object.prototype.hasOwnProperty.call(color, 'v')) {
		return 'hsv'
	} else {
		return 'hsl'
	}
}

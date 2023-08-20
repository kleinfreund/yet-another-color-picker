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
export function detectFormat (color: ColorHsl | ColorHsv | ColorHwb | ColorRgb): Exclude<ColorFormat, 'hex'> {
	if ('r' in color) {
		return 'rgb'
	} else if ('w' in color) {
		return 'hwb'
	} else if ('v' in color) {
		return 'hsv'
	} else {
		return 'hsl'
	}
}

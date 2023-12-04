import { VisibleColorFormat } from '../ColorPicker.js'

/**
 * Lazy function that returns the format of a given color object.
 *
 * Doesn’t handle invalid formats.
 */
export function detectFormat (color: Record<string, unknown>): Exclude<VisibleColorFormat, 'hex'> | null {
	if ('r' in color) {
		return 'rgb'
	}

	if ('w' in color) {
		return 'hwb'
	}

	if ('s' in color) {
		return 'hsl'
	}

	return null
}

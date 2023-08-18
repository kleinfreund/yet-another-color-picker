import { ColorHwb, ColorRgb } from '../../ColorPicker.js'
import { convertHslToHsv } from './convertHslToHsv.js'
import { convertHsvToHwb } from './convertHsvToHwb.js'
import { convertRgbToHsl } from './convertRgbToHsl.js'

/**
 * Converts an RGB color object to an HWB color object.
 */
export function convertRgbToHwb (rgb: ColorRgb): ColorHwb {
	// TODO: Inline
	const hsl = convertRgbToHsl(rgb)
	const hsv = convertHslToHsv(hsl)

	return convertHsvToHwb(hsv)
}

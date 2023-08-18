import { ColorHsv, ColorHwb } from '../../ColorPicker.js'

/**
 * Converts an HWB color object to an HSV color object.
 *
 * Source:
 */
export function convertHwbToHsv (hwb: ColorHwb): ColorHsv {
	const w = hwb.w/100
	const b = hwb.b/100

	let s
	let v
	const sum = w + b
	if (sum >= 1) {
		s = 0
		v = w/sum
	} else {
		v = 1 - b
		s = v === 0 ? 0 : (1 - w/v)*100
	}

	return {
		h: hwb.h,
		s,
		v: v*100,
		a: hwb.a,
	}
}

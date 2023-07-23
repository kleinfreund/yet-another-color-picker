import { convertHexToRgb } from './color-conversions/convertHexToRgb.js'
import { convertHslToHsv } from './color-conversions/convertHslToHsv.js'
import { convertHslToRgb } from './color-conversions/convertHslToRgb.js'
import { convertHsvToHsl } from './color-conversions/convertHsvToHsl.js'
import { convertHsvToHwb } from './color-conversions/convertHsvToHwb.js'
import { convertHsvToRgb } from './color-conversions/convertHsvToRgb.js'
import { convertHwbToHsv } from './color-conversions/convertHwbToHsv.js'
import { convertRgbToHsl } from './color-conversions/convertRgbToHsl.js'
import { convertRgbToHex } from './color-conversions/convertRgbToHex.js'
import { convertRgbToHwb } from './color-conversions/convertRgbToHwb.js'

import { ColorFormat, ColorMap } from '../ColorPicker.js'

type Conversions = {
	[SourceFormat in ColorFormat]: {
		[TargetFormat in ColorFormat]: (color: ColorMap[SourceFormat]) => ColorMap[TargetFormat]
	}
}

export const conversions: Conversions = {
	hex: {
		hex: (hex) => hex,
		hsl: (hex) => convertRgbToHsl(convertHexToRgb(hex)),
		hsv: (hex) => convertHwbToHsv(convertRgbToHwb(convertHexToRgb(hex))),
		hwb: (hex) => convertRgbToHwb(convertHexToRgb(hex)),
		rgb: convertHexToRgb,
	},
	hsl: {
		hex: (hsl) => convertRgbToHex(convertHslToRgb(hsl)),
		hsl: (hsl) => hsl,
		hsv: convertHslToHsv,
		hwb: (hsl) => convertRgbToHwb(convertHslToRgb(hsl)),
		rgb: convertHslToRgb,
	},
	hsv: {
		hex: (hsv) => convertRgbToHex(convertHsvToRgb(hsv)),
		hsl: convertHsvToHsl,
		hsv: (hsv) => hsv,
		hwb: convertHsvToHwb,
		rgb: convertHsvToRgb,
	},
	hwb: {
		hex: (hwb) => convertRgbToHex(convertHsvToRgb(convertHwbToHsv(hwb))),
		hsl: (hwb) => convertRgbToHsl(convertHsvToRgb(convertHwbToHsv(hwb))),
		hsv: convertHwbToHsv,
		hwb: (hwb) => hwb,
		rgb: (hwb) => convertHsvToRgb(convertHwbToHsv(hwb)),
	},
	rgb: {
		hex: convertRgbToHex,
		hsl: convertRgbToHsl,
		hsv: (rgb) => convertHwbToHsv(convertRgbToHwb(rgb)),
		hwb: convertRgbToHwb,
		rgb: (rgb) => rgb,
	},
}

export function convert<SourceFormat extends ColorFormat, TargetFormat extends ColorFormat> (sourceFormat: SourceFormat, targetFormat: TargetFormat, color: ColorMap[SourceFormat]): ColorMap[TargetFormat] {
	// I tried my best typing this correctly, but that seems almost impossible. Leaving things with this type assertion.
	return conversions[sourceFormat][targetFormat](color) as ColorMap[TargetFormat]
}

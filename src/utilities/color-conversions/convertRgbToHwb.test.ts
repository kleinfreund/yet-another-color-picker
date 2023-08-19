import { describe, test } from 'vitest'

import { convertRgbToHwb } from './convertRgbToHwb.js'
import { expectColorToEqual } from './../../test-utilities/expectColorToEqual.js'

describe('convertRgbToHwb', () => {
	test.each([
		[{ r: 255, g: 255, b: 255, a: 1 }, { h: 0, w: 100, b: 0, a: 1 }],
		[{ r: 255, g: 0, b: 0, a: 1 }, { h: 0, w: 0, b: 0, a: 1 }],
		[{ r: 0, g: 255, b: 0, a: 0.33 }, { h: 120, w: 0, b: 0, a: 0.33 }],
		[{ r: 0, g: 0, b: 255, a: 0.66 }, { h: 240, w: 0, b: 0, a: 0.66 }],
		[{ r: 207.1875, g: 175.3125, b: 194.4375, a: 0.9 }, { h: 324, w: 68.750, b: 18.75, a: 0.9 }],
		[{ r: 0, g: 0, b: 0, a: 1 }, { h: 0, w: 0, b: 100, a: 1 }],
		[{ r: 204, g: 0, b: 0, a: 0.8 }, { h: 0, w: 0, b: 20, a: 0.8 }],
		[{ r: 85, g: 127.5, b: 127.5, a: 1 }, { h: 180, w: 33.333, b: 50, a: 1 }],
		[{ r: 85, g: 128, b: 128, a: 1 }, { h: 180, w: 33.333, b: 49.804, a: 1 }],
	])('works', (rgb, hwb) => {
		expectColorToEqual(convertRgbToHwb(rgb), hwb)
	})
})

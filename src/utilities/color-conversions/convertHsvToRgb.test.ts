import { describe, test } from 'vitest'

import { convertHsvToRgb } from './convertHsvToRgb.js'
import { expectColorToEqual } from './../../test-utilities/expectColorToEqual.js'

describe('convertHsvToRgb', () => {
	test.each([
		[{ h: 0, s: 0, v: 100, a: 1 }, { r: 255, g: 255, b: 255, a: 1 }],
		[{ h: 0, s: 100, v: 100, a: 1 }, { r: 255, g: 0, b: 0, a: 1 }],
		[{ h: 120, s: 100, v: 100, a: 0.33 }, { r: 0, g: 255, b: 0, a: 0.33 }],
		[{ h: 240, s: 100, v: 100, a: 0.66 }, { r: 0, g: 0, b: 255, a: 0.66 }],
		[{ h: 324, s: 15.384615384615374, v: 81.25, a: 0.9 }, { r: 207.188, g: 175.313, b: 194.438, a: 0.9 }],
		[{ h: 0, s: 0, v: 0, a: 1 }, { r: 0, g: 0, b: 0, a: 1 }],
		[{ h: 0, s: 100, v: 80, a: 0.8 }, { r: 204, g: 0, b: 0, a: 0.8 }],
	])('works', (hsv, rgb) => {
		expectColorToEqual(convertHsvToRgb(hsv), rgb)
	})
})

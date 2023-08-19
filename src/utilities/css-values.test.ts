import { describe, test, expect } from 'vitest'

import {
	alpha,
	angle,
	percentage,
	rgbNumber,
} from './css-values.js'

describe('CssValues', () => {
	describe('angle', () => {
		test.each([
			['-30', -30],
			['0', 0],
			['360', 360],
			['450', 450],
			['270', 270],
			['270.', NaN],
			['90deg', 90],
			['100grad', 90],
			['1.5707963267948966rad', 90],
			['0.25turn', 90],
			['90xdeg', NaN],
		])('hue.from(%s) = %s', (value, expected) => {
			expect(angle.from(value)).toEqual(expected)
		})

		test.each([
			[0, '0'],
			[60, '60'],
			[90, '90'],
			[120, '120'],
			[180, '180'],
			[270, '270'],
		])('hue.to(%s) = %s', (value, expected) => {
			expect(angle.to(value)).toEqual(expected)
		})
	})

	describe('percentage', () => {
		test.each([
			['0%', 100, 0],
			['0', 100, NaN],
			['10.%', 100, NaN],
			['a%', 100, NaN],
			['-13%', 100, 0],
			['55.55%', 100, 55.55],
			['100%', 100, 100],
			['1300%', 100, 100],
			['100%', 255, 255],
			['50%', 255, 127.5],
			['100%', 1, 1],
			['50%', 1, 0.5],
		])('percentage.from(%s, %s) = %s', (value, referenceValue, expected) => {
			expect(percentage.from(value, { referenceValue })).toEqual(expected)
		})

		test.each([
			[0, '0%'],
			[55.55, '55.55%'],
			[100, '100%'],
		])('percentage.to(%s) = %s', (value, expected) => {
			expect(percentage.to(value)).toEqual(expected)
		})
	})

	describe('8 bit decimal', () => {
		test.each([
			['0', 0],
			['0%', 0],
			['10.', NaN],
			['10.%', NaN],
			['a', NaN],
			['141.65', 141.65],
			['255', 255],
			['100%', 255],
			['50%', 127.5],
		])('rgbNumber.from(%s) = %s', (value, expected) => {
			expect(rgbNumber.from(value)).toEqual(expected)
		})

		test.each([
			[0, '0'],
			[141.6525, '141.65'],
			[255, '255'],
		])('rgbNumber.to(%s) = %s', (value, expected) => {
			expect(rgbNumber.to(value)).toEqual(expected)
		})
	})

	describe('alpha', () => {
		test.each([
			['0', 0],
			['0.5555', 0.5555],
			['1', 1],
			['0%', 0],
			['55.55%', 0.5555],
			['100%', 1],
		])('alpha.from(%s) = %s', (value, expected) => {
			expect(alpha.from(value)).toEqual(expected)
		})

		test.each([
			[0, '0'],
			[0.5555, '0.5555'],
			[1, '1'],
		])('alpha.to(%s) = %s', (value, expected) => {
			expect(alpha.to(value)).toEqual(expected)
		})
	})
})

import { clamp } from './clamp.js'
import { round } from './round.js'

export type CssValue<
	FromOptions = Record<string, never>,
	ToOptions = Record<string, never>,
> = {
	from: (value: string, options?: FromOptions) => number
	to: (value: number, options?: ToOptions) => string
}

export type CssValuePercentage = CssValue<{ referenceValue?: number }>

function toNumber (value: number): string {
	return round(value)
}

const angleFactor = {
	deg: 1,
	grad: 0.9,
	rad: 180/Math.PI,
	turn: 360,
}

/**
 * Reference: https://www.w3.org/TR/css-color-4/#typedef-alpha-value
 */
export const alpha: CssValue = {
	from (value) {
		if (value.endsWith('%')) {
			return percentage.from(value, { referenceValue: 1 })
		}

		return clamp(Number(value), 0, 1)
	},

	to (value) {
		return String(value)
	},
}

/**
 * Reference: https://www.w3.org/TR/css-values-4/#angle-value
 */
export const angle: CssValue = {
	from (value) {
		if (value.endsWith('.')) {
			// Returns `NaN` so we can avoid processing something as a color while the user is making an input. For example, typing "1" and then "." should only commit a color value at the input of "1" but not the input of ".". This allows us to avoid changing the corresponding input element's value while the user is typing.
			return NaN
		}

		const match = value.match(/deg|g?rad|turn$/)
		if (match === null) {
			return Number(value)
		}

		const unit = match[0] as 'deg' | 'grad' | 'rad' | 'turn'
		const number = Number(value.substring(0, value.length - unit.length))
		if (Number.isNaN(number)) {
			return NaN
		}

		return angleFactor[unit] * number
	},

	to (value) {
		return toNumber(value)
	},
}

/**
 * Reference: https://www.w3.org/TR/css-values-4/#percentage-value
 */
export const percentage: CssValuePercentage = {
	from (value, { referenceValue = 100 } = {}) {
		if (!value.endsWith('%')) {
			return NaN
		}

		const numberString = value.substring(0, value.length - 1)
		if (numberString.endsWith('.')) {
			return NaN
		}

		const numberValue = Number(numberString)
		if (Number.isNaN(numberValue)) {
			return NaN
		}

		return clamp(numberValue, 0, 100)*referenceValue/100
	},

	to (value) {
		return toNumber(value) + '%'
	},
}

/**
 * Reference: https://www.w3.org/TR/css-color-4/#funcdef-rgb
 */
export const rgbNumber: CssValue = {
	from (value) {
		if (value.endsWith('%')) {
			return percentage.from(value, { referenceValue: 255 })
		}

		if (value.endsWith('.')) {
			return NaN
		}

		const numberValue = Number(value)
		if (Number.isNaN(numberValue)) {
			return NaN
		}

		return clamp(numberValue, 0, 255)
	},

	to (value) {
		return toNumber(value)
	},
}

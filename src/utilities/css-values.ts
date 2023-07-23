import { clamp } from './clamp.js'
import { round } from './round.js'

/**
 * @param value a string representing an arbitrary number
 * @returns in the range [0, 1]
 */
export function fromHueAngle (value: string): number {
	if (value.endsWith('.')) {
		return NaN
	}

	// Maps the angle to the range [0, 360] (e.g. -30 becomes 330, 385 becomes 15, etc).
	const boundAngle = ((parseFloat(value) % 360) + 360) % 360

	return boundAngle / 360
}

/**
 * @param value in the range [0, 1]
 * @returns in the range [0, 360]
 */
export function toHueAngle (value: number): string {
	return round(value * 360)
}

/**
 * @param value a string representing an arbitrary percentage value
 * @returns in the range [0, 1]
 */
export function fromPercentage (value: string): number {
	if (!value.endsWith('%')) {
		return NaN
	}

	const numberString = value.substring(0, value.length - 1)

	if (numberString.endsWith('.')) {
		return NaN
	}

	const numberValue = parseFloat(numberString)

	if (Number.isNaN(numberValue)) {
		return NaN
	}

	return clamp(numberValue, 0, 100) / 100
}

/**
 * @param value in the range [0, 1]
 * @returns in the range [0%, 100%]
 */
export function toPercentage (value: number): string {
	return round(value * 100) + '%'
}

/**
 * @param value a string representing an arbitrary number value
 * @returns in the range [0, 1]
 */
export function from8BitDecimal (value: string): number {
	if (value.endsWith('%')) {
		return fromPercentage(value)
	}

	if (value.endsWith('.')) {
		return NaN
	}

	const numberValue = parseFloat(value)

	if (Number.isNaN(numberValue)) {
		return NaN
	}

	return clamp(numberValue, 0, 255) / 255
}

/**
 * @param value in the range [0, 1]
 * @returns in the range [0, 255]
 */
export function to8BitDecimal (value: number): string {
	return round(value * 255)
}

/**
 * @param value in the range [0, 1] or [0%, 100%]
 * @returns in the range [0, 1]
 */
export function fromAlpha (value: string): number {
	if (value.endsWith('%')) {
		return fromPercentage(value)
	} else {
		return clamp(parseFloat(value), 0, 1)
	}
}

/**
 * @param value in the range [0, 1]
 * @returns in the range [0, 1]
 */
export function toAlpha (value: number): string {
	return String(value)
}

/**
 * Rounds a given number to a certain level of precision after the decimal point.
 *
 * If the input value is an integer, no decimal point will be shown (e.g. `10` results in `'10'`).
 *
 * The default decimal precision is 2 (e.g. `10.333` results in `'10.33'`).
 */
export function round (value: number, decimalPrecision: number = 2): string {
	return value.toFixed(decimalPrecision).replace(/\.?0+$/, '')
}

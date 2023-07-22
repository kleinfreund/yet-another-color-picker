/**
 * @param {T} color
 * @returns {T}
 * @template T
 * @constraint {Record<string, number>}
 */
export function copyColorObject (color) {
	// @ts-ignore
	/** @type {T} */ const newColor = {}

	for (const prop in color) {
		newColor[prop] = color[prop]
	}

	return newColor
}

import { clamp } from './clamp.js'

/**
 * @param {HTMLElement} colorSpace
 * @param {number} clientX
 * @param {number} clientY
 * @returns {{ x: number, y: number }}
 */
export function getNewThumbPosition (colorSpace, clientX, clientY) {
	const rect = colorSpace.getBoundingClientRect()
	const x = clientX - rect.left
	const y = clientY - rect.top

	return {
		x: rect.width === 0 ? 0 : clamp(x / rect.width, 0, 1),
		y: rect.height === 0 ? 0 : clamp(1 - y / rect.height, 0, 1),
	}
}

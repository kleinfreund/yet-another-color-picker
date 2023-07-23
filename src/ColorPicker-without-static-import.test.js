// This test file specifically avoids statically importing the module sp the behavior of the component before it was upgraded can be tested.

import { afterEach, describe, test, expect } from 'vitest'

function render () {
	const colorPicker = document.createElement('color-picker')

	document.body.appendChild(colorPicker)

	return colorPicker
}

describe('ColorPicker', () => {
	afterEach(() => {
		// Empties the document after each test in order to isolate tests.
		document.body.innerHTML = ''
	})

	describe('props & attributes', () => {
		test('sets attribute default values for optional props once upgraded to custom element', async () => {
			const colorPicker = render()

			// Before upgrading the element, no attributes will have non-default values (e.g. `id` won't be set)
			expect(colorPicker.getAttribute('id')).toBe(null)

			// Importing the module will trigger the ColorPicker's static initialization block which runs `window.customElements.define` which will in turn upgrade the custom element.
			await import('./ColorPicker.js')

			// Awaits one micro task loop because recomputations props changes in the component are processed via `queueMicrotask`.
			await Promise.resolve()

			// Once upgraded, the component will set attributes for optional props to their corresponding default values.
			expect(colorPicker.getAttribute('id')).toBe('color-picker')
		})
	})
})

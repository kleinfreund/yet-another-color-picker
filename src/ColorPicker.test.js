import { afterEach, beforeAll, describe, test, expect, vi } from 'vitest'

import { ColorPicker } from './ColorPicker.js'
/** @typedef {import('../types/index.d').ColorChangeDetail} ColorChangeDetail */

/**
 * @typedef {object} RenderOptions
 * @property {Record<string, string>} [props] **Default**: `{}`.
 * @property {boolean} [shouldDefineCustomElement] **Default**: `false`.
 */

/**
 * @param {RenderOptions} options
 * @returns {HTMLElement}
 */
function render (options = {}) {
	const props = options.props ?? {}
	const colorPicker = document.createElement('color-picker')
	for (const [prop, value] of Object.entries(props)) {
		colorPicker.setAttribute(prop, value)
	}

	document.body.appendChild(colorPicker)

	const shouldDefineCustomElement = options.shouldDefineCustomElement ?? true
	if (shouldDefineCustomElement && window.customElements.get('color-picker') === undefined) {
		window.customElements.define('color-picker', ColorPicker)
	}

	return colorPicker
}

describe('ColorPicker', () => {
	afterEach(() => {
		// Empties the document after each test in order to isolate tests.
		document.body.innerHTML = ''

		vi.restoreAllMocks()
	})

	describe('props & attributes', () => {
		test.each([
			{},
			{
				id: 'color-picker',
			},
			{
				'data-alpha-channel': 'show',
				'data-color': '#fff',
				'data-default-format': 'hex',
				'data-visible-formats': 'hex,rgb,hsl',
				id: 'color-picker',
			},
		])('renders correctly when *not* upgrading to custom element', (props) => {
			const colorPicker = render({ props, shouldDefineCustomElement: false })

			for (const [attribute, value] of Object.entries(props)) {
				expect(colorPicker.getAttribute(attribute)).toBe(value)
			}
		})

		test('sets attribute default values for optional props once upgraded to custom element', async () => {
			const colorPicker = render({ shouldDefineCustomElement: false })

			// Before upgrading the element, no attributes will have non-default values (e.g. `id` won't be set)
			expect(colorPicker.getAttribute('id')).toBe(null)

			window.customElements.define('color-picker', ColorPicker)

			// Awaits one micro task loop because recomputations props changes in the component are processed via `queueMicrotask`.
			await Promise.resolve()

			// Once upgraded, the component will set attributes for optional props to their corresponding default values.
			expect(colorPicker.getAttribute('id')).toBe('color-picker')
		})

		test.each([
			[
				{},
				{
					'data-alpha-channel': 'show',
					'data-color': '#ffffffff',
					'data-default-format': 'hsl',
					'data-visible-formats': 'hex,hsl,hwb,rgb',
					id: 'color-picker',
				},
			],
			[
				{
					'data-alpha-channel': 'show',
					'data-color': '#fff',
					'data-default-format': 'hex',
					'data-visible-formats': 'hex,rgb,hsl',
					id: 'color-picker',
				},
				{
					'data-alpha-channel': 'show',
					'data-color': '#fff',
					'data-default-format': 'hex',
					'data-visible-formats': 'hex,rgb,hsl',
					id: 'color-picker',
				},
			],
		])('has correct attributes when using props', async (props, expectedAttributes) => {
			const colorPicker = render({ props })

			// Awaits one micro task loop because recomputations props changes in the component are processed via `queueMicrotask`.
			await Promise.resolve()

			for (const [attribute, value] of Object.entries(expectedAttributes)) {
				expect(colorPicker.getAttribute(attribute)).toBe(value)
			}
		})

		test.each(/** @type {[any, string][]} */ ([
			['#f00', '#f00'],
			['rgb(255 50% 0 / 0.5)', '#ff800080'],
			['hsl(0 100% 50% / 1)', '#ff0000ff'],
			['hwb(180 33.333% 50% / 1)', '#558080ff'],
		]))('renders hex input correctly for valid color prop', async (colorProp, expectedHexInputValue) => {
			const colorPicker = render({
				props: {
					'data-color': colorProp,
					'data-default-format': 'hex',
				},
			})

			await Promise.resolve()

			const input = /** @type {HTMLInputElement} */ (colorPicker.querySelector('.cp-color-input'))
			expect(input.value).toBe(expectedHexInputValue)
		})

		test('renders correctly with an invalid color prop', async () => {
			const colorPicker = render({
				props: {
					'data-color': '#ff',
					'data-default-format': 'hex',
				},
			})

			await Promise.resolve()

			const input = /** @type {HTMLInputElement} */ (colorPicker.querySelector('.cp-color-input'))
			expect(input.value).toBe('#ffffffff')
		})

		test('falls back to visible color format when defaultFormat isn\'t a visible format', async () => {
			const colorPicker = render({
				props: {
					'data-color': '#ff',
					'data-default-format': 'hex',
					'data-visible-formats': 'hex',
				},
			})

			await Promise.resolve()

			const input = /** @type {HTMLInputElement} */ (colorPicker.querySelector('.cp-color-input'))
			expect(input.value).toBe('#ffffffff')
		})

		test.each([
			[{}, ['H', 'S', 'L']],
			[{ 'data-default-format': 'hex' }, ['Hex']],
			[{ 'data-default-format': 'hsl' }, ['H', 'S', 'L']],
			[{ 'data-default-format': 'hwb' }, ['H', 'W', 'B']],
			[{ 'data-default-format': 'rgb' }, ['R', 'G', 'B']],
		])('sets active color format correctly when providing ???data-default-format??? prop', async (props, expectedLabels) => {
			const colorPicker = render({ props })

			await Promise.resolve()

			const inputGroupMarkup = /** @type {HTMLElement} */ (colorPicker.querySelector('.cp-color-input-group')).innerHTML
			for (const expectedLabel of expectedLabels) {
				expect(inputGroupMarkup).toContain(expectedLabel)
			}
		})

		test.each(/** @type {[any, any][]} */([
			[
				'#f80c',
				{ r: 1, g: 0.5333333333333333, b: 0, a: 0.8 },
			],
			[
				'hsl(180 50% 50% / 1)',
				{ r: 0.25, g: 0.7499999999999999, b: 0.75, a: 1 },
			],
		]))('recomputes colors when ???data-color??? prop changes', async (color, expectedRgbColor) => {
			const colorPicker = render()
			await Promise.resolve()

			const rgbColorSpy = vi.fn()
			/**
			 * @param {CustomEvent<ColorChangeDetail>} event
			 */
			function colorChangeListener (event) {
				rgbColorSpy(event.detail.colors.rgb)
			}
			colorPicker.addEventListener('color-change', colorChangeListener)

			colorPicker.setAttribute('data-color', color)
			await Promise.resolve()
			expect(rgbColorSpy).toHaveBeenCalledWith(expectedRgbColor)

			colorPicker.setAttribute('data-color', '#fffc')
			await Promise.resolve()
			expect(rgbColorSpy).toHaveBeenCalledWith({ r: 1, g: 1, b: 1, a: 0.8 })
		})

		test('id attributes are set correctly', async () => {
			const id = 'test-color-picker'
			const colorPicker = render({
				props: {
					id,
				},
			})

			await Promise.resolve()

			expect(colorPicker.querySelector(`#${id}-hue-slider`)).not.toBe(null)
			expect(colorPicker.querySelector(`#${id}-alpha-slider`)).not.toBe(null)

			const formats = ['hsl', 'hwb', 'rgb']
			const formatSwitchButton = /** @type {HTMLButtonElement} */ (colorPicker.querySelector('.cp-switch-format-button'))

			for (const format of formats) {
				const channels = format.split('')
				expect(colorPicker.querySelector(`[id="${id}-color-${format}-${channels[0]}-label"]`)).not.toBe(null)
				expect(colorPicker.querySelector(`[id="${id}-color-${format}-${channels[0]}"]`)).not.toBe(null)
				expect(colorPicker.querySelector(`[for="${id}-color-${format}-${channels[0]}"]`)).not.toBe(null)
				expect(colorPicker.querySelector(`[id="${id}-color-${format}-${channels[1]}-label"]`)).not.toBe(null)
				expect(colorPicker.querySelector(`[id="${id}-color-${format}-${channels[1]}"]`)).not.toBe(null)
				expect(colorPicker.querySelector(`[for="${id}-color-${format}-${channels[1]}"]`)).not.toBe(null)
				expect(colorPicker.querySelector(`[id="${id}-color-${format}-${channels[2]}-label"]`)).not.toBe(null)
				expect(colorPicker.querySelector(`[id="${id}-color-${format}-${channels[2]}"]`)).not.toBe(null)
				expect(colorPicker.querySelector(`[for="${id}-color-${format}-${channels[2]}"]`)).not.toBe(null)
				expect(colorPicker.querySelector(`[id="${id}-color-${format}-a"]`)).not.toBe(null)
				expect(colorPicker.querySelector(`[for="${id}-color-${format}-a"]`)).not.toBe(null)

				formatSwitchButton.dispatchEvent(new Event('click'))
			}
		})

		test.each([
			['show', true, 'hsl(180 0% 100% / 1)'],
			['hide', false, 'hsl(180 0% 100%)'],
		])('shows/hides correct elements when setting data-alpha-channel', async (alphaChannel, isElementVisible, expectedCssColor) => {
			const id = 'test-color-picker'
			const colorPicker = render({
				props: {
					id,
					'data-alpha-channel': alphaChannel,
				},
			})

			const cssColorSpy = vi.fn()
			/**
			 * @param {CustomEvent<ColorChangeDetail>} event
			 */
			function colorChangeListener (event) {
				cssColorSpy(event.detail.cssColor)
			}
			colorPicker.addEventListener('color-change', colorChangeListener)

			await Promise.resolve()

			const alphaInput = colorPicker.querySelector(`#${id}-alpha-slider`)
			expect(alphaInput !== null).toBe(isElementVisible)

			const colorHslAlphaInput = colorPicker.querySelector(`#${id}-color-hsl-a`)
			expect(colorHslAlphaInput !== null).toBe(isElementVisible)

			const inputElement = /** @type {HTMLInputElement} */ (colorPicker.querySelector(`#${id}-color-hsl-h`))
			inputElement.value = '180'
			inputElement.dispatchEvent(new InputEvent('input'))

			expect(cssColorSpy).toHaveBeenCalledWith(expectedCssColor)
		})
	})

	describe('color space thumb interactions', () => {
		test('removes event listeners on unmount', async () => {
			const colorPicker = render()

			await Promise.resolve()

			const spy = vi.fn()
			colorPicker.addEventListener('color-change', spy)

			const colorSpace = /** @type {HTMLElement} */ (colorPicker.querySelector('.cp-color-space'))

			colorSpace.getBoundingClientRect = vi.fn(() => ({
				width: 200,
				height: 200,
				x: 0,
				y: 0,
				top: 0,
				left: 0,
				bottom: 0,
				right: 0,
				toJSON: vi.fn(),
			}))

			colorSpace.dispatchEvent(new MouseEvent('mousedown', { buttons: 1, clientX: 0 }))
			expect(spy).toHaveBeenCalledTimes(0)

			colorPicker.ownerDocument.dispatchEvent(new MouseEvent('mousemove', { buttons: 1, clientX: 1 }))
			expect(spy).toHaveBeenCalledTimes(1)

			colorPicker.ownerDocument.dispatchEvent(new MouseEvent('mousemove', { buttons: 1, clientX: 2 }))
			expect(spy).toHaveBeenCalledTimes(2)

			colorPicker.remove()

			colorPicker.ownerDocument.dispatchEvent(new MouseEvent('mousemove', { buttons: 1, clientX: 3 }))
			// Note that we assert here that the method hasn???t been called *again*.
			expect(spy).toHaveBeenCalledTimes(2)
		})

		test.each([
			{},
			{
				'data-color': '#ffffffff',
				'data-alpha-channel': 'show',
			},
			{
				'data-color': '#ffffffff',
				'data-alpha-channel': 'hide',
			},
			{
				'data-color': '#ffffff',
				'data-alpha-channel': 'show',
			},
			{
				'data-color': '#ffffff',
				'data-alpha-channel': 'hide',
			},
			{
				'data-color': '#fff',
				'data-alpha-channel': 'show',
			},
			{
				'data-color': '#fff',
				'data-alpha-channel': 'hide',
			},
			{
				'data-color': 'white',
				'data-alpha-channel': 'show',
			},
			{
				'data-color': 'white',
				'data-alpha-channel': 'hide',
			},
			{
				'data-color': 'hsl(0, 0%, 100%, 1)',
				'data-alpha-channel': 'show',
			},
			{
				'data-color': 'hsl(0, 0%, 100%, 1)',
				'data-alpha-channel': 'hide',
			},
		])('initializes color space and thumb correctly with default color value', async (props) => {
			const colorPicker = render({
				props: {
					'data-default-format': 'hex',
					...props,
				},
			})

			await Promise.resolve()

			expect(colorPicker.style.getPropertyValue('--cp-hsl-h')).toBe('0')
			expect(colorPicker.style.getPropertyValue('--cp-hsl-s')).toBe('0')
			expect(colorPicker.style.getPropertyValue('--cp-hsl-l')).toBe('1')
			expect(colorPicker.style.getPropertyValue('--cp-hsl-a')).toBe('1')

			const thumb = /** @type {HTMLElement} */ (colorPicker.querySelector('.cp-thumb'))
			expect(thumb.style.getPropertyValue('left')).toBe('0%')
			expect(thumb.style.getPropertyValue('bottom')).toBe('100%')
		})

		test('can initiate moving the color space thumb with a mouse', async () => {
			const colorPicker = render({
				props: {
					'data-color': '#f80c',
				},
			})

			const spy = vi.fn()
			colorPicker.addEventListener('color-change', spy)

			await Promise.resolve()

			expect(spy).toHaveBeenCalledTimes(1)

			const colorSpace = /** @type {HTMLElement} */ (colorPicker.querySelector('.cp-color-space'))
			colorSpace.dispatchEvent(new MouseEvent('mousedown', { buttons: 1 }))
			colorPicker.ownerDocument.dispatchEvent(new MouseEvent('mousemove', { buttons: 1 }))

			await Promise.resolve()

			expect(spy).toHaveBeenCalledTimes(2)
		})

		test('can initiate moving the color space thumb with a touch-based device', async () => {
			const colorPicker = render({
				props: {
					'data-color': '#f80c',
				},
			})

			const spy = vi.fn()
			colorPicker.addEventListener('color-change', spy)

			await Promise.resolve()

			expect(spy).toHaveBeenCalledTimes(1)

			const colorSpace = /** @type {HTMLElement} */ (colorPicker.querySelector('.cp-color-space'))

			colorSpace.getBoundingClientRect = vi.fn(() => ({
				width: 200,
				height: 200,
				x: 0,
				y: 0,
				top: 0,
				left: 0,
				bottom: 0,
				right: 0,
				toJSON: vi.fn(),
			}))

			colorSpace.dispatchEvent(new TouchEvent('touchstart', {
				touches: [
					/** @type {Touch} */ ({ clientX: 0, clientY: 0 }),
				],
			}))
			colorPicker.ownerDocument.dispatchEvent(new TouchEvent('touchmove', {
				touches: [
					/** @type {Touch} */ ({ clientX: 1, clientY: 0 }),
				],
			}))

			expect(spy).toHaveBeenCalledTimes(3)

			colorSpace.dispatchEvent(new TouchEvent('touchstart', {
				touches: [
					/** @type {Touch} */ ({ clientX: 2, clientY: 0 }),
				],
			}))
			colorPicker.ownerDocument.dispatchEvent(new TouchEvent('touchmove', {
				touches: [
					/** @type {Touch} */ ({ clientX: 3, clientY: 0 }),
				],
			}))

			expect(spy).toHaveBeenCalledTimes(5)
		})

		test('can not move the color space thumb with the wrong key', async () => {
			const keydownEvent = {
				key: 'a',
				preventDefault: vi.fn(),
			}

			const colorPicker = render()

			await Promise.resolve()

			const thumb = /** @type {HTMLElement} */ (colorPicker.querySelector('.cp-thumb'))
			thumb.dispatchEvent(new KeyboardEvent('keydown', keydownEvent))

			expect(keydownEvent.preventDefault).not.toHaveBeenCalled()
		})

		test.each([
			['ArrowDown', false, 'v', 0.49],
			['ArrowDown', true, 'v', 0.4],
			['ArrowUp', false, 'v', 0.51],
			['ArrowUp', true, 'v', 0.6],
			['ArrowRight', false, 's', 0.51],
			['ArrowRight', true, 's', 0.6],
			['ArrowLeft', false, 's', 0.49],
			['ArrowLeft', true, 's', 0.4],
		])('can move the color space thumb with the %s key (holding shift: %s)', async (key, shiftKey, channel, expectedColorValue) => {
			const keydownEvent = {
				key,
				shiftKey,
				preventDefault: vi.fn(),
			}

			const colorPicker = render({
				props: {
					'data-color': 'hwb(180, 25%, 50%, 1)',
				},
			})

			await Promise.resolve()

			const spy = vi.fn()
			/**
			 * @param {CustomEvent<ColorChangeDetail>} event
			 */
			function colorChangeListener (event) {
				// @ts-ignore
				spy(event.detail.colors.hsv[channel])
			}
			colorPicker.addEventListener('color-change', colorChangeListener)

			// expect(keydownEvent.preventDefault).not.toHaveBeenCalled()

			const thumb = /** @type {HTMLElement} */ (colorPicker.querySelector('.cp-thumb'))
			thumb.dispatchEvent(new KeyboardEvent('keydown', keydownEvent))

			// expect(keydownEvent.preventDefault).toHaveBeenCalled()
			expect(spy).toHaveBeenCalledWith(expectedColorValue)
		})
	})

	describe('hue & alpha range inputs', () => {
		test('can not increment/decrement in big steps without holding down shift', async () => {
			const colorPicker = render()

			await Promise.resolve()

			const hueRangeInput = /** @type {HTMLInputElement} */ (colorPicker.querySelector('#color-picker-hue-slider'))
			const originalInputValue = hueRangeInput.value

			hueRangeInput.dispatchEvent(new KeyboardEvent('keydown', {
				key: 'ArrowRight',
				shiftKey: false,
			}))

			expect(hueRangeInput.value).toBe(originalInputValue)
		})

		test.each(/** @type {['increment' | 'decrement', number, string, string][]} */ ([
			['decrement', 1, 'ArrowDown', '1'],
			['decrement', 3, 'ArrowDown', '1'],
			['decrement', 1, 'ArrowLeft', '1'],
			['increment', 1, 'ArrowUp', '9'],
			['increment', 1, 'ArrowRight', '9'],
			['increment', 3, 'ArrowRight', '27'],
		]))('can %s range inputs %dx in big steps with %s', async (_, numberOfPresses, key, expectedValue) => {
			const colorPicker = render()

			await Promise.resolve()

			const hueRangeInput = /** @type {HTMLInputElement} */ (colorPicker.querySelector('#color-picker-hue-slider'))
			expect(hueRangeInput !== null).toBe(true)

			while (numberOfPresses--) {
				hueRangeInput.dispatchEvent(new KeyboardEvent('keydown', {
					key,
					shiftKey: true,
				}))
			}

			expect(hueRangeInput.value).toBe(expectedValue)
		})

		test('hue slider updates internal colors', async () => {
			const hueAngle = 30
			const expectedHueValue = hueAngle / 360

			const colorPicker = render()

			await Promise.resolve()

			let channel = ''
			const spy = vi.fn()
			/**
			 * @param {CustomEvent<ColorChangeDetail>} event
			 */
			function colorChangeListener (event) {
				// @ts-ignore
				spy(event.detail.colors.hsv[channel])
			}
			colorPicker.addEventListener('color-change', colorChangeListener)

			const hueRangeInput = /** @type {HTMLInputElement} */ (colorPicker.querySelector('#color-picker-hue-slider'))
			hueRangeInput.value = String(hueAngle)
			channel = 'h'
			hueRangeInput.dispatchEvent(new InputEvent('input'))

			expect(spy).toHaveBeenCalledTimes(1)
			expect(spy).toHaveBeenLastCalledWith(expectedHueValue)

			const alpha = 90
			const expectedAlphaValue = alpha / 100

			const alphaRangeInput = /** @type {HTMLInputElement} */ (colorPicker.querySelector('#color-picker-alpha-slider'))
			alphaRangeInput.value = String(alpha)
			channel = 'a'
			alphaRangeInput.dispatchEvent(new InputEvent('input'))

			expect(spy).toHaveBeenCalledTimes(2)
			expect(spy).toHaveBeenLastCalledWith(expectedAlphaValue)
		})
	})

	describe('copy button', () => {
		beforeAll(() => {
			Object.defineProperty(global.navigator, 'clipboard', {
				value: {
					writeText: () => {},
				},
			})
		})

		test.each([
			[
				{ 'data-default-format': 'rgb', 'data-alpha-channel': 'show' },
				'rgb(255 255 255 / 1)',
			],
			[
				{ 'data-default-format': 'hsl', 'data-alpha-channel': 'show' },
				'hsl(0 0% 100% / 1)',
			],
			[
				{ 'data-default-format': 'hwb', 'data-alpha-channel': 'show' },
				'hwb(0 100% 0% / 1)',
			],
			[
				{ 'data-default-format': 'hex', 'data-alpha-channel': 'show' },
				'#ffffffff',
			],
			[
				{ 'data-default-format': 'hex', 'data-alpha-channel': 'hide' },
				'#ffffff',
			],
		])('copy button copies %s format as %s', async (props, cssColor) => {
			vi.spyOn(global.navigator.clipboard, 'writeText').mockImplementation(vi.fn(() => Promise.resolve()))

			const colorPicker = render({ props })

			await Promise.resolve()

			const copyButton = /** @type {HTMLButtonElement} */ (colorPicker.querySelector('.cp-copy-button'))
			copyButton.dispatchEvent(new Event('click'))

			expect(global.navigator.clipboard.writeText).toHaveBeenCalledWith(cssColor)
		})
	})

	describe('switch format button', () => {
		test('clicking switch format button cycles through active formats correctly', async () => {
			const colorPicker = render()

			await Promise.resolve()

			const switchFormatButton = /** @type {HTMLButtonElement} */ (colorPicker.querySelector('.cp-switch-format-button'))

			expect(colorPicker.querySelector('#color-picker-color-hsl-l') !== null).toBe(true)

			switchFormatButton.dispatchEvent(new Event('click'))
			expect(colorPicker.querySelector('#color-picker-color-hwb-w') !== null).toBe(true)

			switchFormatButton.dispatchEvent(new Event('click'))
			expect(colorPicker.querySelector('#color-picker-color-rgb-r') !== null).toBe(true)

			switchFormatButton.dispatchEvent(new Event('click'))
			expect(colorPicker.querySelector('#color-picker-color-hex') !== null).toBe(true)

			switchFormatButton.dispatchEvent(new Event('click'))
			expect(colorPicker.querySelector('#color-picker-color-hsl-l') !== null).toBe(true)
		})
	})

	describe('color value inputs', () => {
		test.each([
			[{ 'data-default-format': 'rgb' }, 'r', '127.'],
			[{ 'data-default-format': 'hsl' }, 's', 'a'],
			[{ 'data-default-format': 'hwb' }, 'b', '25.%'],
		])('updating a color input with an invalid value does not update the internal color data', async (props, channel, channelValue) => {
			const colorPicker = render({ props })

			await Promise.resolve()
			const spy = vi.fn()
			colorPicker.addEventListener('color-change', spy)

			const input = /** @type {HTMLInputElement} */ (colorPicker.querySelector(`#${colorPicker.id}-color-${props['data-default-format']}-${channel}`))
			input.value = channelValue
			input.dispatchEvent(new InputEvent('input'))

			expect(spy).not.toHaveBeenCalled()
		})

		test.each([
			['abc'],
			['25%'],
		])('updating a hex color input with an invalid value does not update the internal color data', async (invalidHexColorString) => {
			const colorPicker = render({
				props: {
					'data-default-format': 'hex',
				},
			})

			await Promise.resolve()
			const spy = vi.fn()
			colorPicker.addEventListener('color-change', spy)

			const input = /** @type {HTMLInputElement} */ (colorPicker.querySelector('#color-picker-color-hex'))
			input.value = invalidHexColorString
			input.dispatchEvent(new InputEvent('input'))

			expect(spy).not.toHaveBeenCalled()
		})

		test.each([
			[{ 'data-default-format': 'rgb' }, 'r', '127.5'],
			[{ 'data-default-format': 'hsl' }, 's', '75%'],
			[{ 'data-default-format': 'hwb' }, 'b', '25.5%'],
		])('updating a %s color input with a valid value updates the internal color data', async (props, channel, channelValue) => {
			const colorPicker = render({ props })

			await Promise.resolve()
			const spy = vi.fn()
			colorPicker.addEventListener('color-change', spy)

			const input = /** @type {HTMLInputElement} */ (colorPicker.querySelector(`#${colorPicker.id}-color-${props['data-default-format']}-${channel}`))
			input.value = channelValue
			input.dispatchEvent(new InputEvent('input'))

			expect(spy).toHaveBeenCalledTimes(1)
		})

		test.each([
			['#ff8800cc'],
		])('updating a %s color input with a valid value updates the internal color data', async (channelValue) => {
			const colorPicker = render({
				props: {
					'data-default-format': 'hex',
				},
			})

			await Promise.resolve()
			const spy = vi.fn()
			colorPicker.addEventListener('color-change', spy)

			const input = /** @type {HTMLInputElement} */ (colorPicker.querySelector('#color-picker-color-hex'))
			input.value = channelValue
			input.dispatchEvent(new InputEvent('input'))

			expect(spy).toHaveBeenCalledTimes(1)
		})
	})

	describe('color-change event', () => {
		test.each([
			[
				{
					'data-color': '#ff99aacc',
					'data-default-format': 'hsl',
					'data-alpha-channel': 'show',
				},
				{
					cssColor: 'hsl(350 100% 80% / 0.8)',
					colors: {
						hex: '#ff99aacc',
						hsl: { h: 0.9722222222222222, s: 1, l: 0.8, a: 0.8 },
						hsv: { h: 0.9722222222222222, s: 0.4, v: 1, a: 0.8 },
						hwb: { h: 0.9722222222222222, w: 0.6, b: 0, a: 0.8 },
						rgb: { r: 1, g: 0.6, b: 0.6666666666666666, a: 0.8 },
					},
				},
			],
			[
				{
					'data-color': '#f9ac',
					'data-default-format': 'hsl',
					'data-alpha-channel': 'show',
				},
				{
					cssColor: 'hsl(350 100% 80% / 0.8)',
					colors: {
						hex: '#f9ac',
						hsl: { h: 0.9722222222222222, s: 1, l: 0.8, a: 0.8 },
						hsv: { h: 0.9722222222222222, s: 0.4, v: 1, a: 0.8 },
						hwb: { h: 0.9722222222222222, w: 0.6, b: 0, a: 0.8 },
						rgb: { r: 1, g: 0.6, b: 0.6666666666666666, a: 0.8 },
					},
				},
			],
			[
				{
					'data-color': '#ff99aacc',
					'data-default-format': 'hex',
					'data-alpha-channel': 'show',
				},
				{
					cssColor: '#ff99aacc',
					colors: {
						hex: '#ff99aacc',
						hsl: { h: 0.9722222222222222, s: 1, l: 0.8, a: 0.8 },
						hsv: { h: 0.9722222222222222, s: 0.4, v: 1, a: 0.8 },
						hwb: { h: 0.9722222222222222, w: 0.6, b: 0, a: 0.8 },
						rgb: { r: 1, g: 0.6, b: 0.6666666666666666, a: 0.8 },
					},
				},
			],
			[
				{
					'data-color': '#f9ac',
					'data-default-format': 'hex',
					'data-alpha-channel': 'show',
				},
				{
					cssColor: '#f9ac',
					colors: {
						hex: '#f9ac',
						hsl: { h: 0.9722222222222222, s: 1, l: 0.8, a: 0.8 },
						hsv: { h: 0.9722222222222222, s: 0.4, v: 1, a: 0.8 },
						hwb: { h: 0.9722222222222222, w: 0.6, b: 0, a: 0.8 },
						rgb: { r: 1, g: 0.6, b: 0.6666666666666666, a: 0.8 },
					},
				},
			],
			[
				{
					'data-color': '#ff99aacc',
					'data-default-format': 'hsl',
					'data-alpha-channel': 'hide',
				},
				{
					cssColor: 'hsl(350 100% 80%)',
					colors: {
						hex: '#ff99aaff',
						hsl: { h: 0.9722222222222222, s: 1, l: 0.8, a: 1 },
						hsv: { h: 0.9722222222222222, s: 0.4, v: 1, a: 1 },
						hwb: { h: 0.9722222222222222, w: 0.6, b: 0, a: 1 },
						rgb: { r: 1, g: 0.6, b: 0.6666666666666666, a: 1 },
					},
				},
			],
			[
				{
					'data-color': '#f9ac',
					'data-default-format': 'hsl',
					'data-alpha-channel': 'hide',
				},
				{
					cssColor: 'hsl(350 100% 80%)',
					colors: {
						hex: '#f9af',
						hsl: { h: 0.9722222222222222, s: 1, l: 0.8, a: 1 },
						hsv: { h: 0.9722222222222222, s: 0.4, v: 1, a: 1 },
						hwb: { h: 0.9722222222222222, w: 0.6, b: 0, a: 1 },
						rgb: { r: 1, g: 0.6, b: 0.6666666666666666, a: 1 },
					},
				},
			],
			[
				{
					'data-color': '#ff99aacc',
					'data-default-format': 'hex',
					'data-alpha-channel': 'hide',
				},
				{
					cssColor: '#ff99aa',
					colors: {
						hex: '#ff99aaff',
						hsl: { h: 0.9722222222222222, s: 1, l: 0.8, a: 1 },
						hsv: { h: 0.9722222222222222, s: 0.4, v: 1, a: 1 },
						hwb: { h: 0.9722222222222222, w: 0.6, b: 0, a: 1 },
						rgb: { r: 1, g: 0.6, b: 0.6666666666666666, a: 1 },
					},
				},
			],
			[
				{
					'data-color': '#f9ac',
					'data-default-format': 'hex',
					'data-alpha-channel': 'hide',
				},
				{
					cssColor: '#f9a',
					colors: {
						hex: '#f9af',
						hsl: { h: 0.9722222222222222, s: 1, l: 0.8, a: 1 },
						hsv: { h: 0.9722222222222222, s: 0.4, v: 1, a: 1 },
						hwb: { h: 0.9722222222222222, w: 0.6, b: 0, a: 1 },
						rgb: { r: 1, g: 0.6, b: 0.6666666666666666, a: 1 },
					},
				},
			],
			[
				{
					'data-color': '#23a96a',
					'data-default-format': 'hex',
					'data-alpha-channel': 'hide',
				},
				{
					cssColor: '#23a96a',
					colors: {
						hex: '#23a96aff',
						hsl: { h: 0.4216417910447761, s: 0.6568627450980391, l: 0.4, a: 1 },
						hsv: { h: 0.4216417910447761, s: 0.7928994082840236, v: 0.6627450980392157, a: 1 },
						hwb: { h: 0.4216417910447761, w: 0.13725490196078433, b: 0.33725490196078434, a: 1 },
						rgb: { r: 0.13725490196078433, g: 0.6627450980392157, b: 0.41568627450980394, a: 1 },
					},
				},
			],
		])('emits correct data', async (props, expectedData) => {
			const colorPicker = render({ props })

			const spy = vi.fn()
			/**
			 * @param {CustomEvent<ColorChangeDetail>} event
			 */
			function colorChangeListener (event) {
				spy(event.detail)
			}
			colorPicker.addEventListener('color-change', colorChangeListener)

			await Promise.resolve()

			expect(spy).toHaveBeenCalledWith(expectedData)
		})
	})

	describe('color inputs', () => {
		test.each([
			[
				{ 'data-color': '#12345678', 'data-alpha-channel': 'show' },
				'#12345678',
			],
			[
				{ 'data-color': '#12345678', 'data-alpha-channel': 'hide' },
				'#123456',
			],
			[
				{ 'data-color': '#123456', 'data-alpha-channel': 'show' },
				'#123456',
			],
			[
				{ 'data-color': '#123456', 'data-alpha-channel': 'hide' },
				'#123456',
			],
			[
				{ 'data-color': '#123a', 'data-alpha-channel': 'show' },
				'#123a',
			],
			[
				{ 'data-color': '#123a', 'data-alpha-channel': 'hide' },
				'#123',
			],
			[
				{ 'data-color': '#123', 'data-alpha-channel': 'show' },
				'#123',
			],
			[
				{ 'data-color': '#123', 'data-alpha-channel': 'hide' },
				'#123',
			],
		])('shows expected color for hex colors', async (props, expectedHexColor) => {
			const colorPicker = render({
				props: {
					'data-default-format': 'hex',
					...props,
				},
			})

			await Promise.resolve()

			const input = /** @type {HTMLInputElement} */ (colorPicker.querySelector('#color-picker-color-hex'))
			expect(input.value).toBe(expectedHexColor)
		})
	})
})

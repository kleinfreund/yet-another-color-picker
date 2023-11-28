/* eslint-disable @typescript-eslint/ban-ts-comment */

import { afterEach, beforeAll, describe, test, expect, vi } from 'vitest'

import './ColorPicker.js'
import type { ColorChangeDetail, ColorPickerProperties } from './ColorPicker.js'

type RenderOptions = {
	attributes?: Record<string, string>
	properties?: Partial<Record<ColorPickerProperties, string>>
}

function render (options: RenderOptions = {}) {
	const { attributes = {}, properties = {} } = options
	const colorPicker = document.createElement('color-picker')


	for (const [attribute, value] of Object.entries(attributes)) {
		colorPicker.setAttribute(attribute, value)
	}

	for (const [property, value] of Object.entries(properties)) {
		// @ts-ignore
		colorPicker[property] = value
	}

	document.body.appendChild(colorPicker)

	return colorPicker
}

/**
 * Await this function in a test to wait for the component's recomputations to be processed.
 *
 * This function returns a promise that resolves after a 0 delay in the callback of a `window.setTimeout`. Awaiting it will cause the code execution in the test to effectively wait until the next event loop cycle (i.e. the next task). By then, the component's updates have been processed via micro task queues.
 */
function waitForRecomputations () {
	return new Promise((resolve) => window.setTimeout(resolve, 0))
}

describe('ColorPicker', () => {
	afterEach(() => {
		// Empties the document after each test in order to isolate tests.
		document.body.innerHTML = ''

		vi.restoreAllMocks()
	})

	describe('attributes & properties', () => {
		test('has expected property default values', async () => {
			const colorPicker = render()

			expect(colorPicker.id).toBe('color-picker')
			expect(colorPicker.alphaChannel).toBe('show')
			expect(colorPicker.color).toBe('#ffffffff')
			expect(colorPicker.defaultFormat).toBe('hsl')
			expect(colorPicker.visibleFormats).toEqual(['hex', 'hsl', 'hwb', 'rgb'])
		})

		test.each<[Record<string, string>, ColorPickerProperties, string | string[]]>([
			[
				{ 'alpha-channel': 'show' },
				'alphaChannel',
				'show',
			],
			[
				{ 'alpha-channel': 'hide' },
				'alphaChannel',
				'hide',
			],
			[
				{ color: '#fff' },
				'color',
				'#fff',
			],
			[
				{ 'default-format': 'hex' },
				'defaultFormat',
				'hex',
			],
			[
				{ 'visible-formats': 'hex,rgb,hsl' },
				'visibleFormats',
				['hex', 'rgb', 'hsl'],
			],
			[
				{ id: 'color-picker' },
				'id',
				'color-picker',
			],
		])('syncs attributes to properties on render', async (attributes, property, propertyValue) => {
			const colorPicker = render({ attributes })
			await waitForRecomputations()

			expect(colorPicker[property]).toEqual(propertyValue)
		})

		test.each<[Record<string, string>, ColorPickerProperties, string | string[]]>([
			[
				{ 'alpha-channel': 'show' },
				'alphaChannel',
				'show',
			],
			[
				{ 'alpha-channel': 'hide' },
				'alphaChannel',
				'hide',
			],
			[
				{ color: '#fff' },
				'color',
				'#fff',
			],
			[
				{ 'default-format': 'hex' },
				'defaultFormat',
				'hex',
			],
			[
				{ 'visible-formats': 'hex,rgb,hsl' },
				'visibleFormats',
				['hex', 'rgb', 'hsl'],
			],
			[
				{ id: 'color-picker' },
				'id',
				'color-picker',
			],
		])('syncs attributes to properties post render', async (attributes, property, propertyValue) => {
			const colorPicker = render()
			await waitForRecomputations()

			for (const [attribute, value] of Object.entries(attributes)) {
				colorPicker.setAttribute(attribute, value)
			}
			await waitForRecomputations()

			expect(colorPicker[property]).toEqual(propertyValue)
		})

		test.each([
			['#f00', '#f00'],
			['rgb(255 50% 0 / 0.5)', '#ff800080'],
			['hsl(0 100% 50% / 1)', '#ff0000ff'],
			['hwb(180 33.333333333333336% 49.80392156862745% / 1)', '#558080ff'],
		])('renders hex input correctly for valid color attribute', async (color, expectedHexInputValue) => {
			const colorPicker = render({
				attributes: {
					color,
					'default-format': 'hex',
				},
			})
			await waitForRecomputations()

			const input = colorPicker.querySelector('.cp-color-input') as HTMLInputElement
			expect(input.value).toBe(expectedHexInputValue)
		})

		test.each([
			['#f00', '#f00'],
			['rgb(255 50% 0 / 0.5)', '#ff800080'],
			['hsl(0 100% 50% / 1)', '#ff0000ff'],
			['hwb(180 33.333333333333336% 49.80392156862745% / 1)', '#558080ff'],
		])('renders hex input correctly for valid color property', async (color, expectedHexInputValue) => {
			const colorPicker = render({
				properties: {
					color,
					defaultFormat: 'hex',
				},
			})
			await waitForRecomputations()

			const input = colorPicker.querySelector('.cp-color-input') as HTMLInputElement
			expect(input.value).toBe(expectedHexInputValue)
		})

		test('renders correctly with an invalid color attribute', async () => {
			const colorPicker = render({
				attributes: {
					color: '#ff',
					'default-format': 'hex',
				},
			})
			await waitForRecomputations()

			expect(colorPicker.color).toBe('#ff')

			const input = colorPicker.querySelector('.cp-color-input') as HTMLInputElement
			expect(input.value).toBe('#ffffffff')
		})

		test('renders correctly with an invalid color property', async () => {
			const colorPicker = render({
				properties: {
					color: '#ff',
					defaultFormat: 'hex',
				},
			})
			await waitForRecomputations()

			expect(colorPicker.color).toBe('#ff')

			const input = colorPicker.querySelector('.cp-color-input') as HTMLInputElement
			expect(input.value).toBe('#ffffffff')
		})

		test('falls back to visible color format when defaultFormat isn\'t a visible format', async () => {
			const colorPicker = render({
				attributes: {
					color: '#ff',
					'default-format': 'hsl',
					'visible-formats': 'hex',
				},
			})
			await waitForRecomputations()

			const input = colorPicker.querySelector('.cp-color-input') as HTMLInputElement
			expect(input.value).toBe('#ffffffff')
		})

		test.each([
			[{}, ['H', 'S', 'L']],
			[{ 'default-format': 'hex' }, ['Hex']],
			[{ 'default-format': 'hsl' }, ['H', 'S', 'L']],
			[{ 'default-format': 'hwb' }, ['H', 'W', 'B']],
			[{ 'default-format': 'rgb' }, ['R', 'G', 'B']],
		])('sets active color format correctly when providing default-format attribute', async (attributes, expectedLabels) => {
			const colorPicker = render({ attributes })
			await waitForRecomputations()

			const inputGroupMarkup = (colorPicker.querySelector('.cp-color-input-group') as HTMLElement).innerHTML
			for (const expectedLabel of expectedLabels) {
				expect(inputGroupMarkup).toContain(expectedLabel)
			}
		})

		test.each([
			[{ defaultFormat: 'hex' }, ['Hex']],
			[{ defaultFormat: 'hsl' }, ['H', 'S', 'L']],
			[{ defaultFormat: 'hwb' }, ['H', 'W', 'B']],
			[{ defaultFormat: 'rgb' }, ['R', 'G', 'B']],
		])('sets active color format correctly when providing defaultFormat property', async (properties, expectedLabels) => {
			const colorPicker = render({ properties })
			await waitForRecomputations()

			const inputGroupMarkup = (colorPicker.querySelector('.cp-color-input-group') as HTMLElement).innerHTML
			for (const expectedLabel of expectedLabels) {
				expect(inputGroupMarkup).toContain(expectedLabel)
			}
		})

		test.each([
			[
				'#f80c',
				{ r: 255, g: 136, b: 0, a: 0.8 },
			],
			[
				'hsl(180 50% 50% / 1)',
				{ r: 63.75, g: 191.25, b: 191.25, a: 1 },
			],
		])('recomputes colors when color attribute changes', async (color, expectedRgbColor) => {
			const colorPicker = render()
			await waitForRecomputations()

			const rgbColorSpy = vi.fn()
			function colorChangeListener (event: CustomEvent<ColorChangeDetail>) {
				rgbColorSpy(event.detail.colors.rgb)
			}
			colorPicker.addEventListener('color-change', colorChangeListener)

			colorPicker.setAttribute('color', color)
			await waitForRecomputations()
			expect(rgbColorSpy).toHaveBeenCalledWith(expectedRgbColor)

			colorPicker.setAttribute('color', '#fffc')
			await waitForRecomputations()
			expect(rgbColorSpy).toHaveBeenCalledWith({ r: 255, g: 255, b: 255, a: 0.8 })
		})

		test.each([
			[
				'#f80c',
				{ r: 255, g: 136, b: 0, a: 0.8 },
			],
			[
				'hsl(180 50% 50% / 1)',
				{ r: 63.75, g: 191.25, b: 191.25, a: 1 },
			],
		])('recomputes colors when color property changes', async (color, expectedRgbColor) => {
			const colorPicker = render()
			await waitForRecomputations()

			const rgbColorSpy = vi.fn()
			function colorChangeListener (event: CustomEvent<ColorChangeDetail>) {
				rgbColorSpy(event.detail.colors.rgb)
			}
			colorPicker.addEventListener('color-change', colorChangeListener)

			colorPicker.color = color
			await waitForRecomputations()
			expect(rgbColorSpy).toHaveBeenCalledWith(expectedRgbColor)

			colorPicker.color = '#fffc'
			await waitForRecomputations()
			expect(rgbColorSpy).toHaveBeenCalledWith({ r: 255, g: 255, b: 255, a: 0.8 })
		})

		test('id attributes are set correctly', async () => {
			const id = 'test-color-picker'
			const colorPicker = render({
				attributes: {
					id,
				},
			})
			await waitForRecomputations()

			expect(colorPicker.querySelector(`#${id}-hue-slider`)).not.toBe(null)
			expect(colorPicker.querySelector(`#${id}-alpha-slider`)).not.toBe(null)

			const formats = ['hsl', 'hwb', 'rgb']
			const formatSwitchButton = colorPicker.querySelector('.cp-switch-format-button') as HTMLButtonElement

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

				formatSwitchButton.click()
				await waitForRecomputations()
			}
		})

		test('id attributes are updated correctly', async () => {
			const defaultId = 'color-picker'
			const updatedId = 'test-color-picker'
			const colorPicker = render()
			await waitForRecomputations()

			expect(colorPicker.querySelector(`#${defaultId}-hue-slider`)).not.toBe(null)
			expect(colorPicker.querySelector(`#${updatedId}-hue-slider`)).toBe(null)

			colorPicker.id = updatedId
			await waitForRecomputations()

			expect(colorPicker.querySelector(`#${defaultId}-hue-slider`)).toBe(null)
			expect(colorPicker.querySelector(`#${updatedId}-hue-slider`)).not.toBe(null)
		})

		test.each([
			['show', true, 'hsl(180 0% 100% / 1)'],
			['hide', false, 'hsl(180 0% 100%)'],
		])('shows/hides correct elements when setting alpha-channel', async (alphaChannel, isElementVisible, expectedCssColor) => {
			const id = 'test-color-picker'
			const colorPicker = render({
				attributes: {
					id,
					'alpha-channel': alphaChannel,
				},
			})

			const cssColorSpy = vi.fn()
			function colorChangeListener (event: CustomEvent<ColorChangeDetail>) {
				cssColorSpy(event.detail.cssColor)
			}
			colorPicker.addEventListener('color-change', colorChangeListener)
			await waitForRecomputations()

			const alphaInput = colorPicker.querySelector(`#${id}-alpha-slider`)
			expect(alphaInput !== null).toBe(isElementVisible)

			const colorHslAlphaInput = colorPicker.querySelector(`#${id}-color-hsl-a`)
			expect(colorHslAlphaInput !== null).toBe(isElementVisible)

			const inputElement = colorPicker.querySelector(`#${id}-color-hsl-h`) as HTMLInputElement
			inputElement.value = '180'
			inputElement.dispatchEvent(new InputEvent('input'))
			await waitForRecomputations()

			expect(cssColorSpy).toHaveBeenCalledWith(expectedCssColor)
		})
	})

	describe('color space thumb interactions', () => {
		test('removes event listeners on unmount', async () => {
			const colorPicker = render()
			await waitForRecomputations()

			const spy = vi.fn()
			colorPicker.addEventListener('color-change', spy)

			const colorSpace = colorPicker.querySelector('.cp-color-space') as HTMLElement

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
			await waitForRecomputations()
			expect(spy).toHaveBeenCalledTimes(0)

			colorPicker.ownerDocument.dispatchEvent(new MouseEvent('mousemove', { buttons: 1, clientX: 1 }))
			await waitForRecomputations()
			expect(spy).toHaveBeenCalledTimes(1)

			colorPicker.ownerDocument.dispatchEvent(new MouseEvent('mousemove', { buttons: 1, clientX: 2 }))
			await waitForRecomputations()
			expect(spy).toHaveBeenCalledTimes(2)

			colorPicker.remove()

			colorPicker.ownerDocument.dispatchEvent(new MouseEvent('mousemove', { buttons: 1, clientX: 3 }))
			await waitForRecomputations()
			// Note that we assert here that the method hasn’t been called *again*.
			expect(spy).toHaveBeenCalledTimes(2)
		})

		test.each<Record<string, string>>([
			{},
			{
				color: '#ffffffff',
				'alpha-channel': 'show',
			},
			{
				color: '#ffffffff',
				'alpha-channel': 'hide',
			},
			{
				color: '#ffffff',
				'alpha-channel': 'show',
			},
			{
				color: '#ffffff',
				'alpha-channel': 'hide',
			},
			{
				color: '#fff',
				'alpha-channel': 'show',
			},
			{
				color: '#fff',
				'alpha-channel': 'hide',
			},
			{
				color: 'hsl(0, 0%, 100%, 1)',
				'alpha-channel': 'show',
			},
			{
				color: 'hsl(0, 0%, 100%, 1)',
				'alpha-channel': 'hide',
			},
		])('initializes color space and thumb correctly with default color value', async (attributes) => {
			const colorPicker = render({
				attributes: {
					'default-format': 'hex',
					...attributes,
				},
			})
			await waitForRecomputations()

			expect(colorPicker.style.getPropertyValue('--cp-color')).toBe('hsl(0 0% 100% / 1)')

			const thumb = colorPicker.querySelector('.cp-thumb') as HTMLElement
			expect(thumb.style.getPropertyValue('left')).toBe('0%')
			expect(thumb.style.getPropertyValue('bottom')).toBe('100%')
		})

		test('can initiate moving the color space thumb with a mouse', async () => {
			const colorPicker = render({
				attributes: {
					color: '#f80c',
				},
			})

			const spy = vi.fn()
			colorPicker.addEventListener('color-change', spy)
			await waitForRecomputations()

			expect(spy).toHaveBeenCalledTimes(1)

			const colorSpace = colorPicker.querySelector('.cp-color-space') as HTMLElement
			colorSpace.dispatchEvent(new MouseEvent('mousedown', { buttons: 1 }))
			colorPicker.ownerDocument.dispatchEvent(new MouseEvent('mousemove', { buttons: 1 }))
			await waitForRecomputations()

			expect(spy).toHaveBeenCalledTimes(2)
		})

		test('can initiate moving the color space thumb with a touch-based device', async () => {
			const colorPicker = render({
				attributes: {
					color: '#f80c',
				},
			})

			const spy = vi.fn()
			colorPicker.addEventListener('color-change', spy)
			await waitForRecomputations()

			expect(spy).toHaveBeenCalledTimes(1)

			const colorSpace = colorPicker.querySelector('.cp-color-space') as HTMLElement

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
					{ clientX: 0, clientY: 0 } as Touch,
				],
			}))
			colorPicker.ownerDocument.dispatchEvent(new TouchEvent('touchmove', {
				touches: [
					{ clientX: 1, clientY: 0 } as Touch,
				],
			}))
			await waitForRecomputations()

			expect(spy).toHaveBeenCalledTimes(3)

			colorSpace.dispatchEvent(new TouchEvent('touchstart', {
				touches: [
					{ clientX: 2, clientY: 0 } as Touch,
				],
			}))
			colorPicker.ownerDocument.dispatchEvent(new TouchEvent('touchmove', {
				touches: [
					{ clientX: 3, clientY: 0 } as Touch,
				],
			}))
			await waitForRecomputations()

			expect(spy).toHaveBeenCalledTimes(5)
		})

		test('can not move the color space thumb with the wrong key', async () => {
			const keydownEvent = {
				key: 'a',
				preventDefault: vi.fn(),
			}

			const colorPicker = render()
			await waitForRecomputations()

			const thumb = colorPicker.querySelector('.cp-thumb') as HTMLElement
			thumb.dispatchEvent(new KeyboardEvent('keydown', keydownEvent))

			expect(keydownEvent.preventDefault).not.toHaveBeenCalled()
		})

		test.each([
			['ArrowDown', false, 'v', 49],
			['ArrowDown', true, 'v', 40],
			['ArrowUp', false, 'v', 51],
			['ArrowUp', true, 'v', 60],
			['ArrowRight', false, 's', 51],
			['ArrowRight', true, 's', 60],
			['ArrowLeft', false, 's', 49],
			['ArrowLeft', true, 's', 40],
		])('can move the color space thumb with the %s key (holding shift: %s)', async (key, shiftKey, channel, expectedColorValue) => {
			const keydownEvent = {
				key,
				shiftKey,
				preventDefault: vi.fn(),
			}

			const colorPicker = render({
				attributes: {
					color: 'hwb(180, 25%, 50%, 1)',
				},
			})
			await waitForRecomputations()

			const spy = vi.fn()
			function colorChangeListener (event: CustomEvent<ColorChangeDetail>) {
				// @ts-ignore
				spy(event.detail.colors.hsv[channel])
			}
			colorPicker.addEventListener('color-change', colorChangeListener)

			// expect(keydownEvent.preventDefault).not.toHaveBeenCalled()

			const thumb = colorPicker.querySelector('.cp-thumb') as HTMLElement
			thumb.dispatchEvent(new KeyboardEvent('keydown', keydownEvent))
			await waitForRecomputations()

			// expect(keydownEvent.preventDefault).toHaveBeenCalled()
			expect(spy).toHaveBeenCalledWith(expectedColorValue)
		})
	})

	describe('hue & alpha range inputs', () => {
		test('can not increment/decrement in big steps without holding down shift', async () => {
			const colorPicker = render()
			await waitForRecomputations()

			const hueRangeInput = colorPicker.querySelector('#color-picker-hue-slider') as HTMLInputElement
			const originalInputValue = hueRangeInput.value

			hueRangeInput.dispatchEvent(new KeyboardEvent('keydown', {
				key: 'ArrowRight',
				shiftKey: false,
			}))

			expect(hueRangeInput.value).toBe(originalInputValue)
		})

		test.each([
			['decrement', 1, 'ArrowDown', '1'],
			['decrement', 3, 'ArrowDown', '1'],
			['decrement', 1, 'ArrowLeft', '1'],
			['increment', 1, 'ArrowUp', '9'],
			['increment', 1, 'ArrowRight', '9'],
			['increment', 3, 'ArrowRight', '27'],
		])('can %s range inputs %dx in big steps with %s', async (_, numberOfPresses, key, expectedValue) => {
			const colorPicker = render()
			await waitForRecomputations()

			const hueRangeInput = colorPicker.querySelector('#color-picker-hue-slider') as HTMLInputElement
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
			const expectedHueValue = 30

			const colorPicker = render()
			await waitForRecomputations()

			let channel = ''
			const spy = vi.fn()
			function colorChangeListener (event: CustomEvent<ColorChangeDetail>) {
				// @ts-ignore
				spy(event.detail.colors.hsv[channel])
			}
			colorPicker.addEventListener('color-change', colorChangeListener)

			const hueRangeInput = colorPicker.querySelector('#color-picker-hue-slider') as HTMLInputElement
			hueRangeInput.value = String(expectedHueValue)
			channel = 'h'
			hueRangeInput.dispatchEvent(new InputEvent('input'))
			await waitForRecomputations()

			expect(spy).toHaveBeenCalledTimes(1)
			expect(spy).toHaveBeenLastCalledWith(expectedHueValue)

			const expectedAlphaValue = 0.9

			const alphaRangeInput = colorPicker.querySelector('#color-picker-alpha-slider') as HTMLInputElement
			alphaRangeInput.value = String(expectedAlphaValue)
			channel = 'a'
			alphaRangeInput.dispatchEvent(new InputEvent('input'))
			await waitForRecomputations()

			expect(spy).toHaveBeenCalledTimes(2)
			expect(spy).toHaveBeenLastCalledWith(expectedAlphaValue)
		})
	})

	describe('copy button', () => {
		beforeAll(() => {
			Object.defineProperty(global.navigator, 'clipboard', {
				value: {
					writeText: () => { },
				},
			})
		})

		test.each([
			[
				{ 'default-format': 'rgb', 'alpha-channel': 'show' },
				'rgb(255 255 255 / 1)',
			],
			[
				{ 'default-format': 'hsl', 'alpha-channel': 'show' },
				'hsl(0 0% 100% / 1)',
			],
			[
				{ 'default-format': 'hwb', 'alpha-channel': 'show' },
				'hwb(0 100% 0% / 1)',
			],
			[
				{ 'default-format': 'hex', 'alpha-channel': 'show' },
				'#ffffffff',
			],
			[
				{ 'default-format': 'hex', 'alpha-channel': 'hide' },
				'#ffffff',
			],
		])('copy button copies %s format as %s', async (attributes, cssColor) => {
			vi.spyOn(global.navigator.clipboard, 'writeText').mockImplementation(vi.fn(() => Promise.resolve()))

			const colorPicker = render({ attributes })
			await waitForRecomputations()

			const copyButton = colorPicker.querySelector('.cp-copy-button') as HTMLButtonElement
			copyButton.click()

			expect(global.navigator.clipboard.writeText).toHaveBeenCalledWith(cssColor)
		})
	})

	describe('switch format button', () => {
		test('clicking switch format button cycles through active formats correctly', async () => {
			const colorPicker = render()
			await waitForRecomputations()

			const switchFormatButton = colorPicker.querySelector('.cp-switch-format-button') as HTMLButtonElement

			expect(colorPicker.querySelector('#color-picker-color-hsl-l') !== null).toBe(true)

			switchFormatButton.click()
			await waitForRecomputations()
			expect(colorPicker.querySelector('#color-picker-color-hwb-w') !== null).toBe(true)

			switchFormatButton.click()
			await waitForRecomputations()
			expect(colorPicker.querySelector('#color-picker-color-rgb-r') !== null).toBe(true)

			switchFormatButton.click()
			await waitForRecomputations()
			expect(colorPicker.querySelector('#color-picker-color-hex') !== null).toBe(true)

			switchFormatButton.click()
			await waitForRecomputations()
			expect(colorPicker.querySelector('#color-picker-color-hsl-l') !== null).toBe(true)
		})

		test('setting active format through property works', async () => {
			const colorPicker = render()
			await waitForRecomputations()

			expect(colorPicker.querySelector('#color-picker-color-hsl-l') !== null).toBe(true)

			colorPicker.activeFormat = 'hwb'
			await waitForRecomputations()
			expect(colorPicker.querySelector('#color-picker-color-hwb-w') !== null).toBe(true)

			colorPicker.activeFormat = 'rgb'
			await waitForRecomputations()
			expect(colorPicker.querySelector('#color-picker-color-rgb-r') !== null).toBe(true)

			colorPicker.activeFormat = 'hex'
			await waitForRecomputations()
			expect(colorPicker.querySelector('#color-picker-color-hex') !== null).toBe(true)

			colorPicker.activeFormat = 'hsl'
			await waitForRecomputations()
			expect(colorPicker.querySelector('#color-picker-color-hsl-l') !== null).toBe(true)
		})
	})

	describe('color value inputs', () => {
		test.each([
			[{ 'default-format': 'rgb' }, 'r', '127.'],
			[{ 'default-format': 'hsl' }, 's', 'a'],
			[{ 'default-format': 'hwb' }, 'b', '25.%'],
		])('updating a color input with an invalid value does not update the internal color data', async (attributes, channel, channelValue) => {
			const colorPicker = render({ attributes })
			await waitForRecomputations()

			const spy = vi.fn()
			colorPicker.addEventListener('color-change', spy)

			const input = colorPicker.querySelector(`#${colorPicker.id}-color-${attributes['default-format']}-${channel}`) as HTMLInputElement
			input.value = channelValue
			input.dispatchEvent(new InputEvent('input'))

			expect(spy).not.toHaveBeenCalled()
		})

		test.each([
			['abc'],
			['25%'],
		])('updating a hex color input with an invalid value does not update the internal color data', async (invalidHexColorString) => {
			const colorPicker = render({
				attributes: {
					'default-format': 'hex',
				},
			})
			await waitForRecomputations()

			const spy = vi.fn()
			colorPicker.addEventListener('color-change', spy)

			const input = colorPicker.querySelector('#color-picker-color-hex') as HTMLInputElement
			input.value = invalidHexColorString
			input.dispatchEvent(new InputEvent('input'))

			expect(spy).not.toHaveBeenCalled()
		})

		test.each([
			[{ 'default-format': 'rgb' }, 'r', '127.5'],
			[{ 'default-format': 'hsl' }, 's', '75%'],
			[{ 'default-format': 'hwb' }, 'b', '25.5%'],
		])('updating a %s color input with a valid value updates the internal color data', async (attributes, channel, channelValue) => {
			const colorPicker = render({ attributes })
			await waitForRecomputations()

			const spy = vi.fn()
			colorPicker.addEventListener('color-change', spy)

			const input = colorPicker.querySelector(`#${colorPicker.id}-color-${attributes['default-format']}-${channel}`) as HTMLInputElement
			input.value = channelValue
			input.dispatchEvent(new InputEvent('input'))
			await waitForRecomputations()

			expect(spy).toHaveBeenCalledTimes(1)
		})

		test.each([
			['#ff8800cc'],
		])('updating a %s color input with a valid value updates the internal color data', async (channelValue) => {
			const colorPicker = render({
				attributes: {
					'default-format': 'hex',
				},
			})
			await waitForRecomputations()

			const spy = vi.fn()
			colorPicker.addEventListener('color-change', spy)

			const input = colorPicker.querySelector('#color-picker-color-hex') as HTMLInputElement
			input.value = channelValue
			input.dispatchEvent(new InputEvent('input'))
			await waitForRecomputations()

			expect(spy).toHaveBeenCalledTimes(1)
		})
	})

	describe('color-change event', () => {
		test.each([
			[
				{
					color: '#ff99aacc',
					'default-format': 'hsl',
					'alpha-channel': 'show',
				},
				{
					cssColor: 'hsl(350 100% 80% / 0.8)',
					colors: {
						hex: '#ff99aacc',
						hsl: { h: 350, s: 100, l: 80, a: 0.8 },
						hsv: { h: 350, s: 39.99999999999999, v: 100, a: 0.8 },
						hwb: { h: 350, w: 60.00000000000001, b: 0, a: 0.8 },
						rgb: { r: 255, g: 153, b: 170, a: 0.8 },
					},
				},
			],
			[
				{
					color: '#f9ac',
					'default-format': 'hsl',
					'alpha-channel': 'show',
				},
				{
					cssColor: 'hsl(350 100% 80% / 0.8)',
					colors: {
						hex: '#f9ac',
						hsl: { h: 350, s: 100, l: 80, a: 0.8 },
						hsv: { h: 350, s: 39.99999999999999, v: 100, a: 0.8 },
						hwb: { h: 350, w: 60.00000000000001, b: 0, a: 0.8 },
						rgb: { r: 255, g: 153, b: 170, a: 0.8 },
					},
				},
			],
			[
				{
					color: '#ff99aacc',
					'default-format': 'hex',
					'alpha-channel': 'show',
				},
				{
					cssColor: '#ff99aacc',
					colors: {
						hex: '#ff99aacc',
						hsl: { h: 350, s: 100, l: 80, a: 0.8 },
						hsv: { h: 350, s: 39.99999999999999, v: 100, a: 0.8 },
						hwb: { h: 350, w: 60.00000000000001, b: 0, a: 0.8 },
						rgb: { r: 255, g: 153, b: 170, a: 0.8 },
					},
				},
			],
			[
				{
					color: '#f9ac',
					'default-format': 'hex',
					'alpha-channel': 'show',
				},
				{
					cssColor: '#f9ac',
					colors: {
						hex: '#f9ac',
						hsl: { h: 350, s: 100, l: 80, a: 0.8 },
						hsv: { h: 350, s: 39.99999999999999, v: 100, a: 0.8 },
						hwb: { h: 350, w: 60.00000000000001, b: 0, a: 0.8 },
						rgb: { r: 255, g: 153, b: 170, a: 0.8 },
					},
				},
			],
			[
				{
					color: '#ff99aacc',
					'default-format': 'hsl',
					'alpha-channel': 'hide',
				},
				{
					cssColor: 'hsl(350 100% 80%)',
					colors: {
						hex: '#ff99aaff',
						hsl: { h: 350, s: 100, l: 80, a: 1 },
						hsv: { h: 350, s: 39.99999999999999, v: 100, a: 1 },
						hwb: { h: 350, w: 60.00000000000001, b: 0, a: 1 },
						rgb: { r: 255, g: 153, b: 170, a: 1 },
					},
				},
			],
			[
				{
					color: '#f9ac',
					'default-format': 'hsl',
					'alpha-channel': 'hide',
				},
				{
					cssColor: 'hsl(350 100% 80%)',
					colors: {
						hex: '#f9af',
						hsl: { h: 350, s: 100, l: 80, a: 1 },
						hsv: { h: 350, s: 39.99999999999999, v: 100, a: 1 },
						hwb: { h: 350, w: 60.00000000000001, b: 0, a: 1 },
						rgb: { r: 255, g: 153, b: 170, a: 1 },
					},
				},
			],
			[
				{
					color: '#ff99aacc',
					'default-format': 'hex',
					'alpha-channel': 'hide',
				},
				{
					cssColor: '#ff99aa',
					colors: {
						hex: '#ff99aaff',
						hsl: { h: 350, s: 100, l: 80, a: 1 },
						hsv: { h: 350, s: 39.99999999999999, v: 100, a: 1 },
						hwb: { h: 350, w: 60.00000000000001, b: 0, a: 1 },
						rgb: { r: 255, g: 153, b: 170, a: 1 },
					},
				},
			],
			[
				{
					color: '#f9ac',
					'default-format': 'hex',
					'alpha-channel': 'hide',
				},
				{
					cssColor: '#f9a',
					colors: {
						hex: '#f9af',
						hsl: { h: 350, s: 100, l: 80, a: 1 },
						hsv: { h: 350, s: 39.99999999999999, v: 100, a: 1 },
						hwb: { h: 350, w: 60.00000000000001, b: 0, a: 1 },
						rgb: { r: 255, g: 153, b: 170, a: 1 },
					},
				},
			],
			[
				{
					color: '#23a96a',
					'default-format': 'hex',
					'alpha-channel': 'hide',
				},
				{
					cssColor: '#23a96a',
					colors: {
						hex: '#23a96aff',
						hsl: { h: 151.7910447761194, s: 65.68627450980392, l: 40, a: 1 },
						hsv: { h: 151.7910447761194, s: 79.28994082840237, v: 66.27450980392157, a: 1 },
						hwb: { h: 151.7910447761194, w: 13.725490196078432, b: 33.725490196078425, a: 1 },
						rgb: { r: 35, g: 169, b: 106, a: 1 },
					},
				},
			],
		])('emits correct data', async (attributes, expectedData) => {
			const colorPicker = render({ attributes })

			const spy = vi.fn()
			function colorChangeListener (event: CustomEvent<ColorChangeDetail>) {
				spy(event.detail)
			}
			colorPicker.addEventListener('color-change', colorChangeListener)
			await waitForRecomputations()

			expect(spy).toHaveBeenCalledWith(expectedData)
		})
	})

	describe('color inputs', () => {
		test.each([
			[
				{ color: '#12345678', 'alpha-channel': 'show' },
				'#12345678',
			],
			[
				{ color: '#12345678', 'alpha-channel': 'hide' },
				'#123456',
			],
			[
				{ color: '#123456', 'alpha-channel': 'show' },
				'#123456',
			],
			[
				{ color: '#123456', 'alpha-channel': 'hide' },
				'#123456',
			],
			[
				{ color: '#123a', 'alpha-channel': 'show' },
				'#123a',
			],
			[
				{ color: '#123a', 'alpha-channel': 'hide' },
				'#123',
			],
			[
				{ color: '#123', 'alpha-channel': 'show' },
				'#123',
			],
			[
				{ color: '#123', 'alpha-channel': 'hide' },
				'#123',
			],
		])('shows expected color for hex colors', async (attributes, expectedHexColor) => {
			const colorPicker = render({
				attributes: {
					'default-format': 'hex',
					...attributes,
				},
			})

			await waitForRecomputations()

			const input = colorPicker.querySelector('#color-picker-color-hex') as HTMLInputElement
			expect(input.value).toBe(expectedHexColor)
		})
	})

	describe('document interactions', () => {
		test('removing from and re-inserting into document adds and removes document event listeners', async () => {
			const numberOfDocumentLevelListeners = 4
			vi.spyOn(document, 'addEventListener')
			vi.spyOn(document, 'removeEventListener')

			const colorPicker = render()
			await waitForRecomputations()
			expect(document.addEventListener).toHaveBeenCalledTimes(numberOfDocumentLevelListeners)
			expect(document.removeEventListener).toHaveBeenCalledTimes(0)

			const removedColorPicker = document.body.removeChild(colorPicker)
			expect(document.addEventListener).toHaveBeenCalledTimes(numberOfDocumentLevelListeners)
			expect(document.removeEventListener).toHaveBeenCalledTimes(numberOfDocumentLevelListeners)

			document.body.appendChild(removedColorPicker)
			expect(document.addEventListener).toHaveBeenCalledTimes(2 * numberOfDocumentLevelListeners)
			expect(document.removeEventListener).toHaveBeenCalledTimes(numberOfDocumentLevelListeners)
		})
	})
})

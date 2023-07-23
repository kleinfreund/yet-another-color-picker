import { render } from 'lit-html'

import { clamp } from './utilities/clamp.js'
import { colorChannels } from './utilities/colorChannels.js'
import { colorPickerTemplate } from './templates/colorPickerTemplate.js'
import { colorsAreValueEqual } from './utilities/colorsAreValueEqual.js'
import { convert } from './utilities/convert.js'
import { formatAsCssColor } from './utilities/formatAsCssColor.js'
import { getNewThumbPosition } from './utilities/getNewThumbPosition.js'
import { isValidHexColor } from './utilities/isValidHexColor.js'
import { parsePropsColor } from './utilities/parsePropsColor.js'

declare global {
	interface HTMLElementEventMap {
		'color-change': CustomEvent<ColorChangeDetail>
	}

	interface HTMLElementTagNameMap {
		'color-picker': ColorPicker
	}
}

export type VisibleColorFormat = 'hex' | 'hsl' | 'hwb' | 'rgb'
export type ColorFormat = 'hex' | 'hsl' | 'hsv' | 'hwb' | 'rgb'
export type AlphaChannelProp = 'show' | 'hide'

export interface ColorPairHex { format: 'hex', color: string }
export interface ColorPairHsl { format: 'hsl', color: ColorHsl }
export interface ColorPairHsv { format: 'hsv', color: ColorHsv }
export interface ColorPairHwb { format: 'hwb', color: ColorHwb }
export interface ColorPairRgb { format: 'rgb', color: ColorRgb }

export type VisibleColorPair = ColorPairHex | ColorPairHsl | ColorPairHwb | ColorPairRgb
export type ColorPair = ColorPairHex | ColorPairHsl | ColorPairHsv | ColorPairHwb | ColorPairRgb

export type ColorMap = {
	hex: string
	hsl: ColorHsl
	hsv: ColorHsv
	hwb: ColorHwb
	rgb: ColorRgb
}

export type ColorChangeDetail = {
	colors: {
		hex: string
		hsl: ColorHsl
		hsv: ColorHsv
		hwb: ColorHwb
		rgb: ColorRgb
	}
	cssColor: string
}

export type ColorHsl = {
	h: number
	s: number
	l: number
	a: number
}

export type ColorHsv = {
	h: number
	s: number
	v: number
	a: number
}

export type ColorHwb = {
	h: number
	w: number
	b: number
	a: number
}

export type ColorRgb = {
	r: number
	g: number
	b: number
	a: number
}

type AttributeDefinition = {
	type: StringConstructor | ArrayConstructor
	property: ColorPickerProperties
}

type AttributeTypeMap = {
	id: string
	color: string
	'visible-formats': VisibleColorFormat[]
	'default-format': VisibleColorFormat
	'alpha-channel': AlphaChannelProp
}

type AttributeName = keyof AttributeTypeMap

const ATTRIBUTES: Record<AttributeName, AttributeDefinition> = {
	'alpha-channel': {
		type: String,
		property: 'alphaChannel',
	},

	color: {
		type: String,
		property: 'color',
	},

	'default-format': {
		type: String,
		property: 'defaultFormat',
	},

	id: {
		type: String,
		property: 'id',
	},

	'visible-formats': {
		type: Array,
		property: 'visibleFormats',
	},
}

export type ColorPickerProperties = keyof ColorPicker

const COLOR_FORMATS = ['hex', 'hsl', 'hsv', 'hwb', 'rgb'] as const satisfies ReadonlyArray<ColorFormat>

export class ColorPicker extends HTMLElement {
	static observedAttributes = Object.keys(ATTRIBUTES) as AttributeName[]

	/**
	 * Defines the custom element using a static initialization block. Does nothing if the custom element is already defined.
	 *
	 * Note that this block needs to be defined after defining `ColorPicker.observedAttributes`.
	 */
	static {
		if (window.customElements.get('color-picker') === undefined) {
			window.customElements.define('color-picker', ColorPicker)
		}
	}

	#activeFormat: VisibleColorFormat = 'hsl'
	#alphaChannel: AlphaChannelProp = 'show'
	#color: string | ColorHsl | ColorHsv | ColorHwb | ColorRgb = '#ffffffff'
	#defaultFormat: VisibleColorFormat = 'hsl'
	#id: string = 'color-picker'
	#visibleFormats: VisibleColorFormat[] = ['hex', 'hsl', 'hwb', 'rgb']

	#colorSpace: HTMLElement | null = null
	#thumb: HTMLElement | null = null

	/**
	 * Tracks whether a pointer originated from within the color space.
	 *
	 * Only if it did do we want to run the logic of dragging the color space thumb around.
	 */
	#hasPointerOriginatedInColorSpace: boolean = false

	/**
	 * The current color represented in all supported color formats.
	 */
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	#colors: any = {
		hex: '#ffffffff',
		hsl: { h: 0, s: 0, l: 1, a: 1 },
		hsv: { h: 0, s: 0, v: 1, a: 1 },
		hwb: { h: 0, w: 1, b: 0, a: 1 },
		rgb: { r: 1, g: 1, b: 1, a: 1 },
	}

	/**
	 * A list of color channels rendered as part of the color picker. Only used out of convenience for simplifying rendering of the channel-specific color inputs.
	 */
	#visibleChannels: string[] = ['h', 's', 'l', 'a']

	/**
	 * Input value of the color `input` element for the hexadecimal representation of the current color.
	 */
	#hexInputValue: string = '#ffffffff'

	#isProcessingRenderQueue: boolean = false

	get [Symbol.toStringTag] () {
		return 'ColorPicker'
	}

	/**
	 * The currently active format. Changed by interacting with the “Switch format” button.
	 */
	get activeFormat () {
		return this.#activeFormat
	}

	set activeFormat (activeFormat) {
		this.#activeFormat = activeFormat

		queueMicrotask(() => {
			this.#recomputeVisibleChannels()
			this.#queueRender()
		})
	}

	/**
	 * Whether to show input controls for a color’s alpha channel. If set to `'hide'`, the alpha range input and the alpha channel input are hidden, the “Copy color” button will copy a CSS color value without alpha channel, and the object emitted in a `color-change` event will have a `cssColor` property value without alpha channel.
	 */
	get alphaChannel () {
		return this.#alphaChannel
	}

	set alphaChannel (alphaChannel) {
		this.#alphaChannel = alphaChannel

		queueMicrotask(() => {
			this.#recomputeVisibleChannels()
			this.#recomputeHexInputValue()
			this.#queueRender()
		})
	}

	/**
	 * Sets the color of the color picker. You can pass any valid CSS color string.
	 */
	get color () {
		return this.#color
	}

	set color (color) {
		this.#color = color

		queueMicrotask(() => {
			this.#recomputeColors()
			this.#queueRender()
		})
	}

	/**
	 * The color format to show by default when rendering the color picker. Must be one of the formats specified in `visibleFormats`.
	 */
	get defaultFormat () {
		return this.#defaultFormat
	}

	set defaultFormat (defaultFormat) {
		this.#defaultFormat = defaultFormat
	}

	/**
	 * The ID value will be used to prefix all `input` elements’ `id` and `label` elements’ `for` attribute values. Make sure to set this if you use multiple instances of the component on a page.
	 */
	get id () {
		return this.#id
	}

	set id (id) {
		this.#id = id

		queueMicrotask(() => {
			this.#queueRender()
		})
	}

	/**
	 * A list of visible color formats. Controls for which formats the color `input` elements are shown and in which order the formats will be cycled through when activating the format switch button.
	 */
	get visibleFormats () {
		return this.#visibleFormats
	}

	set visibleFormats (visibleFormats) {
		this.#visibleFormats = visibleFormats
	}

	connectedCallback () {
		if (!this.isConnected) {
			return
		}

		this.ownerDocument.addEventListener('mousemove', this.#moveThumbWithMouse, { passive: false })
		this.ownerDocument.addEventListener('touchmove', this.#moveThumbWithTouch, { passive: false })
		this.ownerDocument.addEventListener('mouseup', this.#stopMovingThumb)
		this.ownerDocument.addEventListener('touchend', this.#stopMovingThumb)

		this.activeFormat = !this.visibleFormats.includes(this.defaultFormat)
			? this.visibleFormats[0] as VisibleColorFormat
			: this.defaultFormat
	}

	disconnectedCallback () {
		this.ownerDocument.removeEventListener('mousemove', this.#moveThumbWithMouse)
		this.ownerDocument.removeEventListener('touchmove', this.#moveThumbWithTouch)
		this.ownerDocument.removeEventListener('mouseup', this.#stopMovingThumb)
		this.ownerDocument.removeEventListener('touchend', this.#stopMovingThumb)
	}

	attributeChangedCallback (attribute: AttributeName, oldValue: string | null, newValue: string | null) {
		// Returns early if the prop has changed.
		if (oldValue === newValue) {
			return
		}

		this.#syncAttributeToProperty(attribute)
	}

	/**
	 * Syncs a changed attribute to its corresponding property.
	 */
	#syncAttributeToProperty (attribute: AttributeName) {
		const { property, type } = ATTRIBUTES[attribute]
		const attributeValue = this.getAttribute(attribute)

		let value
		if (attributeValue !== null) {
			switch (type) {
				case Array: {
					value = attributeValue.split(',').map((format) => format.trim())
					break
				}
				default: {
					value = attributeValue
					break
				}
			}

			// Only sets a property if it has changed.
			if (this[property] !== value) {
				Reflect.set(this, property, value)
			}
		}
	}

	#recomputeColors () {
		const pair = parsePropsColor(this.color)

		if (pair !== null) {
			this.#updateColors(pair)
		}
	}

	#updateColors ({ format, color }: ColorPair) {
		let normalizedColor = color
		if (this.alphaChannel === 'hide') {
			if (typeof color !== 'string') {
				color.a = 1
				normalizedColor = color
			} else if ([5, 9].includes(color.length)) {
				const alphaChannelLength = (color.length - 1) / 4
				normalizedColor = color.substring(0, color.length - alphaChannelLength) + 'f'.repeat(alphaChannelLength)
			} else if ([4, 7].includes(color.length)) {
				normalizedColor = color + 'f'.repeat((color.length - 1) / 3)
			}
		}

		if (!colorsAreValueEqual(this.#colors[format], normalizedColor)) {
			this.#colors[format] = normalizedColor

			for (const targetFormat of COLOR_FORMATS) {
				if (targetFormat !== format) {
					this.#colors[targetFormat] = convert(format, targetFormat, normalizedColor)
				}
			}

			// TODO: Find a better way to manage reactivity/recomputations
			this.#recomputeHexInputValue()
			this.#render()
			this.#emitColorChangeEvent()
		}
	}

	#emitColorChangeEvent () {
		const detail = this.#getColorChangeDetail()
		const event = new CustomEvent('color-change', { detail })
		this.dispatchEvent(event)
	}

	#getColorChangeDetail (): ColorChangeDetail {
		const excludeAlphaChannel = this.alphaChannel === 'hide'
		const cssColor = formatAsCssColor({ color: this.#colors[this.activeFormat], format: this.activeFormat }, excludeAlphaChannel)

		return {
			colors: this.#colors,
			cssColor,
		}
	}

	#setCssProps () {
		this.style.setProperty('--cp-hsl-h', String(this.#colors.hsl.h))
		this.style.setProperty('--cp-hsl-s', String(this.#colors.hsl.s))
		this.style.setProperty('--cp-hsl-l', String(this.#colors.hsl.l))
		this.style.setProperty('--cp-hsl-a', String(this.#colors.hsl.a))

		if (this.#colorSpace === null || this.#thumb === null) {
			return
		}

		// Sets a few CSS properties as inline styles because they're essential for the operation of the color picker.
		this.#colorSpace.style.position = 'relative'
		this.#colorSpace.style.backgroundColor = 'hsl(calc(var(--cp-hsl-h) * 360) 100% 50%)'
		this.#colorSpace.style.backgroundImage = 'linear-gradient(to top, #000, transparent), linear-gradient(to right, #fff, transparent)'

		this.#thumb.style.boxSizing = 'border-box'
		this.#thumb.style.position = 'absolute'
		this.#thumb.style.left = `${this.#colors.hsv.s * 100}%`
		this.#thumb.style.bottom = `${this.#colors.hsv.v * 100}%`
	}

	#recomputeVisibleChannels () {
		const allChannels = Object.keys(this.#colors[this.activeFormat])
		this.#visibleChannels = this.activeFormat !== 'hex' && this.alphaChannel === 'hide'
			? allChannels.slice(0, 3)
			: allChannels
	}

	#recomputeHexInputValue () {
		const hex = this.#colors.hex
		this.#hexInputValue = this.alphaChannel === 'hide' && [5, 9].includes(hex.length)
			? hex.substring(0, hex.length - (hex.length - 1) / 4)
			: hex
	}

	#queueRender () {
		if (this.#isProcessingRenderQueue) {
			return
		}

		this.#isProcessingRenderQueue = true
		this.#render()
		this.#isProcessingRenderQueue = false
	}

	/**
	 * Renders the component.
	 */
	#render () {
		if (!this.isConnected) {
			// Aborts rendering if the component is not yet or no longer connected.
			return
		}

		const templateResult = colorPickerTemplate(
			// Data
			this.id,
			this.activeFormat,
			this.#visibleChannels,
			this.#colors,
			this.#hexInputValue,
			this.alphaChannel,
			this.visibleFormats,
			// Listeners
			this.#getChannelAsCssValue,
			this.#changeInputValue,
			this.#copyColor,
			this.#handleSliderInput,
			this.#moveThumbWithArrows,
			this.#startMovingThumbWithMouse,
			this.#startMovingThumbWithTouch,
			this.#switchFormat,
			this.#updateColorValue,
			this.#updateHexColorValue,
		)
		this.classList.add('cp-color-picker')
		render(templateResult, this)

		this.#colorSpace = this.querySelector('.cp-color-space')
		this.#thumb = this.querySelector('.cp-thumb')
		this.#setCssProps()
	}

	#startMovingThumbWithMouse = (event: MouseEvent) => {
		this.#hasPointerOriginatedInColorSpace = true
		this.#moveThumbWithMouse(event)
	}

	#moveThumbWithMouse = (event: MouseEvent) => {
		if (
			event.buttons !== 1 ||
			this.#hasPointerOriginatedInColorSpace === false ||
			!(this.#colorSpace instanceof HTMLElement)
		) {
			return
		}

		this.#moveThumb(this.#colorSpace, event.clientX, event.clientY)
	}

	#startMovingThumbWithTouch = (event: TouchEvent) => {
		this.#hasPointerOriginatedInColorSpace = true
		this.#moveThumbWithTouch(event)
	}

	#moveThumbWithTouch = (event: TouchEvent) => {
		if (
			this.#hasPointerOriginatedInColorSpace === false ||
			!(this.#colorSpace instanceof HTMLElement)
		) {
			return
		}

		// Prevents touch events from dragging the page.
		event.preventDefault()

		const touchPoint = event.touches[0] as Touch

		this.#moveThumb(this.#colorSpace, touchPoint.clientX, touchPoint.clientY)
	}

	#moveThumb (colorSpace: HTMLElement, clientX: number, clientY: number) {
		const newThumbPosition = getNewThumbPosition(colorSpace, clientX, clientY)
		const hsvColor = Object.assign({}, this.#colors.hsv)
		hsvColor.s = newThumbPosition.x
		hsvColor.v = newThumbPosition.y

		this.#updateColors({ format: 'hsv', color: hsvColor })
	}

	#stopMovingThumb = () => {
		this.#hasPointerOriginatedInColorSpace = false
	}

	#moveThumbWithArrows = (event: KeyboardEvent) => {
		if (!['ArrowUp', 'ArrowRight', 'ArrowDown', 'ArrowLeft'].includes(event.key)) {
			return
		}

		event.preventDefault()
		const direction = ['ArrowLeft', 'ArrowDown'].includes(event.key) ? -1 : 1
		const channel = ['ArrowLeft', 'ArrowRight'].includes(event.key) ? 's' : 'v'
		const step = event.shiftKey ? 10 : 1
		const newColorValue = this.#colors.hsv[channel] + direction * step * 0.01
		const hsvColor = Object.assign({}, this.#colors.hsv)
		hsvColor[channel] = clamp(newColorValue, 0, 1)

		this.#updateColors({ format: 'hsv', color: hsvColor })
	}

	#changeInputValue = (event: KeyboardEvent) => {
		if (
			!['ArrowUp', 'ArrowRight', 'ArrowDown', 'ArrowLeft'].includes(event.key) ||
			!event.shiftKey
		) {
			return
		}

		const input = event.currentTarget as HTMLInputElement
		const step = parseFloat(input.step)
		const direction = ['ArrowLeft', 'ArrowDown'].includes(event.key) ? -1 : 1
		const value = parseFloat(input.value) + direction * step * 10
		const newValue = clamp(value, parseInt(input.min), parseInt(input.max))

		// Intentionally removes a single step from `newValue` because the default action associated with an `input` element’s `keydown` event will add one itself.
		input.value = String(newValue - direction * step)
	}

	#handleSliderInput = (event: Event, channel: 'h' | 'a') => {
		const input = event.currentTarget as HTMLInputElement
		const hsvColor = Object.assign({}, this.#colors.hsv)
		hsvColor[channel] = parseInt(input.value) / parseInt(input.max)

		this.#updateColors({ format: 'hsv', color: hsvColor })
	}

	#updateHexColorValue = (event: Event) => {
		const input = event.target as HTMLInputElement

		if (isValidHexColor(input.value)) {
			this.#updateColors({ format: 'hex', color: input.value })
		}
	}

	#updateColorValue = (event: Event, channel: string) => {
		const input = event.target as HTMLInputElement

		const color = Object.assign({}, this.#colors[this.activeFormat])
		const value = colorChannels[this.activeFormat][channel].from(input.value)

		if (Number.isNaN(value) || value === undefined) {
			// This means that the input value does not result in a valid CSS value.
			return
		}

		color[channel] = value

		this.#updateColors({ format: this.activeFormat, color })
	}

	/**
	 * Copies the current color (determined by the active color format).
	 *
	 * For example, if the active color format is HSL, the copied text will be a valid CSS color in HSL format.
	 *
	 * Only works in secure browsing contexts (i.e. HTTPS).
	 *
	 * @returns the promise returned by calling `window.navigator.clipboard.writeText`.
	 */
	copyColor () {
		return this.#copyColor()
	}

	#copyColor = () => {
		const activeColor = this.#colors[this.activeFormat]
		const excludeAlphaChannel = this.alphaChannel === 'hide'
		const cssColor = formatAsCssColor({ color: activeColor, format: this.activeFormat }, excludeAlphaChannel)

		// Note: the Clipboard API’s `writeText` method can throw a `DOMException` error in case of insufficient write permissions (see https://w3c.github.io/clipboard-apis/#dom-clipboard-writetext). This error is explicitly not handled here so that users of this package can see the original error in the console.
		return window.navigator.clipboard.writeText(cssColor)
	}

	/**
	 * Sets the next active color format by cycling through `colorPicker.visibleFormats`.
	 */
	switchFormat () {
		return this.#switchFormat()
	}

	#switchFormat = () => {
		const activeFormatIndex = this.visibleFormats.findIndex((format) => format === this.activeFormat)
		const newFormatIndex = (activeFormatIndex + 1) % this.visibleFormats.length

		this.activeFormat = this.visibleFormats[newFormatIndex] as VisibleColorFormat
	}

	/**
	 * Wrapper function. Converts a color channel’s value into its CSS value representation.
	 */
	#getChannelAsCssValue = (channel: string): string => {
		const format = this.activeFormat
		return colorChannels[format][channel].to(this.#colors[format][channel])
	}
}

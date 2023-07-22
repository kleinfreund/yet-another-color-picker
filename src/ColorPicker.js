import { render } from 'lit-html'
/** @typedef {import('lit-html').TemplateResult} TemplateResult */

import { clamp } from './utilities/clamp.js'
import { colorChannels } from './utilities/color-channels.js'
import { colorPickerTemplate } from './templates/colorPickerTemplate.js'
import { colorsAreValueEqual } from './utilities/colors-are-value-equal.js'
import { conversions } from './utilities/conversions.js'
import { copyColorObject } from './utilities/copy-color-object.js'
import { formatAsCssColor } from './utilities/format-as-css-color.js'
import { getNewThumbPosition } from './utilities/getNewThumbPosition.js'
import { isValidHexColor } from './utilities/is-valid-hex-color.js'
import { parsePropsColor } from './utilities/parse-props-color.js'
/** @typedef {import('../types/index.d').AlphaChannelProp} AlphaChannelProp */
/** @typedef {import('../types/index.d').ColorChangeDetail} ColorChangeDetail */
/** @typedef {import('../types/index.d').ColorFormat} ColorFormat */
/** @typedef {import('../types/index.d').ColorHsl} ColorHsl */
/** @typedef {import('../types/index.d').ColorHsv} ColorHsv */
/** @typedef {import('../types/index.d').ColorHwb} ColorHwb */
/** @typedef {import('../types/index.d').ColorRgb} ColorRgb */
/** @typedef {import('../types/index.d').ColorPickerProperties} ColorPickerProperties */
/** @typedef {import('../types/index.d').VisibleColorFormat} VisibleColorFormat */

/**
 * @typedef {object} AttributeDefinition
 * @property {StringConstructor | ArrayConstructor} type
 * @property {ColorPickerProperties} property
 */

/**
 * @typedef {object} AttributeTypeMap
 * @property {string} id
 * @property {string} data-color
 * @property {VisibleColorFormat[]} data-visible-formats
 * @property {VisibleColorFormat} data-default-format
 * @property {AlphaChannelProp} data-alpha-channel
 */

/** @typedef {keyof AttributeTypeMap} AttributeName */

/** @typedef {Record<AttributeName, AttributeDefinition>} AttributesMap */

/** @type {AttributesMap} */
const ATTRIBUTES = {
	'data-alpha-channel': {
		type: String,
		property: 'alphaChannel',
	},

	'data-color': {
		type: String,
		property: 'color',
	},

	'data-default-format': {
		type: String,
		property: 'defaultFormat',
	},

	id: {
		type: String,
		property: 'id',
	},

	'data-visible-formats': {
		type: Array,
		property: 'visibleFormats',
	},
}

export class ColorPicker extends HTMLElement {
	/**
	 * @type {AttributeName[]}
	 */
	static observedAttributes = /** @type {AttributeName[]} */ (Object.keys(ATTRIBUTES))

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

	/** @type {VisibleColorFormat} */ #activeFormat = 'hsl'
	/** @type {AlphaChannelProp} */ #alphaChannel = 'show'
	/** @type {string | ColorHsl | ColorHsv | ColorHwb | ColorRgb} */ #color = '#ffffffff'
	/** @type {VisibleColorFormat} */ #defaultFormat = 'hsl'
	/** @type {string} */ #id = 'color-picker'
	/** @type {VisibleColorFormat[]} */ #visibleFormats = ['hex', 'hsl', 'hwb', 'rgb']

	/** @type {HTMLElement | null} */ #colorSpace = null
	/** @type {HTMLElement | null} */ #thumb = null

	/**
	 * Tracks whether a pointer originated from within the color space.
	 *
	 * Only if it did do we want to run the logic of dragging the color space thumb around.
	 *
	 * @type {boolean}
	 */
	#hasPointerOriginatedInColorSpace = false

	/**
	 * The current color represented in all supported color formats.
	 *
	 * @type {any}
	 */
	#colors = {
		hex: '#ffffffff',
		hsl: { h: 0, s: 0, l: 1, a: 1 },
		hsv: { h: 0, s: 0, v: 1, a: 1 },
		hwb: { h: 0, w: 1, b: 0, a: 1 },
		rgb: { r: 1, g: 1, b: 1, a: 1 },
	}

	/**
	 * A list of color channels rendered as part of the color picker. Only used out of convenience for simplifying rendering of the channel-specific color inputs.
	 *
	 * @type {string[]}
	 */
	#visibleChannels = ['h', 's', 'l', 'a']

	/**
	 * Input value of the color `input` element for the hexadecimal representation of the current color.
	 *
	 * @type {string}
	 */
	#hexInputValue = '#ffffffff'

	/**
	 * @type {boolean}
	 */
	#isProcessingRenderQueue = false

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

		for (const attribute of ColorPicker.observedAttributes) {
			this.#syncAttributeToProperty(attribute)
		}

		this.activeFormat = !this.visibleFormats.includes(this.defaultFormat)
			? /** @type {VisibleColorFormat} */ (this.visibleFormats[0])
			: this.defaultFormat
	}

	disconnectedCallback () {
		this.ownerDocument.removeEventListener('mousemove', this.#moveThumbWithMouse)
		this.ownerDocument.removeEventListener('touchmove', this.#moveThumbWithTouch)
		this.ownerDocument.removeEventListener('mouseup', this.#stopMovingThumb)
		this.ownerDocument.removeEventListener('touchend', this.#stopMovingThumb)
	}

	/**
	 * @param {AttributeName} attribute
	 * @param {string | null} oldValue
	 * @param {string | null} newValue
	 */
	attributeChangedCallback (attribute, oldValue, newValue) {
		// Returns early if the prop has changed.
		if (oldValue === newValue) {
			return
		}

		this.#syncAttributeToProperty(attribute)
	}

	/**
	 * Syncs a changed attribute to its corresponding property.
	 *
	 * @param {AttributeName} attribute
	 */
	#syncAttributeToProperty (attribute) {
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
		const result = parsePropsColor(this.color)

		if (result !== null) {
			this.#updateColors(result.format, result.color)
		}
	}

	/**
	 * @param {ColorFormat} format
	 * @param {string | ColorHsl | ColorHsv | ColorHwb | ColorRgb} color
	 */
	#updateColors (format, color) {
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

			for (const [targetFormat, convert] of conversions[format]) {
				this.#colors[targetFormat] = convert(this.#colors[format])
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

	/**
	 * @returns {ColorChangeDetail}
	 */
	#getColorChangeDetail () {
		const excludeAlphaChannel = this.alphaChannel === 'hide'
		const cssColor = formatAsCssColor(this.#colors[this.activeFormat], this.activeFormat, excludeAlphaChannel)

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

	/**
	 * @param {MouseEvent} event
	 */
	#startMovingThumbWithMouse = (event) => {
		this.#hasPointerOriginatedInColorSpace = true
		this.#moveThumbWithMouse(event)
	}

	/**
	 * @param {MouseEvent} event
	 */
	#moveThumbWithMouse = (event) => {
		if (
			event.buttons !== 1 ||
			this.#hasPointerOriginatedInColorSpace === false ||
			!(this.#colorSpace instanceof HTMLElement)
		) {
			return
		}

		this.#moveThumb(this.#colorSpace, event.clientX, event.clientY)
	}

	/**
	 * @param {TouchEvent} event
	 */
	#startMovingThumbWithTouch = (event) => {
		this.#hasPointerOriginatedInColorSpace = true
		this.#moveThumbWithTouch(event)
	}

	/**
	 * @param {TouchEvent} event
	 */
	#moveThumbWithTouch = (event) => {
		if (
			this.#hasPointerOriginatedInColorSpace === false ||
			!(this.#colorSpace instanceof HTMLElement)
		) {
			return
		}

		// Prevents touch events from dragging the page.
		event.preventDefault()

		const touchPoint = /** @type {Touch} */ (event.touches[0])

		this.#moveThumb(this.#colorSpace, touchPoint.clientX, touchPoint.clientY)
	}

	/**
	 * @param {HTMLElement} colorSpace
	 * @param {number} clientX
	 * @param {number} clientY
	 */
	#moveThumb (colorSpace, clientX, clientY) {
		const newThumbPosition = getNewThumbPosition(colorSpace, clientX, clientY)
		const hsvColor = copyColorObject(this.#colors.hsv)
		hsvColor.s = newThumbPosition.x
		hsvColor.v = newThumbPosition.y

		this.#updateColors('hsv', hsvColor)
	}

	#stopMovingThumb = () => {
		this.#hasPointerOriginatedInColorSpace = false
	}

	/**
	 * @param {KeyboardEvent} event
	 */
	#moveThumbWithArrows = (event) => {
		if (!['ArrowUp', 'ArrowRight', 'ArrowDown', 'ArrowLeft'].includes(event.key)) {
			return
		}

		event.preventDefault()
		const direction = ['ArrowLeft', 'ArrowDown'].includes(event.key) ? -1 : 1
		const channel = ['ArrowLeft', 'ArrowRight'].includes(event.key) ? 's' : 'v'
		const step = event.shiftKey ? 10 : 1
		const newColorValue = this.#colors.hsv[channel] + direction * step * 0.01
		const hsvColor = copyColorObject(this.#colors.hsv)
		hsvColor[channel] = clamp(newColorValue, 0, 1)

		this.#updateColors('hsv', hsvColor)
	}

	/**
	 * @param {KeyboardEvent} event
	 */
	#changeInputValue = (event) => {
		if (
			!['ArrowUp', 'ArrowRight', 'ArrowDown', 'ArrowLeft'].includes(event.key) ||
			!event.shiftKey
		) {
			return
		}

		const input = /** @type {HTMLInputElement} */ (event.currentTarget)
		const step = parseFloat(input.step)
		const direction = ['ArrowLeft', 'ArrowDown'].includes(event.key) ? -1 : 1
		const value = parseFloat(input.value) + direction * step * 10
		const newValue = clamp(value, parseInt(input.min), parseInt(input.max))

		// Intentionally removes a single step from `newValue` because the default action associated with an `input` element’s `keydown` event will add one itself.
		input.value = String(newValue - direction * step)
	}

	/**
	 * @param {Event} event
	 * @param {'h' | 'a'} channel
	 */
	#handleSliderInput = (event, channel) => {
		const input = /** @type {HTMLInputElement} */ (event.currentTarget)
		const hsvColor = copyColorObject(this.#colors.hsv)
		hsvColor[channel] = parseInt(input.value) / parseInt(input.max)

		this.#updateColors('hsv', hsvColor)
	}

	/**
	 * @param {Event} event
	 */
	#updateHexColorValue = (event) => {
		const input = /** @type {HTMLInputElement} */ (event.target)

		if (isValidHexColor(input.value)) {
			this.#updateColors('hex', input.value)
		}
	}

	/**
	 * @param {Event} event
	 * @param {string} channel
	 */
	#updateColorValue = (event, channel) => {
		const input = /** @type {HTMLInputElement} */ (event.target)

		const color = copyColorObject(this.#colors[this.activeFormat])
		const value = colorChannels[this.activeFormat][channel].from(input.value)

		if (Number.isNaN(value) || value === undefined) {
			// This means that the input value does not result in a valid CSS value.
			return
		}

		color[channel] = value

		this.#updateColors(this.activeFormat, color)
	}

	/**
	 * Copies the current color (determined by the active color format).
	 *
	 * For example, if the active color format is HSL, the copied text will be a valid CSS color in HSL format.
	 *
	 * Only works in secure browsing contexts (i.e. HTTPS).
	 *
	 * @returns {Promise<void>}
	 */
	#copyColor = () => {
		const activeColor = this.#colors[this.activeFormat]
		const excludeAlphaChannel = this.alphaChannel === 'hide'
		const cssColor = formatAsCssColor(activeColor, this.activeFormat, excludeAlphaChannel)

		// Note: the Clipboard API’s `writeText` method can throw a `DOMException` error in case of insufficient write permissions (see https://w3c.github.io/clipboard-apis/#dom-clipboard-writetext). This error is explicitly not handled here so that users of this package can see the original error in the console.
		return window.navigator.clipboard.writeText(cssColor)
	}

	/**
	 * Sets the next active color format by cycling through the visible color formats.
	 */
	#switchFormat = () => {
		const activeFormatIndex = this.visibleFormats.findIndex((format) => format === this.activeFormat)
		const newFormatIndex = (activeFormatIndex + 1) % this.visibleFormats.length

		this.activeFormat = /** @type {VisibleColorFormat} */ (this.visibleFormats[newFormatIndex])
	}

	/**
	 * Wrapper function. Converts a color channel’s value into its CSS value representation.
	 *
	 * @param {string} channel
	 * @returns {string}
	 */
	#getChannelAsCssValue = (channel) => {
		const format = this.activeFormat
		return colorChannels[format][channel].to(this.#colors[format][channel])
	}
}

import { html, render } from 'lit-html'
/** @typedef {import('lit-html').TemplateResult} TemplateResult */

import { clamp } from './utilities/clamp.js'
import { colorChannels } from './utilities/color-channels.js'
import { colorsAreValueEqual } from './utilities/colors-are-value-equal.js'
import { conversions } from './utilities/conversions.js'
import { copyColorObject } from './utilities/copy-color-object.js'
import { formatAsCssColor } from './utilities/format-as-css-color.js'
import { isValidHexColor } from './utilities/is-valid-hex-color.js'
import { parsePropsColor } from './utilities/parse-props-color.js'
/** @typedef {import('../types/index.d').AlphaChannelProp} AlphaChannelProp */
/** @typedef {import('../types/index.d').ColorChangeDetail} ColorChangeDetail */
/** @typedef {import('../types/index.d').ColorFormat} ColorFormat */
/** @typedef {import('../types/index.d').ColorHsl} ColorHsl */
/** @typedef {import('../types/index.d').ColorHsv} ColorHsv */
/** @typedef {import('../types/index.d').ColorHwb} ColorHwb */
/** @typedef {import('../types/index.d').ColorRgb} ColorRgb */
/** @typedef {import('../types/index.d').PropDefinition} PropDefinition */
/** @typedef {import('../types/index.d').PropMap} PropMap */
/** @typedef {import('../types/index.d').PropName} PropName */
/** @typedef {import('../types/index.d').PropTypeMap} PropTypeMap */
/** @typedef {import('../types/index.d').VisibleColorFormat} VisibleColorFormat */

/** @type {PropMap} */
const PROPS = {
	'data-alpha-channel': {
		type: String,
		default: () => 'show',
	},

	'data-color': {
		type: String,
		default: () => '#ffffffff',
	},

	'data-default-format': {
		type: String,
		default: () => 'hsl',
	},

	'data-visible-formats': {
		type: Array,
		default: () => ['hex', 'hsl', 'hwb', 'rgb'],
	},

	id: {
		type: String,
		default: () => 'color-picker',
	},
}

// Constructs an *iterable* list of entries *with* appropriate types.
const PROP_DEFINITIONS = /** @type {[PropName, PropDefinition][]} */ (Object.entries(PROPS))

export class ColorPicker extends HTMLElement {
	/**
	 * The component's props.
	 *
	 * @type {PropName[]}
	 */
	static observedAttributes = /** @type {PropName[]} */ (Object.keys(PROPS))

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
	 * @type {boolean}
	 */
	#isDefined = false

	/**
	 * The currently active format. Can be changed by the user using the “Switch format” button.
	 *
	 * @type {VisibleColorFormat}
	 */
	#activeFormat = 'hsl'

	/**
	 * A list of color channels rendered as part of the color picker. Only used out of convenience for simplifying rendering of the channel-specific color inputs.
	 *
	 * @type {string[]}
	 */
	#visibleChannels = []

	/**
	 * Input value of the color `input` element for the hexadecimal representation of the current color.
	 *
	 * @type {string}
	 */
	#hexInputValue = ''

	/**
	 * @type {Array<{ name: PropName, value: string | null }>}
	 */
	#recomputeQueue = []

	constructor () {
		super()

		window.customElements.whenDefined(this.localName).then(() => {
			this.#isDefined = true
		})
	}

	get [Symbol.toStringTag] () {
		return 'ColorPicker'
	}

	connectedCallback () {
		if (!this.isConnected) {
			return
		}

		this.ownerDocument.addEventListener('mousemove', this.#moveThumbWithMouse, { passive: false })
		this.ownerDocument.addEventListener('touchmove', this.#moveThumbWithTouch, { passive: false })
		this.ownerDocument.addEventListener('mouseup', this.#stopMovingThumb)
		this.ownerDocument.addEventListener('touchend', this.#stopMovingThumb)

		const visibleFormats = this.#getPropValue('data-visible-formats')
		const defaultFormat = this.#getPropValue('data-default-format')
		this.#activeFormat = !visibleFormats.includes(defaultFormat) ? /** @type {VisibleColorFormat} */ (visibleFormats[0]) : defaultFormat

		for (const name of ColorPicker.observedAttributes) {
			this.#queueRecomputation(name, this.#getPropValue(name))
		}
	}

	disconnectedCallback () {
		this.ownerDocument.removeEventListener('mousemove', this.#moveThumbWithMouse)
		this.ownerDocument.removeEventListener('touchmove', this.#moveThumbWithTouch)
		this.ownerDocument.removeEventListener('mouseup', this.#stopMovingThumb)
		this.ownerDocument.removeEventListener('touchend', this.#stopMovingThumb)
	}

	/**
	 * @param {PropName} name
	 * @param {string | null} oldValue
	 * @param {string | null} newValue
	 */
	attributeChangedCallback (name, oldValue, newValue) {
		// console.info('> attributeChangedCallback', name, oldValue, newValue)
		// Returns early if the prop has changed or if the component wasn't upgraded, yet.
		if (oldValue === newValue || !this.#isDefined) {
			return
		}

		this.#queueRecomputation(name, newValue)
	}

	/**
	 * @param {PropName} name
	 * @param {any} value
	 */
	#queueRecomputation (name, value) {
		this.#recomputeQueue.push({ name, value })

		queueMicrotask(() => {
			this.#processRecomputeQueue()
		})
	}

	#processRecomputeQueue () {
		// console.info('> Recompute')
		if (this.#recomputeQueue.length === 0) {
			// console.info('>> Abort recompute')
			return
		}

		// console.info('>> Actually recomputing!')

		for (const { name, value } of this.#recomputeQueue) {
			this.#recomputeState(name, value)
		}

		this.#recomputeQueue = []

		// (Re-)renders the component.
		this.#render()
	}

	/**
	 * @param {PropName} name
	 * @param {any} value
	 */
	#recomputeState (name, value) {
		if (name === 'data-color') {
			const color = value !== null ? /** @type {string} */ (value) : this.#getPropDefaultValue(name)

			this.#setColorFromProp(color)
		} else if (name === 'data-alpha-channel') {
			const alphaChannel = value !== null ? /** @type {AlphaChannelProp} */ (value) : this.#getPropDefaultValue(name)

			this.#recomputeVisibleChannels(alphaChannel)
			this.#recomputeHexInputValue(alphaChannel)
		}
	}

	/**
	 * @param {string} color
	 */
	#setColorFromProp (color) {
		const result = parsePropsColor(color)

		if (result !== null) {
			this.#setColor(result.format, result.color)
		}
	}

	/**
	 * May mutate `color`.
	 *
	 * @param {ColorFormat} format
	 * @param {string | ColorHsl | ColorHsv | ColorHwb | ColorRgb} color
	 */
	#setColor (format, color) {
		let normalizedColor = color
		const alphaChannel = this.#getPropValue('data-alpha-channel')
		if (alphaChannel === 'hide') {
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
			this.#applyColorUpdates(format, normalizedColor)
			this.#emitColorChangeEvent()
		}
	}

	/**
	 * Updates the internal color representation for a given format and recomputes all colors for other formats.
	 *
	 * @param {ColorFormat} sourceFormat
	 * @param {string | ColorHsl | ColorHsv | ColorHwb | ColorRgb} newColor
	 */
	#applyColorUpdates (sourceFormat, newColor) {
		this.#colors[sourceFormat] = newColor

		for (const [format, convert] of conversions[sourceFormat]) {
			this.#colors[format] = convert(this.#colors[sourceFormat])
		}

		// TODO: Find a better way to manage reactivity/recomputations
		this.#recomputeHexInputValue(this.#getPropValue('data-alpha-channel'))
		this.#render()
	}

	#emitColorChangeEvent () {
		const detail = this.#getColorChangeDetail()
		const event = new CustomEvent('color-change', { detail })
		this.dispatchEvent(event)
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

	/**
	 * @param {AlphaChannelProp} alphaChannel
	 */
	#recomputeVisibleChannels (alphaChannel) {
		const allChannels = Object.keys(this.#colors[this.#activeFormat])
		this.#visibleChannels = this.#activeFormat !== 'hex' && alphaChannel === 'hide'
			? allChannels.slice(0, 3)
			: allChannels
	}

	/**
	 * @param {AlphaChannelProp} alphaChannel
	 */
	#recomputeHexInputValue (alphaChannel) {
		const hex = this.#colors.hex
		this.#hexInputValue = alphaChannel === 'hide' && [5, 9].includes(hex.length)
			? hex.substring(0, hex.length - (hex.length - 1) / 4)
			: hex
	}

	/**
	 * Renders the component.
	 */
	#render () {
		// console.info('> render')
		if (!this.isConnected) {
			// Aborts rendering if the component is not yet or no longer connected.
			// console.info('>> Aborting rendering (not connected)')
			return
		}

		this.#validateProps()

		const templateResult = colorPickerTemplate(
			// Data
			this.id,
			this.#activeFormat,
			this.#visibleChannels,
			this.#colors,
			this.#hexInputValue,
			this.#getPropValue('data-alpha-channel'),
			this.#getPropValue('data-visible-formats'),
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
		this.classList.add(prefix`color-picker`)
		render(templateResult, this)

		this.#colorSpace = this.querySelector('.' + prefix`color-space`)
		this.#thumb = this.querySelector('.' + prefix`thumb`)
		this.#setCssProps()
	}

	/**
	 * Validates the component's props.
	 *
	 * **Side effect**: Sets attributes of omitted optional props to their default values.
	 */
	#validateProps () {
		for (const [propName, propDefinition] of PROP_DEFINITIONS) {
			const hasProp = this.hasAttribute(propName)

			if (propDefinition.isRequired && !hasProp) {
				throw this.#createError(`Prop “${propName}” is required but wasn't provided.`)
			}

			// Let's set the attribute's of optional props which weren't provided to their respective default values. This way, the current state of the component can be carried around in the DOM (my hope is that this allows the component do be moved to another part of the DOM without losing that information).
			if (!propDefinition.isRequired && !hasProp) {
				this.setAttribute(propName, propDefinition.default?.())
			}
		}
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

		this.#setColor('hsv', hsvColor)
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

		this.#setColor('hsv', hsvColor)
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

		this.#setColor('hsv', hsvColor)
	}

	/**
	 * @param {Event} event
	 */
	#updateHexColorValue = (event) => {
		const input = /** @type {HTMLInputElement} */ (event.target)

		if (isValidHexColor(input.value)) {
			this.#setColor('hex', input.value)
		}
	}

	/**
	 * @param {Event} event
	 * @param {string} channel
	 */
	#updateColorValue = (event, channel) => {
		const input = /** @type {HTMLInputElement} */ (event.target)

		const color = copyColorObject(this.#colors[this.#activeFormat])
		const value = colorChannels[this.#activeFormat][channel].from(input.value)

		if (Number.isNaN(value) || value === undefined) {
			// This means that the input value does not result in a valid CSS value.
			return
		}

		color[channel] = value

		this.#setColor(this.#activeFormat, color)
	}

	/**
	 * @returns {ColorChangeDetail}
	 */
	#getColorChangeDetail () {
		const excludeAlphaChannel = this.#getPropValue('data-alpha-channel') === 'hide'
		const cssColor = formatAsCssColor(this.#colors[this.#activeFormat], this.#activeFormat, excludeAlphaChannel)

		return {
			colors: this.#colors,
			cssColor,
		}
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
		const activeColor = this.#colors[this.#activeFormat]
		const excludeAlphaChannel = this.#getPropValue('data-alpha-channel') === 'hide'
		const cssColor = formatAsCssColor(activeColor, this.#activeFormat, excludeAlphaChannel)

		// Note: the Clipboard API’s `writeText` method can throw a `DOMException` error in case of insufficient write permissions (see https://w3c.github.io/clipboard-apis/#dom-clipboard-writetext). This error is explicitly not handled here so that users of this package can see the original error in the console.
		return window.navigator.clipboard.writeText(cssColor)
	}

	/**
	 * Sets the next active color format by cycling through the visible color formats.
	 */
	#switchFormat = () => {
		const visibleFormats = this.#getPropValue('data-visible-formats')
		const activeFormatIndex = visibleFormats.findIndex((format) => format === this.#activeFormat)
		const newFormatIndex = (activeFormatIndex + 1) % visibleFormats.length

		this.#activeFormat = /** @type {VisibleColorFormat} */ (visibleFormats[newFormatIndex])
		this.#recomputeVisibleChannels(this.#getPropValue('data-alpha-channel'))
		this.#render()
	}

	/**
	 * Wrapper function. Converts a color channel’s value into its CSS value representation.
	 *
	 * @param {string} channel
	 * @returns {string}
	 */
	#getChannelAsCssValue = (channel) => {
		const format = this.#activeFormat
		return colorChannels[format][channel].to(this.#colors[format][channel])
	}

	/**
	 * Retrieves a prop's value.
	 *
	 * @template {PropName} P
	 * @param {P} propName
	 * @returns {PropTypeMap[P]} the value of the prop if present; otherwise, the prop's default value.
	 */
	#getPropValue (propName) {
		// Justification for type assertion: props were appropriately validated meaning they're either set or have a default value.
		const value = /** @type {any} */ (this.getAttribute(propName) ?? this.#getPropDefaultValue(propName))

		switch (PROPS[propName].type) {
			case Array: {
				return Array.isArray(value) ? value : value.split(',').map((/** @type {string} */ format) => format.trim())
			}
			default: {
				return value
			}
		}
	}

	/**
	 * Retrieves a prop's default value.
	 *
	 * @template {PropName} P
	 * @param {P} propName
	 * @returns {PropTypeMap[P]} the deault value of the prop.
	 */
	#getPropDefaultValue (propName) {
		return PROPS[propName].default?.()
	}

	/**
	 * @param {string} message
	 * @returns {Error} an `Error` object whose message is prefixed with the component name.
	 */
	#createError (message) {
		return new Error(`<${this.localName}>: ${message}`)
	}
}

/**
 * TODO: Consider dropping this again. It's quite some complexity for prefixing strings.
 *
 * @param {TemplateStringsArray} strings
 * @param {string[]} expressions
 * @returns {string}
 */
function prefix (strings, ...expressions) {
	return 'cp-' + strings.map((str, index) => str + (index < expressions.length ? expressions[index] : '')).join('')
}

/**
 * @param {HTMLElement} colorSpace
 * @param {number} clientX
 * @param {number} clientY
 * @returns {{ x: number, y: number }}
 */
function getNewThumbPosition (colorSpace, clientX, clientY) {
	const rect = colorSpace.getBoundingClientRect()
	const x = clientX - rect.left
	const y = clientY - rect.top

	return {
		x: rect.width === 0 ? 0 : clamp(x / rect.width, 0, 1),
		y: rect.height === 0 ? 0 : clamp(1 - y / rect.height, 0, 1),
	}
}

/**
 * @param {string} id
 * @param {VisibleColorFormat} activeFormat
 * @param {string[]} visibleChannels
 * @param {any} colors
 * @param {string} hexInputValue
 * @param {AlphaChannelProp} alphaChannel
 * @param {VisibleColorFormat[]} visibleFormats
 * @param {(channel: string) => string} getChannelAsCssValue
 * @param {(event: KeyboardEvent) => void} changeInputValue
 * @param {(event: Event) => void} copyColor
 * @param {(event: Event, channel: 'h' | 'a') => void} handleSliderInput
 * @param {(event: KeyboardEvent) => void} moveThumbWithArrows
 * @param {(event: MouseEvent) => void} startMovingThumbWithMouse
 * @param {(event: TouchEvent) => void} startMovingThumbWithTouch
 * @param {(event: Event) => void} switchFormat
 * @param {(event: Event, channel: string) => void} updateColorValue
 * @param {(event: Event) => void} updateHexColorValue
 * @returns {TemplateResult}
 */
function colorPickerTemplate (
	id,
	activeFormat,
	visibleChannels,
	colors,
	hexInputValue,
	alphaChannel,
	visibleFormats,
	getChannelAsCssValue,
	changeInputValue,
	copyColor,
	handleSliderInput,
	moveThumbWithArrows,
	startMovingThumbWithMouse,
	startMovingThumbWithTouch,
	switchFormat,
	updateColorValue,
	updateHexColorValue,
) {
	const colorSpaceTemplate = () => html`
		<div
			class="${prefix`color-space`}"
			@mousedown="${startMovingThumbWithMouse}"
			@touchstart="${startMovingThumbWithTouch}"
		>
			<div
				class="${prefix`thumb`}"
				tabIndex="0"
				aria-label="Color space thumb"
				@keydown="${moveThumbWithArrows}"
			></div>
		</div>
	`

	const hueRangeInputLabelTemplate = () => html`
		<label
			class="${prefix`range-input-label`} ${prefix`range-input-label--hue`}"
			for="${id}-hue-slider"
		>
			<span class="${prefix`range-input-label-text`} ${prefix`range-input-label-text--hue`}">Hue</span>

			<input
				class="${prefix`range-input`} ${prefix`range-input--hue`}"
				id="${id}-hue-slider"
				type="range"
				min="0"
				max="360"
				step="1"
				.value="${colors.hsv.h * 360}"
				@keydown="${changeInputValue}"
				@input="${(/** @type {Event} */ event) => handleSliderInput(event, 'h')}"
			>
		</label>
	`

	const alphaRangeInputLabelTemplate = () => html`
		<label
			class="${prefix`range-input-label`} ${prefix`range-input-label--alpha`}"
			for="${id}-alpha-slider"
		>
			<span class="${prefix`range-input-label-text`} ${prefix`range-input-label-text--alpha`}">Alpha</span>

			<input
				class="${prefix`range-input`} ${prefix`range-input--alpha`}"
				id="${id}-alpha-slider"
				type="range"
				min="0"
				max="100"
				step="1"
				.value="${colors.hsv.a * 100}"
				@keydown="${changeInputValue}"
				@input="${(/** @type {Event} */ event) => handleSliderInput(event, 'a')}"
			>
		</label>
	`

	const rangeInputGroupTemplate = () => html`
		<div class="${prefix`range-input-group`}">
			${hueRangeInputLabelTemplate()}
			${alphaChannel === 'show' ? alphaRangeInputLabelTemplate() : ''}
		</div>
	`

	const copyButtonTemplate = () => html`
		<button
			class="${prefix`copy-button`}"
			type="button"
			@click="${copyColor}"
		>
			<span class="${prefix`visually-hidden`}">Copy coloy</span>

			<svg
				xmlns="http://www.w3.org/2000/svg"
				aria-hidden="true"
				width="24"
				height="24"
				viewBox="0 0 32 32"
			>
				<path
					d="M25.313 28v-18.688h-14.625v18.688h14.625zM25.313 6.688c1.438 0 2.688 1.188 2.688 2.625v18.688c0 1.438-1.25 2.688-2.688 2.688h-14.625c-1.438 0-2.688-1.25-2.688-2.688v-18.688c0-1.438 1.25-2.625 2.688-2.625h14.625zM21.313 1.313v2.688h-16v18.688h-2.625v-18.688c0-1.438 1.188-2.688 2.625-2.688h16z"
					fill="currentColor"
				/>
			</svg>
		</button>
	`

	const hexColorInputTemplate = () => html`
		<label
			class="${prefix`hex-input-label`}"
			for="${id}-color-hex"
		>
			<span class="${prefix`color-input-label-text`}">Hex</span>

			<input
				class="${prefix`color-input`}"
				id="${id}-color-hex"
				type="text"
				.value="${hexInputValue}"
				@input="${updateHexColorValue}"
			>
		</label>
	`

	const colorInputTemplate = () => visibleChannels.map((channel) => html`
		<label
			class="${prefix`color-input-label`}"
			id="${id}-color-${activeFormat}-${channel}-label"
			for="${id}-color-${activeFormat}-${channel}"
		>
			<span class="${prefix`color-input-label-text`}">${channel.toUpperCase()}</span>

			<input
				class="${prefix`color-input`}"
				id="${id}-color-${activeFormat}-${channel}"
				type="text"
				.value="${getChannelAsCssValue(channel)}"
				@input="${(/** @type {Event} */ event) => updateColorValue(event, channel)}"
			>
		</label>
	`)

	const switchFormatButtonTemplate = () => html`
		<button
			class="${prefix`switch-format-button`}"
			type="button"
			@click="${switchFormat}"
		>
			<span class="${prefix`visually-hidden`}">Switch format</span>

			<svg
				class="${prefix`icon`}"
				aria-hidden="true"
				xmlns="http://www.w3.org/2000/svg"
				width="16"
				height="15"
			>
				<path
					d="M8 15l5-5-1-1-4 2-4-2-1 1zm4-9l1-1-5-5-5 5 1 1 4-2z"
					fill="currentColor"
				/>
			</svg>
		</button>
	`

	const colorInputWrapperTemplate = () => html`
		<div class="${prefix`color-input-wrapper`}">
			<div class="${prefix`color-input-group`}">
				${activeFormat === 'hex' ? hexColorInputTemplate() : colorInputTemplate()}
			</div>
			${visibleFormats.length > 1 ? switchFormatButtonTemplate() : ''}
		</div>
	`

	return html`
		${colorSpaceTemplate()}
		${rangeInputGroupTemplate()}
		${copyButtonTemplate()}
		${colorInputWrapperTemplate()}
	`
}

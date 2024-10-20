import { html, nothing, render } from 'lit-html'

import { clamp } from './utilities/clamp.js'
import { colorsAreValueEqual } from './utilities/colorsAreValueEqual.js'
import { getCssValue } from './utilities/CssValues.js'
import { convert } from './utilities/convert.js'
import { formatAsCssColor } from './utilities/formatAsCssColor.js'
import { getNewThumbPosition } from './utilities/getNewThumbPosition.js'
import { isValidHexColor } from './utilities/isValidHexColor.js'
import { parsePropsColor } from './utilities/parsePropsColor.js'
import { CustomFormInput } from './CustomFormInput.js'

declare global {
	interface HTMLElementEventMap {
		'color-change': CustomEvent<ColorChangeDetail>
		'color-copy': CustomEvent<ColorChangeDetail>
	}

	interface HTMLElementTagNameMap {
		'color-picker': ColorPicker
	}
}

export type AlphaChannelProp = 'show' | 'hide'

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

export interface ColorMap {
	hex: string
	hsl: ColorHsl
	hsv: ColorHsv
	hwb: ColorHwb
	rgb: ColorRgb
}

export interface ColorChangeDetail {
	colors: Omit<ColorMap, 'hsv'>
	cssColor: string
}

export type ColorFormat = keyof ColorMap
export type VisibleColorFormat = Exclude<ColorFormat, 'hsv'>

export interface ColorPairHex { format: 'hex', color: string }
export interface ColorPairHsl { format: 'hsl', color: ColorHsl }
export interface ColorPairHsv { format: 'hsv', color: ColorHsv }
export interface ColorPairHwb { format: 'hwb', color: ColorHwb }
export interface ColorPairRgb { format: 'rgb', color: ColorRgb }

export type ColorPair = ColorPairHex | ColorPairHsl | ColorPairHsv | ColorPairHwb | ColorPairRgb
export type VisibleColorPair = Exclude<ColorPair, ColorPairHsv>

interface AttributeDefinition {
	type: StringConstructor | BooleanConstructor | ArrayConstructor
	property: ColorPickerProperties
	reflected?: boolean
}

type AttributeName = 'alpha-channel' | 'disabled' | 'format' | 'id' | 'name' | 'readonly' | 'value' | 'visible-formats'

const ATTRIBUTES: Record<AttributeName, AttributeDefinition> = {
	'alpha-channel': {
		type: String,
		property: 'alphaChannel',
	},

	disabled: {
		type: Boolean,
		property: 'disabled',
	},

	format: {
		type: String,
		property: 'format',
	},

	id: {
		type: String,
		property: 'id',
		reflected: true,
	},

	name: {
		type: String,
		property: 'name',
		reflected: true,
	},

	readonly: {
		type: Boolean,
		property: 'readOnly',
	},

	value: {
		type: String,
		property: 'defaultValue',
	},

	'visible-formats': {
		type: Array,
		property: 'visibleFormats',
	},
}

export type ColorPickerProperties = keyof ColorPicker

const COLOR_FORMATS = ['hex', 'hsl', 'hsv', 'hwb', 'rgb'] as const satisfies readonly ColorFormat[]

export class ColorPicker extends CustomFormInput {
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

	/**
	 * Indicates when changes to the `value` content attribute *shouldn't* be reflected by its IDL attribute.
	 *
	 * This happens as soon as the user made changes to the form value by changing the current color (1) via the GUI or (2) by updating it programmatically.
	 *
	 * A form reset will reset this flag.
	 */
	#dirty = false
	#disabledState = false
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	#value: any = {
		hex: '#ffffffff',
		hsl: { h: 0, s: 0, l: 100, a: 1 },
		hsv: { h: 0, s: 0, v: 100, a: 1 },
		hwb: { h: 0, w: 100, b: 0, a: 1 },
		rgb: { r: 255, g: 255, b: 255, a: 1 },
	}

	#alphaChannel: AlphaChannelProp = 'show'
	#format: VisibleColorFormat = 'hsl'
	#visibleFormats: VisibleColorFormat[] = ['hex', 'hsl', 'hwb', 'rgb']

	#colorSpace: HTMLElement | null = null
	#thumb: HTMLElement | null = null

	/**
	 * Tracks whether a pointer originated from within the color space.
	 *
	 * Only if it did do we want to run the logic of dragging the color space thumb around.
	 */
	#hasPointerOriginatedInColorSpace = false

	/**
	 * Tracks queued updates.
	 */
	#updateCount = 0

	get [Symbol.toStringTag] () {
		return 'ColorPicker'
	}

	/**
	 * Whether to show input controls for a color’s alpha channel. If set to `'hide'`, the alpha range input and the alpha channel input are hidden, the “Copy color” button will copy a CSS color value without alpha channel, and the object emitted in a `color-change` event will have a `cssColor` property value without alpha channel.
	 */
	get alphaChannel () {
		return this.#alphaChannel
	}

	set alphaChannel (alphaChannel) {
		this.#alphaChannel = alphaChannel

		this.#queueUpdate(() => {
			this.#renderIfIdle()
		})
	}

	get defaultValue () {
		// The `defaultValue` IDL attribute reflects the `value` (yes, not `default-value`) content attribute.
		return this.getAttribute('value') ?? ''
	}

	set defaultValue (defaultValue) {
		this.setAttribute('value', defaultValue)

		if (!this.#dirty) {
			this.#setValue(defaultValue, { isUserTriggered: false })
		}
	}

	/**
	 * The form-associated element's disabled state. Controls the disabled state of the form controls and buttons that are part of the color picker. Does not change when an ancestor fieldset is disabled.
	 */
	get disabled () {
		return this.hasAttribute('disabled')
	}

	set disabled (disabled) {
		if (disabled) {
			this.setAttribute('disabled', '')
		} else {
			this.removeAttribute('disabled')
		}

		this.#queueUpdate(() => {
			this.#renderIfIdle()
		})
	}

	/**
	 * The element's _effective_ disabled state. `true` if the element itself is disabled _or_ if the element is a descendant of a disabled `fieldset` element.
	 */
	// Keeping track of this separetely to the `disabled` IDL attribute is necessary because that should only indicate if the element itself is disabled. However, sometimes we need to know whether the element is functionally disabled through _either_ its own disabled state _or_ an ancestor fieldset.
	get disabledState () {
		return this.disabled || this.#disabledState
	}

	set disabledState (disabledState) {
		this.#disabledState = disabledState

		this.#queueUpdate(() => {
			this.#renderIfIdle()
		})
	}

	/**
	 * The current color format. Changed by interacting with the “Switch format” button.
	 */
	get format () {
		return this.#format
	}

	set format (format) {
		format = format || 'hsl'
		this.#format = this.visibleFormats.includes(format) ? format : this.visibleFormats[0]!

		this.#queueUpdate(() => {
			this.#renderIfIdle()
		})
	}

	get name () {
		return this.getAttribute('name') ?? ''
	}

	set name (name) {
		this.setAttribute('name', name)
	}

	/**
	 * ID of the form-associated element. Will be used to prefix all form controls’ `id` and `for` attribute values.
	 */
	get id () {
		return this.getAttribute('id') ?? 'color-picker'
	}

	set id (id) {
		this.setAttribute('id', id)

		this.#queueUpdate(() => {
			this.#renderIfIdle()
		})
	}

	get readOnly () {
		return this.hasAttribute('readonly')
	}

	set readOnly (readOnly) {
		if (readOnly) {
			this.setAttribute('readonly', '')
		} else {
			this.removeAttribute('readonly')
		}

		this.#queueUpdate(() => {
			this.#renderIfIdle()
		})
	}

	get required () {
		return this.hasAttribute('required')
	}

	set required (required) {
		if (required) {
			this.setAttribute('required', '')
		} else {
			this.removeAttribute('required')
		}
	}

	/**
	 * Value of the form-associated element.
	 *
	 * **Getter**: Returns the current color as a string in functional RGB notation (e.g. `rgb(255 255 255 / 1)`).
	 */
	get value (): string {
		return formatAsCssColor({ format: 'rgb', color: this.#value.rgb }, false)
	}

	/**
	 * **Setter**: Sets the current color. Any valid CSS color can be used.
	 *
	 * Sets the dirty flag.
	 */
	set value (value: string | ColorHsl | ColorHwb | ColorRgb) {
		this.#setValue(value, { isUserTriggered: true })
	}

	/**
	 * Set `value`.
	 *
	 * Sets the dirty flag **if `isUserTriggered` is `true`**.
	 */
	#setValue (
		value: string | ColorHsl | ColorHsv | ColorHwb | ColorRgb,
		{ isUserTriggered }: { isUserTriggered: boolean },
	) {
		const pair = parsePropsColor(value)
		if (pair === null) {
			return
		}

		if (isUserTriggered) {
			this.#dirty = true
		}

		if (colorsAreValueEqual(this.#value[pair.format], pair.color)) {
			return
		}

		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const updatedColors: any = { [pair.format]: pair.color }
		for (const targetFormat of COLOR_FORMATS) {
			if (targetFormat !== pair.format) {
				updatedColors[targetFormat] = convert(pair.format, targetFormat, pair.color)
			}
		}

		this.#value = updatedColors
		this.setFormValue(this.value)

		this.#queueUpdate(() => {
			this.#renderIfIdle()

			// Post-render operations
			this.#emitColorEvent('color-change')

			if (isUserTriggered) {
				// Form-associated custom elements automatically include their form value in any event's `target.value` property.
				this.dispatchEvent(new Event('input'))

				// Technically, this should be guarded behind some form of “has committed value” check. However, the nature of the color picker means that each color change always coincides with a value being committed.
				this.dispatchEvent(new Event('change'))
			}
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

		// Set `format` to its current value to trigger the validation logic for whether it's one of the visible formats.
		this.format = this.#format
	}

	constructor () {
		super()
		this.setFormValue(this.value)
	}

	connectedCallback () {
		if (!this.isConnected) {
			return
		}

		this.ownerDocument.addEventListener('mousemove', this.#moveThumbWithMouse, { passive: false })
		this.ownerDocument.addEventListener('touchmove', this.#moveThumbWithTouch, { passive: false })
		this.ownerDocument.addEventListener('mouseup', this.#stopMovingThumb)
		this.ownerDocument.addEventListener('touchend', this.#stopMovingThumb)

		this.#render()
	}

	disconnectedCallback () {
		this.ownerDocument.removeEventListener('mousemove', this.#moveThumbWithMouse)
		this.ownerDocument.removeEventListener('touchmove', this.#moveThumbWithTouch)
		this.ownerDocument.removeEventListener('mouseup', this.#stopMovingThumb)
		this.ownerDocument.removeEventListener('touchend', this.#stopMovingThumb)
	}

	attributeChangedCallback (attribute: AttributeName, oldValue: string | null, newValue: string | null) {
		if (newValue !== oldValue) {
			let value
			const { property, type, reflected = false } = ATTRIBUTES[attribute]
			switch (type) {
				case Array: {
					value = newValue !== null ? newValue.split(',').map((format) => format.trim()) : null
					break
				}
				case Boolean: {
					// The presence of a boolean attribute alone indicates `true`; absence indicates `false`.
					value = newValue !== null
					break
				}
				default: {
					value = newValue
					break
				}
			}

			// If the new value is `null` (i.e. the content attribute was removed) and the content attribute reflects the IDL attribute (i.e. the IDL attribute setter sets the content attribute), don't use the IDL attribute's setter because that would set the attribute again.
			if (newValue !== null || !reflected) {
				// @ts-expect-error this is fine
				this[property] = value
			}
		}
	}

	formDisabledCallback (disabled: boolean) {
		this.disabledState = disabled
	}

	/**
	 * Resets the dirty flag and initializes the color picker anew using the value of the `value` content attribute, if set, or; otherwise, the default color.
	 */
	// This relies on all internal form controls being disassociated from their form so that they don't reset their values per the default reset algorithm. This would interfere with the logic in this callback.
	formResetCallback () {
		this.#dirty = false
		this.#setValue(this.defaultValue || '#ffffffff', { isUserTriggered: false })
	}

	#emitColorEvent (type: 'color-change' | 'color-copy') {
		const excludeAlphaChannel = this.alphaChannel === 'hide'
		const cssColor = formatAsCssColor({ color: this.#value[this.format], format: this.format }, excludeAlphaChannel)

		let colors: ColorChangeDetail['colors']
		const { hex, hsl, hwb, rgb } = this.#value
		if (this.alphaChannel === 'hide') {
			const digits = this.#value.hex.length - 1
			const hasAlpha = digits%4 === 0
			const alphaChannelLength = digits/(hasAlpha ? 4 : 3)
			const hex = this.#value.hex.substring(0, this.#value.hex.length - (hasAlpha ? alphaChannelLength : 0)) + 'f'.repeat(alphaChannelLength)

			colors = {
				hex,
				hsl: { ...hsl, a: 1 },
				hwb: { ...hwb, a: 1 },
				rgb: { ...rgb, a: 1 },
			}
		} else {
			colors = { hex, hsl, hwb, rgb }
		}

		this.dispatchEvent(new CustomEvent(type, {
			detail: {
				colors,
				cssColor,
			},
		}))
	}

	/**
	 * Sets the essential properties of the color picker as inline styles so that they can't be overridden.
	 */
	#setCssProps () {
		// Use the current color as the *opaque* end of the the alpha channel slider. For this purpose, we use the current color with its alpha channel set to 1.
		const rgb = { ...this.#value.rgb, a: 1 }
		this.style.setProperty('--cp-color', formatAsCssColor({ format: 'rgb', color: rgb }, false))

		if (this.#colorSpace === null || this.#thumb === null) {
			return
		}

		// Allows the color space thumb to be positioned relative to this element.
		this.#colorSpace.style.position = 'relative'
		// Sets the background color of the color space. The color space shows a *slice* through the HSV color cylinder's center. The slice's angle represents the color's *hue* (i.e. rotating the angle of the HSV slice changes the color's hue). We want this color at 100% *saturation* and 100% *value* (which is the same as 50% lightness of the corresponding HSL color).
		this.#colorSpace.style.backgroundColor = `hsl(${this.#value.hsl.h} 100% 50%)`
		// Adds two gradients on top of the solid background color of the color space. This creates the final image of the HSV slice. The first gradient goes from fully opaque black at the bottom to fully transparent at the top. The second gradient goes from full opaque white at the left to fully transparent at the right.
		this.#colorSpace.style.backgroundImage = 'linear-gradient(to top, #000, transparent), linear-gradient(to right, #fff, transparent)'

		this.#thumb.style.boxSizing = 'border-box'
		// Allows positioning the color space thumb.
		this.#thumb.style.position = 'absolute'
		// Sets the X and Y coordinates of the color space thumb. Having chosen the color space to be a slice through the HSV cylinder allows us to map the saturation and value of the current color in HSV representation directly to the thumb's coordinates. In other words: the thumb controls the saturation (X coordinate) and value (Y coordinate) linearly.
		this.#thumb.style.left = `${this.#value.hsv.s}%`
		this.#thumb.style.bottom = `${this.#value.hsv.v}%`
	}

	/**
	 * Queues an update using `queueMicrotask`.
	 *
	 * The `callback` must call `this.#renderIfIdle()` which guarantees that `this.#updateCount` is tracked correctly.
	 *
	 * Using `queueMicrotask` ensures that multiple simultaneous changes to IDL attributes can be processed before applying their effects (which might depend on this having happened).
	 */
	#queueUpdate (callback: VoidFunction) {
		this.#updateCount++
		queueMicrotask(callback)
	}

	#renderIfIdle () {
		this.#updateCount--

		if (this.#updateCount === 0) {
			this.#render()
		}
	}

	/**
	 * Renders the component.
	 */
	#render () {
		if (!this.isConnected) {
			// Aborts rendering if the component is not yet or no longer connected.
			return
		}

		this.classList.add('cp-color-picker')
		render(this.#template(), this)

		this.#colorSpace = this.querySelector('.cp-color-space')
		this.#thumb = this.querySelector('.cp-thumb')
		this.#setCssProps()
	}

	#template () {
		// Used to disassociate form controls from the custom element's parent form.
		const nonExistentFormName = '👽'

		const colorSpaceTemplate = () => html`<div
			class="cp-color-space"
			@mousedown="${this.#startMovingThumbWithMouse}"
			@touchstart="${this.#startMovingThumbWithTouch}"
		>
			<div
				class="cp-thumb"
				tabIndex="${this.disabledState ? nothing : '0'}"
				aria-label="Color space thumb"
				@keydown="${this.#moveThumbWithArrows}"
			></div>
		</div>`

		const hueRangeInputLabelTemplate = () => html`<label
			class="cp-range-input-label cp-range-input-label--hue"
			for="${this.id}-hue-slider"
		>
			<span class="cp-range-input-label-text cp-range-input-label-text--hue">Hue</span>

			<input
				form="${nonExistentFormName}"
				class="cp-range-input cp-range-input--hue"
				id="${this.id}-hue-slider"
				type="range"
				min="0"
				max="360"
				step="1"
				.value="${this.#value.hsl.h}"
				?disabled="${this.disabledState}"
				?readonly="${this.readOnly}"
				@keydown="${this.#changeInputValue}"
				@input="${(event: Event) => this.#handleSliderInput(event, 'h')}"
			>
		</label>`

		const alphaRangeInputLabelTemplate = () => html`<label
			class="cp-range-input-label cp-range-input-label--alpha"
			for="${this.id}-alpha-slider"
		>
			<span class="cp-range-input-label-text cp-range-input-label-text--alpha">Alpha</span>

			<input
				form="${nonExistentFormName}"
				class="cp-range-input cp-range-input--alpha"
				id="${this.id}-alpha-slider"
				type="range"
				min="0"
				max="1"
				step="0.01"
				.value="${this.#value.hsl.a}"
				?disabled="${this.disabledState}"
				?readonly="${this.readOnly}"
				@keydown="${this.#changeInputValue}"
				@input="${(event: Event) => this.#handleSliderInput(event, 'a')}"
			>
		</label>`

		const rangeInputGroupTemplate = () => html`<div class="cp-range-input-group">
			${hueRangeInputLabelTemplate()}
			${this.alphaChannel === 'show' ? alphaRangeInputLabelTemplate() : ''}
		</div>`

		const copyButtonTemplate = () => html`<button
			class="cp-copy-button"
			type="button"
			?disabled="${this.disabledState}"
			@click="${this.#copyColor}"
		>
			<span class="cp-visually-hidden">Copy color</span>

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
		</button>`

		const hexColorInputTemplate = () => {
			const hex = this.#value.hex
			const hexInputValue = this.alphaChannel === 'hide' && [5, 9].includes(hex.length)
				? hex.slice(0, -(hex.length - 1)/4)
				: hex

			return html`<label
				class="cp-hex-input-label"
				for="${this.id}-color-hex"
			>
				<span class="cp-color-input-label-text">Hex</span>

				<input
					form="${nonExistentFormName}"
					class="cp-color-input"
					id="${this.id}-color-hex"
					type="text"
					.value="${hexInputValue}"
					?disabled="${this.disabledState}"
					?readonly="${this.readOnly}"
					@change="${this.#updateHexColorValue}"
				>
			</label>`
		}

		const colorInputTemplate = (format: Exclude<VisibleColorFormat, 'hex'>) => {
			const channels = format.split('').concat(this.alphaChannel === 'show' ? ['a'] : [])
			return channels.map((channel) => {
				const cssValue = getCssValue(format, channel)
				const value = cssValue.to(this.#value[format][channel])

				return html`<label
					class="cp-color-input-label"
					id="${this.id}-color-${format}-${channel}-label"
					for="${this.id}-color-${format}-${channel}"
				>
					<span class="cp-color-input-label-text">${channel.toUpperCase()}</span>

					<input
						form="${nonExistentFormName}"
						class="cp-color-input"
						id="${this.id}-color-${format}-${channel}"
						type="text"
						.value="${value}"
						?disabled="${this.disabledState}"
						?readonly="${this.readOnly}"
						@change="${(event: Event) => this.#updateColorValue(event, channel)}"
					>
				</label>`
			})
		}

		const switchFormatButtonTemplate = () => html`<button
			class="cp-switch-format-button"
			type="button"
			?disabled="${this.disabledState}"
			@click="${this.#switchFormat}"
		>
			<span class="cp-visually-hidden">Switch format</span>

			<svg
				class="cp-icon"
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
		</button>`

		const colorInputWrapperTemplate = () => html`<div class="cp-color-input-wrapper">
			<div class="cp-color-input-group">
				${this.format === 'hex' ? hexColorInputTemplate() : colorInputTemplate(this.format)}
			</div>
			${this.visibleFormats.length > 1 ? switchFormatButtonTemplate() : ''}
		</div>`

		return html`
			${colorSpaceTemplate()}
			${rangeInputGroupTemplate()}
			${copyButtonTemplate()}
			${colorInputWrapperTemplate()}
		`
	}

	#startMovingThumbWithMouse = (event: MouseEvent) => {
		this.#hasPointerOriginatedInColorSpace = true
		this.#moveThumbWithMouse(event)
	}

	#moveThumbWithMouse = (event: MouseEvent) => {
		if (
			event.buttons !== 1 ||
			this.#hasPointerOriginatedInColorSpace === false ||
			!(this.#colorSpace instanceof HTMLElement) ||
			this.disabledState ||
			this.readOnly
		) {
			return
		}

		this.#moveThumb(getNewThumbPosition(this.#colorSpace, event.clientX, event.clientY))
	}

	#startMovingThumbWithTouch = (event: TouchEvent) => {
		this.#hasPointerOriginatedInColorSpace = true
		this.#moveThumbWithTouch(event)
	}

	#moveThumbWithTouch = (event: TouchEvent) => {
		if (
			this.#hasPointerOriginatedInColorSpace === false ||
			!(this.#colorSpace instanceof HTMLElement) ||
			this.disabledState ||
			this.readOnly
		) {
			return
		}

		// Prevents touch events from dragging the page.
		event.preventDefault()

		const touchPoint = event.touches[0]!

		this.#moveThumb(getNewThumbPosition(this.#colorSpace, touchPoint.clientX, touchPoint.clientY))
	}

	#moveThumb ({ x, y }: { x: number, y: number }) {
		const hsv: ColorHsv = Object.assign({}, this.#value.hsv)
		hsv.s = x
		hsv.v = y

		this.#setValue(hsv, { isUserTriggered: true })
	}

	#stopMovingThumb = () => {
		this.#hasPointerOriginatedInColorSpace = false
	}

	#moveThumbWithArrows = (event: KeyboardEvent) => {
		if (
			!['ArrowUp', 'ArrowRight', 'ArrowDown', 'ArrowLeft'].includes(event.key) ||
			!(this.#colorSpace instanceof HTMLElement) ||
			this.disabledState ||
			this.readOnly
		) {
			return
		}

		event.preventDefault()
		const direction = ['ArrowLeft', 'ArrowDown'].includes(event.key) ? -1 : 1
		const channel = ['ArrowLeft', 'ArrowRight'].includes(event.key) ? 's' : 'v'
		const step = event.shiftKey ? 10 : 1

		const { s, v } = this.#value.hsv
		const x = channel === 's' ? clamp(s + direction * step, 0, 100) : s
		const y = channel === 'v' ? clamp(v + direction * step, 0, 100) : v

		this.#moveThumb({ x, y })
	}

	#changeInputValue = (event: KeyboardEvent) => {
		if (
			!['ArrowUp', 'ArrowRight', 'ArrowDown', 'ArrowLeft'].includes(event.key) ||
			!event.shiftKey
		) {
			return
		}

		const input = event.currentTarget as HTMLInputElement
		const step = Number(input.step)
		const direction = ['ArrowLeft', 'ArrowDown'].includes(event.key) ? -1 : 1
		const value = Number(input.value) + direction * step * 10
		const newValue = clamp(value, Number(input.min), Number(input.max))

		// Intentionally removes a single step from `newValue` because the default action associated with an `input` element’s `keydown` event will add one itself.
		input.value = String(newValue - direction * step)
	}

	#handleSliderInput = (event: Event, channel: 'h' | 'a') => {
		const input = event.currentTarget as HTMLInputElement
		const hsl: ColorHsl = Object.assign({}, this.#value.hsl)
		hsl[channel] = Number(input.value)

		this.#setValue(hsl, { isUserTriggered: true })
	}

	#updateHexColorValue = (event: Event) => {
		const input = event.target as HTMLInputElement

		if (isValidHexColor(input.value)) {
			this.#setValue(input.value, { isUserTriggered: true })
		}
	}

	#updateColorValue = (event: Event, channel: string) => {
		const input = event.target as HTMLInputElement
		const format = this.format as Exclude<VisibleColorFormat, 'hex'>
		const color = Object.assign({}, this.#value[format])
		const cssValue = getCssValue(format, channel)
		const value = cssValue.from(input.value)

		if (Number.isNaN(value)) {
			// A `NaN` value is used as a signal for an invalid or incomplete user input. In either case, we don't want to continue updating the processing color value and risk overriding the input element's value while the user is still inputting data.
			return
		}

		color[channel] = value

		this.#setValue(color, { isUserTriggered: true })
	}

	/**
	 * Copies the current color (determined by the active color format).
	 *
	 * For example, if the active color format is HSL, the copied text will be a valid CSS color in HSL format.
	 *
	 * Only works in secure browsing contexts (i.e. HTTPS).
	 */
	copyColor () {
		return this.#copyColor()
	}

	#copyColor = async () => {
		const excludeAlphaChannel = this.alphaChannel === 'hide'
		const cssColor = formatAsCssColor({ color: this.#value[this.format], format: this.format }, excludeAlphaChannel)

		// Note: the Clipboard API’s `writeText` method can throw a `DOMException` error in case of insufficient write permissions (see https://w3c.github.io/clipboard-apis/#dom-clipboard-writetext). This error is explicitly not handled here so that users of this package can see the original error in the console.
		await window.navigator.clipboard.writeText(cssColor)
		this.#emitColorEvent('color-copy')
	}

	/**
	 * Sets the next active color format by cycling through `colorPicker.visibleFormats`.
	 */
	switchFormat () {
		return this.#switchFormat()
	}

	#switchFormat = () => {
		const formatIndex = this.visibleFormats.findIndex((format) => format === this.format)
		const newFormatIndex = (formatIndex + 1) % this.visibleFormats.length

		this.format = this.visibleFormats[newFormatIndex]!
	}
}

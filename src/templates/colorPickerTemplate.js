import { html } from 'lit-html'
/** @typedef {import('lit-html').TemplateResult} TemplateResult */

/** @typedef {import('../../types/index.d.js').AlphaChannelProp} AlphaChannelProp */
/** @typedef {import('../../types/index.d.js').VisibleColorFormat} VisibleColorFormat */

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
export function colorPickerTemplate (
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
			class="cp-color-space"
			@mousedown="${startMovingThumbWithMouse}"
			@touchstart="${startMovingThumbWithTouch}"
		>
			<div
				class="cp-thumb"
				tabIndex="0"
				aria-label="Color space thumb"
				@keydown="${moveThumbWithArrows}"
			></div>
		</div>
	`

	const hueRangeInputLabelTemplate = () => html`
		<label
			class="cp-range-input-label cp-range-input-label--hue"
			for="${id}-hue-slider"
		>
			<span class="cp-range-input-label-text cp-range-input-label-text--hue">Hue</span>

			<input
				class="cp-range-input cp-range-input--hue"
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
			class="cp-range-input-label cp-range-input-label--alpha"
			for="${id}-alpha-slider"
		>
			<span class="cp-range-input-label-text cp-range-input-label-text--alpha">Alpha</span>

			<input
				class="cp-range-input cp-range-input--alpha"
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
		<div class="cp-range-input-group">
			${hueRangeInputLabelTemplate()}
			${alphaChannel === 'show' ? alphaRangeInputLabelTemplate() : ''}
		</div>
	`

	const copyButtonTemplate = () => html`
		<button
			class="cp-copy-button"
			type="button"
			@click="${copyColor}"
		>
			<span class="cp-visually-hidden">Copy coloy</span>

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
			class="cp-hex-input-label"
			for="${id}-color-hex"
		>
			<span class="cp-color-input-label-text">Hex</span>

			<input
				class="cp-color-input"
				id="${id}-color-hex"
				type="text"
				.value="${hexInputValue}"
				@input="${updateHexColorValue}"
			>
		</label>
	`

	const colorInputTemplate = () => visibleChannels.map((channel) => html`
		<label
			class="cp-color-input-label"
			id="${id}-color-${activeFormat}-${channel}-label"
			for="${id}-color-${activeFormat}-${channel}"
		>
			<span class="cp-color-input-label-text">${channel.toUpperCase()}</span>

			<input
				class="cp-color-input"
				id="${id}-color-${activeFormat}-${channel}"
				type="text"
				.value="${getChannelAsCssValue(channel)}"
				@input="${(/** @type {Event} */ event) => updateColorValue(event, channel)}"
			>
		</label>
	`)

	const switchFormatButtonTemplate = () => html`
		<button
			class="cp-switch-format-button"
			type="button"
			@click="${switchFormat}"
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
		</button>
	`

	const colorInputWrapperTemplate = () => html`
		<div class="cp-color-input-wrapper">
			<div class="cp-color-input-group">
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

declare class ColorPicker extends HTMLElement { }

declare global {
	interface HTMLElementEventMap {
		'color-change': CustomEvent<ColorChangeDetail>
	}

	interface HTMLElementTagNameMap {
		'color-picker': ColorPicker
	}
}

type PropDefinition = {
	/**
	 * The prop type.
	 */
	type: String | Array

	/**
	 * Whether a prop is required.
	 */
	isRequired?: boolean

	/**
	 * Default value used when not providing an optional prop.
	 */
	default?: () => any
}

type PropTypeMap = {
	id: string
	'data-color': string
	'data-visible-formats': VisibleColorFormat[]
	'data-default-format': VisibleColorFormat
	'data-alpha-channel': AlphaChannelProp
}

type PropName = keyof PropTypeMap
type PropMap = Record<PropName, PropDefinition>
type VisibleColorFormat = 'hex' | 'hsl' | 'hwb' | 'rgb'
type ColorFormat = 'hex' | 'hsl' | 'hsv' | 'hwb' | 'rgb'
type AlphaChannelProp = 'show' | 'hide'

type ColorChangeDetail = {
	colors: {
		hex: string
		hsl: ColorHsl
		hsv: ColorHsv
		hwb: ColorHwb
		rgb: ColorRgb
	}
	cssColor: string
}

type ColorHsl = {
	h: number
	s: number
	l: number
	a: number
}

type ColorHsv = {
	h: number
	s: number
	v: number
	a: number
}

type ColorHwb = {
	h: number
	w: number
	b: number
	a: number
}

type ColorRgb = {
	r: number
	g: number
	b: number
	a: number
}

export {
	AlphaChannelProp,
	ColorChangeDetail,
	ColorFormat,
	ColorHsl,
	ColorHsv,
	ColorHwb,
	ColorPicker,
	ColorRgb,
	PropDefinition,
	PropMap,
	PropName,
	PropTypeMap,
	VisibleColorFormat,
}

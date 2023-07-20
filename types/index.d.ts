declare global {
	interface HTMLElementEventMap {
		'color-change': CustomEvent<ColorChangeDetail>
	}
}

export type PropDefinition = {
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

export type PropName = keyof PropTypeMap
export type PropMap = Record<PropName, PropDefinition>
export type VisibleColorFormat = 'hex' | 'hsl' | 'hwb' | 'rgb'
export type ColorFormat = 'hex' | 'hsl' | 'hsv' | 'hwb' | 'rgb'
export type AlphaChannelProp = 'show' | 'hide'

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

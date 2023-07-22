declare class ColorPicker extends HTMLElement {
	alphaChannel: AlphaChannelProp
	activeFormat: VisibleColorFormat
	color: string
	defaultFormat: VisibleColorFormat
	visibleFormats: VisibleColorFormat[]
	switchFormat(): void
}

type ColorPickerProperties = keyof ColorPicker

declare global {
	interface HTMLElementEventMap {
		'color-change': CustomEvent<ColorChangeDetail>
	}

	interface HTMLElementTagNameMap {
		'color-picker': ColorPicker
	}
}

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
	ColorPickerProperties,
	ColorRgb,
	VisibleColorFormat,
}

declare global {
    interface HTMLElementEventMap {
        'color-change': CustomEvent<ColorChangeDetail>;
    }
    interface HTMLElementTagNameMap {
        'color-picker': ColorPicker;
    }
}
type AlphaChannelProp = 'show' | 'hide';
type ColorHsl = {
    h: number;
    s: number;
    l: number;
    a: number;
};
type ColorHsv = {
    h: number;
    s: number;
    v: number;
    a: number;
};
type ColorHwb = {
    h: number;
    w: number;
    b: number;
    a: number;
};
type ColorRgb = {
    r: number;
    g: number;
    b: number;
    a: number;
};
type ColorMap = {
    hex: string;
    hsl: ColorHsl;
    hsv: ColorHsv;
    hwb: ColorHwb;
    rgb: ColorRgb;
};
type ColorChangeDetail = {
    colors: ColorMap;
    cssColor: string;
};
type ColorFormat = keyof ColorMap;
type VisibleColorFormat = Exclude<ColorFormat, 'hsv'>;
interface ColorPairHex {
    format: 'hex';
    color: string;
}
interface ColorPairHsl {
    format: 'hsl';
    color: ColorHsl;
}
interface ColorPairHsv {
    format: 'hsv';
    color: ColorHsv;
}
interface ColorPairHwb {
    format: 'hwb';
    color: ColorHwb;
}
interface ColorPairRgb {
    format: 'rgb';
    color: ColorRgb;
}
type ColorPair = ColorPairHex | ColorPairHsl | ColorPairHsv | ColorPairHwb | ColorPairRgb;
type VisibleColorPair = Exclude<ColorPair, ColorPairHsv>;
type AttributeName = 'alpha-channel' | 'color' | 'default-format' | 'id' | 'visible-formats';
type ColorPickerProperties = keyof ColorPicker;
declare class ColorPicker extends HTMLElement {
    #private;
    static observedAttributes: AttributeName[];
    get [Symbol.toStringTag](): string;
    /**
     * The currently active format. Changed by interacting with the “Switch format” button.
     */
    get activeFormat(): VisibleColorFormat;
    set activeFormat(activeFormat: VisibleColorFormat);
    /**
     * Whether to show input controls for a color’s alpha channel. If set to `'hide'`, the alpha range input and the alpha channel input are hidden, the “Copy color” button will copy a CSS color value without alpha channel, and the object emitted in a `color-change` event will have a `cssColor` property value without alpha channel.
     */
    get alphaChannel(): AlphaChannelProp;
    set alphaChannel(alphaChannel: AlphaChannelProp);
    /**
     * Sets the color of the color picker. You can pass any valid CSS color string.
     */
    get color(): string | ColorHsl | ColorHwb | ColorRgb;
    set color(color: string | ColorHsl | ColorHwb | ColorRgb);
    /**
     * The internal color representation for all formats.
     */
    get colors(): ColorMap;
    set colors(colors: ColorMap);
    /**
     * The color format to show by default when rendering the color picker. Must be one of the formats specified in `visibleFormats`.
     */
    get defaultFormat(): VisibleColorFormat;
    set defaultFormat(defaultFormat: VisibleColorFormat);
    /**
     * The ID value will be used to prefix all `input` elements’ `id` and `label` elements’ `for` attribute values. Make sure to set this if you use multiple instances of the component on a page.
     */
    get id(): string;
    set id(id: string);
    /**
     * A list of visible color formats. Controls for which formats the color `input` elements are shown and in which order the formats will be cycled through when activating the format switch button.
     */
    get visibleFormats(): VisibleColorFormat[];
    set visibleFormats(visibleFormats: VisibleColorFormat[]);
    connectedCallback(): void;
    disconnectedCallback(): void;
    attributeChangedCallback(attribute: AttributeName, oldValue: string | null, newValue: string | null): void;
    /**
     * Copies the current color (determined by the active color format).
     *
     * For example, if the active color format is HSL, the copied text will be a valid CSS color in HSL format.
     *
     * Only works in secure browsing contexts (i.e. HTTPS).
     *
     * @returns the promise returned by calling `window.navigator.clipboard.writeText`.
     */
    copyColor(): Promise<void>;
    /**
     * Sets the next active color format by cycling through `colorPicker.visibleFormats`.
     */
    switchFormat(): void;
}

export { type AlphaChannelProp, type ColorChangeDetail, type ColorFormat, type ColorHsl, type ColorHsv, type ColorHwb, type ColorMap, type ColorPair, type ColorPairHex, type ColorPairHsl, type ColorPairHsv, type ColorPairHwb, type ColorPairRgb, ColorPicker, type ColorPickerProperties, type ColorRgb, type VisibleColorFormat, type VisibleColorPair };

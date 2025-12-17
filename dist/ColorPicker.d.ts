export declare type AlphaChannelProp = 'show' | 'hide';

declare type AttributeName = 'alpha-channel' | 'disabled' | 'format' | 'id' | 'name' | 'readonly' | 'value' | 'visible-formats';

export declare interface ColorChangeDetail {
    colors: Omit<ColorMap, 'hsv'>;
    cssColor: string;
}

export declare type ColorFormat = keyof ColorMap;

export declare type ColorHsl = {
    h: number;
    s: number;
    l: number;
    a: number;
};

export declare type ColorHsv = {
    h: number;
    s: number;
    v: number;
    a: number;
};

export declare type ColorHwb = {
    h: number;
    w: number;
    b: number;
    a: number;
};

export declare interface ColorMap {
    hex: string;
    hsl: ColorHsl;
    hsv: ColorHsv;
    hwb: ColorHwb;
    rgb: ColorRgb;
}

export declare type ColorPair = ColorPairHex | ColorPairHsl | ColorPairHsv | ColorPairHwb | ColorPairRgb;

export declare interface ColorPairHex {
    format: 'hex';
    color: string;
}

export declare interface ColorPairHsl {
    format: 'hsl';
    color: ColorHsl;
}

export declare interface ColorPairHsv {
    format: 'hsv';
    color: ColorHsv;
}

export declare interface ColorPairHwb {
    format: 'hwb';
    color: ColorHwb;
}

export declare interface ColorPairRgb {
    format: 'rgb';
    color: ColorRgb;
}

export declare class ColorPicker extends CustomFormInput {
    #private;
    static observedAttributes: AttributeName[];
    get [Symbol.toStringTag](): string;
    /**
     * Whether to show input controls for a color’s alpha channel. If set to `'hide'`, the alpha range input and the alpha channel input are hidden, the “Copy color” button will copy a CSS color value without alpha channel, and the object emitted in a `color-change` event will have a `cssColor` property value without alpha channel.
     */
    get alphaChannel(): AlphaChannelProp;
    set alphaChannel(alphaChannel: AlphaChannelProp);
    get defaultValue(): string;
    set defaultValue(defaultValue: string);
    /**
     * The form-associated element's disabled state. Controls the disabled state of the form controls and buttons that are part of the color picker. Does not change when an ancestor fieldset is disabled.
     */
    get disabled(): boolean;
    set disabled(disabled: boolean);
    /**
     * The element's _effective_ disabled state. `true` if the element itself is disabled _or_ if the element is a descendant of a disabled `fieldset` element.
     */
    get disabledState(): boolean;
    set disabledState(disabledState: boolean);
    /**
     * The current color format. Changed by interacting with the “Switch format” button.
     */
    get format(): VisibleColorFormat;
    set format(format: VisibleColorFormat);
    get name(): string;
    set name(name: string);
    /**
     * ID of the form-associated element. Will be used to prefix all form controls’ `id` and `for` attribute values.
     */
    get id(): string;
    set id(id: string);
    get readOnly(): boolean;
    set readOnly(readOnly: boolean);
    get required(): boolean;
    set required(required: boolean);
    /**
     * Value of the form-associated element.
     *
     * **Getter**: Returns the current color as a string in functional RGB notation (e.g. `rgb(255 255 255 / 1)`).
     */
    get value(): string;
    /**
     * **Setter**: Sets the current color. Any valid CSS color can be used.
     *
     * Sets the dirty flag.
     */
    set value(value: string | ColorHsl | ColorHwb | ColorRgb);
    /**
     * A list of visible color formats. Controls for which formats the color `input` elements are shown and in which order the formats will be cycled through when activating the format switch button.
     */
    get visibleFormats(): VisibleColorFormat[];
    set visibleFormats(visibleFormats: VisibleColorFormat[]);
    constructor();
    connectedCallback(): void;
    disconnectedCallback(): void;
    attributeChangedCallback(attribute: AttributeName, oldValue: string | null, newValue: string | null): void;
    formDisabledCallback(disabled: boolean): void;
    /**
     * Resets the dirty flag and initializes the color picker anew using the value of the `value` content attribute, if set, or; otherwise, the default color.
     */
    formResetCallback(): void;
    /**
     * Copies the current color (determined by the active color format).
     *
     * For example, if the active color format is HSL, the copied text will be a valid CSS color in HSL format.
     *
     * Only works in secure browsing contexts (i.e. HTTPS).
     */
    copyColor(): Promise<void>;
    /**
     * Sets the next active color format by cycling through `colorPicker.visibleFormats`.
     */
    switchFormat(): void;
}

export declare type ColorPickerProperties = keyof ColorPicker;

export declare type ColorRgb = {
    r: number;
    g: number;
    b: number;
    a: number;
};

declare class CustomFormInput extends HTMLElement {
    #private;
    static formAssociated: boolean;
    get labels(): NodeList;
    get form(): HTMLFormElement | null;
    get shadowRoot(): ShadowRoot | null;
    get type(): string;
    get validationMessage(): string;
    get validity(): ValidityState;
    get willValidate(): boolean;
    checkValidity(): boolean;
    reportValidity(): boolean;
    setFormValue(...args: Parameters<ElementInternals['setFormValue']>): void;
}

export declare type VisibleColorFormat = Exclude<ColorFormat, 'hsv'>;

export declare type VisibleColorPair = Exclude<ColorPair, ColorPairHsv>;

export { }

# yet-another-color-picker

[![Tests passing](https://github.com/kleinfreund/yet-another-color-picker/workflows/Tests/badge.svg)](https://github.com/kleinfreund/yet-another-color-picker/actions)

A color picker web component.

- Form-associated custom element (i.e. it works in forms via the [ElementInternals API](https://developer.mozilla.org/en-US/docs/Web/API/ElementInternals))
- Distributed is ES module format
- Not transpiled
- Uses [lit-html](https://www.npmjs.com/package/lit-html) (as a peer dependency)

Links:

- [demo](https://yet-another-color-picker.netlify.app)
- [**npmjs.com**/package/yet-another-color-picker](https://www.npmjs.com/package/yet-another-color-picker)
- [**github.com**/kleinfreund/yet-another-color-picker](https://github.com/kleinfreund/yet-another-color-picker)
	- [code of conduct](https://github.com/kleinfreund/yet-another-color-picker/blob/main/CODE_OF_CONDUCT.md)
	- [contributing guidelines](https://github.com/kleinfreund/yet-another-color-picker/blob/main/CONTRIBUTING.md)
- as a Vue component: [vue-accessible-color-picker](https://www.npmjs.com/package/vue-accessible-color-picker)

## Contents

- [Installation & usage](#installation-&-usage)
	- [As npm package](#as-npm-package)
	- [As plain files directly in the browser (no build step)](#as-plain-files-directly-in-the-browser-no-build-step)
- [Documentation](#documentation)
	- [Attributes](#attributes)
		- [`alphaChannel`](#alphachannel)
		- [`defaultValue`](#defaultvalue)
		- [`disabled`](#disabled)
		- [`format`](#format)
		- [`id`](#id)
		- [`name`](#name)
		- [`readOnly`](#readonly)
		- [`value`](#value)
		- [`visibleFormats`](#visibleformats)
	- [Methods](#methods)
		- [`copyColor()`](#copycolor)
		- [`switchFormat()`](#switchformat)
	- [Events](#events)
		- [`change`](#change)
		- [`color-change`](#color-change)
		- [`input`](#input)
	- [Theming](#theming)
- [Versioning](#versioning)
- [Contributing](#contributing)
- [Design](#design)
- [To do](#to-do)

## Installation & usage

### As npm package

1. Install the package (and its peer dependencies).

	```sh
	npm install yet-another-color-picker lit-html@^3.0.0
	```

	Note: this web component is rendered using lit-html which will have to be installed as well.

2. Import the module to define the custom element.

	JavaScript:
	```js
	import 'yet-another-color-picker'
	```

3. Load the stylesheet.

	HTML:
	```html
	<link rel="stylesheet" href="./node_modules/yet-another-color-picker/dist/ColorPicker.css">
	```

4. Use the `color-picker` custom element.

	HTML:
	```html
	<color-picker></color-picker>
	```

**Complete example**:

```html
<!DOCTYPE html>
<html lang="en">

<head>
	<meta charset="utf-8" />
	<meta name="viewport" content="width=device-width,initial-scale=1.0" />

	<title>color picker demo</title>

	<link rel="stylesheet" href="./node_modules/yet-another-color-picker/dist/ColorPicker.css">
</head>

<body>
	<color-picker></color-picker>

	<script type="module">
		import 'yet-another-color-picker'

		const colorPicker = document.querySelector('color-picker')
		colorPicker.addEventListener('color-change', function (event) {
			console.log(event.detail)
		})
	</script>
</body>

</html>
```

### As plain files directly in the browser (no build step)

1. Download the files.

	```sh
	curl --remote-name-all 'https://cdn.jsdelivr.net/npm/yet-another-color-picker@latest/dist/ColorPicker.{js,css,d.ts}'
	```

	1. Define an [import map](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script/type/importmap) for lit-html.

		Since this package does not bundle its dependencies (e.g. lit-html), the distribution files contain imports from bare module specifiers (e.g. `import { render } from 'lit-html'`). Browsers don't understand bare module specifiers by default, but with import maps, you can teach them.

		Add the following to your HTML:

		HTML:
		```html
		<script type="importmap">
			{
				"imports": {
					"lit-html": "https://cdn.jsdelivr.net/npm/lit-html@^3.0.0"
				}
			}
		</script>
		```

		This will make imports like the one mentioned above behave as if they reference the provided URL (e.g. `import { render } from 'lit-html'` will behave like `import { render } from 'https://cdn.jsdelivr.net/npm/lit-html@^3.0.0'`).

2. Import the module to define the custom element.

	JavaScript:
	```js
	import './ColorPicker.js'
	```

3. Load the stylesheet.

	HTML:
	```html
	<link rel="stylesheet" href="./ColorPicker.css">
	```

4. Use the `color-picker` custom element.

	HTML:
	```html
	<color-picker></color-picker>
	```

**Complete example**:

```html
<!DOCTYPE html>
<html lang="en">

<head>
	<meta charset="utf-8" />
	<meta name="viewport" content="width=device-width,initial-scale=1.0" />

	<title>color picker demo</title>

	<link rel="stylesheet" href="./ColorPicker.css">
</head>

<body>
	<color-picker></color-picker>

	<script type="importmap">
		{
			"imports": {
				"lit-html": "https://cdn.jsdelivr.net/npm/lit-html@^3.0.0"
			}
		}
	</script>
	<script type="module">
		import './ColorPicker.js'

		const colorPicker = document.querySelector('color-picker')
		colorPicker.addEventListener('color-change', function (event) {
			console.log(event.detail)
		})
	</script>
</body>

</html>
```

## Documentation

### Attributes

In the following sections, the web component's [IDL and content attibutes](https://developer.mozilla.org/en-US/docs/Glossary/IDL#content_versus_idl_attributes), are documented.

**Note**: Setting a content attribute will be reflected by its corresponding IDL attribute; however, setting an IDL attribute will *not* be reflected by its corresponding content attribute.

#### `alphaChannel`

- **Description**: Whether to show controls for a color’s alpha channel. If set to `'hide'`, the alpha range input and the alpha channel input are hidden, the “Copy color” button will copy a CSS color value without alpha channel, and the object emitted in a `color-change` event will have a `cssColor` property value without alpha channel.
- **Type**: `'show' | 'hide'`
- **Required**: `false`
- **Default**: `'show'`
- **Content attribute**: `alpha-channel`
- **Usage**:

	JavaScript:
	```js
	colorPicker.alphaChannel = 'hide'
	```

	HTML:
	```html
	<color-picker alpha-channel="hide"></color-picker>
	```

#### `defaultValue`

- **Description**: Set the color picker's current color as long as the color wasn't changed by the user already.
- **Type**: `string`
- **Required**: `false`
- **Default**: `''`
- **Content attribute**: `value`
- **Usage**:

	JavaScript:
	```js
	colorPicker.defaultValue = 'hsl(270 100% 50% / 0.8)'
	```

	HTML:
	```html
	<color-picker value="hsl(270 100% 50% / 0.8)"></color-picker>
	```

	HTML:
	```html
	<color-picker value="#f80b"></color-picker>
	```

#### `disabled`

- **Description**: Disables the color picker.
- **Type**: `boolean`
- **Required**: `false`
- **Default**: `false`
- **Content attribute**: `disabled`
- **Usage**:

	JavaScript:
	```js
	colorPicker.disabled = true
	```

	HTML:
	```html
	<color-picker disabled></color-picker>
	```

#### `format`

- **Description**: The current color format. Also changes when interacting with the “Switch format” button or when calling [`switchFormat()`](#switchformat).
- **Type**: `VisibleColorFormat`
- **Required**: `false`
- **Default**: `'hsl'`
- **Content attribute**: `format`
- **Usage**:

	JavaScript:
	```js
	colorPicker.format = 'hwb'
	```

	HTML:
	```html
	<color-picker format="hwb"></color-picker>
	```

#### `id`

- **Description**: This value will be used to prefix any of the color picker’s form-associated elements’ `id` and `for` attribute values. Make sure to set this if you use multiple instances of the component on a page.

	**Note**: The IDL attribute `id` of form-associated elements _is_ reflected by its content attribute.

- **Type**: `string`
- **Required**: `false`
- **Default**: `'color-picker'`
- **Content attribute**: `id`
- **Usage**:

	JavaScript:
	```js
	colorPicker.id = 'color-picker-1'
	```

	HTML:
	```html
	<color-picker id="color-picker-1"></color-picker>
	```

#### `name`

- **Description**: Name of the color picker (used when the color picker is part of a form).

	**Note**: The IDL attribute `name` of form-associated elements _is_ reflected by its content attribute.

- **Type**: `string`
- **Required**: `false`
- **Default**: `''`
- **Content attribute**: `name`
- **Usage**:

	JavaScript:
	```js
	colorPicker.name = 'color-picker'
	```

	HTML:
	```html
	<color-picker name="color-picker"></color-picker>
	```

#### `readOnly`

- **Description**: Makes the color picker read-only.
- **Type**: `boolean`
- **Required**: `false`
- **Default**: `false`
- **Content attribute**: `readonly`
- **Usage**:

	JavaScript:
	```js
	colorPicker.readonly = true
	```

	HTML:
	```html
	<color-picker readonly></color-picker>
	```

#### `value`

- **Description**: The current color of the color picker.

	The `value` getter will return the current color as a string (formatted as a CSS RGB color, e.g. `'rgb(127.5 0 255 / 0.8)'`). This is also the form value used in form submission.

	The `value` setter accepts a `string` (any CSS color works, e.g. `'hsl(270 100% 50% / 0.8)'`) or an `object` (e.g. `{ h: 270, s: 100, l: 50, a: 0.8 }`).

- **Type**: `string | ColorHsl | ColorHwb | ColorRgb` (for `string`, any valid CSS color string will work)
- **Required**: `false`
- **Default**: `'rgb(255 255 255 / 1)'`
- **Content attribute**: None. The `value` IDL attribute doesn't directly reflect a content attribute. However, the `value` IDL attribute does reflect the `defaultValue` IDL attribute as long as the dirty flag isn't set.
- **Usage**:

	JavaScript:
	```js
	colorPicker.value = 'hsl(270 100% 50% / 0.8)'
	colorPicker.value
	//> 'rgb(127.5 0 255 / 0.8)'
	```

	JavaScript:
	```js
	colorPicker.value = { h: 270, s: 100, l: 50, a: 0.8 }
	```

#### `visibleFormats`

- **Description**: A list of visible color formats. Controls for which formats the color `input` elements are shown and in which order the formats will be cycled through when activating the format switch button.
- **Type**: `VisibleColorFormat` (an array of `VisibleColorFormat`s)
- **Required**: `false`
- **Default**: `['hex', 'hsl', 'hwb', 'rgb']`
- **Content attribute**: `visible-formats`
- **Usage**:

	JavaScript:
	```js
	colorPicker.visibleFormats = ['hsl', 'hwb']
	```

	HTML:
	```html
	<color-picker visible-formats="hsl,hwb"></color-picker>
	```

### Methods

#### `copyColor()`

- **Description**: Copies the current color (determined by the active color format).

  This method behaves the same as activating the “Copy color” button.

  **Only works in secure browsing contexts (i.e. HTTPS)**.
- **Return type**: `Promise<void>` (the promise returned by calling `window.navigator.clipboard.writeText`)
- **Usage**:

	JavaScript:
	```js
	colorPicker.copyColor()
	```

#### `switchFormat()`

- **Description**: Sets the next active color format by cycling through `colorPicker.visibleFormats`. This method behaves the same as activating the “Switch format” button. To set a specific color format, use the [`format` property](#format).
- **Return type**: `void`
- **Usage**:

	JavaScript:
	```js
	colorPicker.switchFormat()
	```

### Events

#### `change`

- **Description**: The `change` event is fired when the color is changed.
- **Type**: `Event`

#### `color-change`

- **Description**: The `color-change` event is fired when the color is changed.
- **Type**: `CustomEvent<ColorChangeDetail>`
- **Data**: Emits an object whose `detail` property contains both the internal `colors` object and a CSS color value as a string based on the currently active format. The `cssColor` property respects the `alphaChannel` IDL attribute.

	```ts
	{
		colors: {
			hex: string
			hsl: ColorHsl
			hwb: ColorHwb
			rgb: ColorRgb
		}
		cssColor: string
	}
	```

- **Usage**:

	HTML:
	```html
	<color-picker color="hsl(270 100% 50% / 0.8)"></color-picker>
	```

	JavaScript:
	```js
	import 'yet-another-color-picker'

	const colorPicker = document.querySelector('color-picker')
	colorPicker.addEventListener('color-change', function (event) {
		console.log(event.detail)
	})
	```

#### `input`

- **Description**: The `input` event is fired when the color is changed.
- **Type**: `Event`

## Theming

You can customize the GUI of the color picker using CSS custom properties:

```css
:root {
	--cp-color-focus: tomato;
	--cp-width-border: 2px;
}
```

Available custom properties and their default values:

| Custom property               | Default value |
| ----------------------------- | ------------- |
| `--cp-color-background-input` | `#fff`
| `--cp-color-background`       | `#fff`
| `--cp-color-border`           | `#000`
| `--cp-color-focus`            | `#19f`
| `--cp-color-text-input`       | `currentColor`
| `--cp-color-text`             | `currentColor`
| `--cp-font-family`            | `-apple-system, BlinkMacSystemFont, Segoe UI, Arial, sans-serif`
| `--cp-font-size`              | `0.8em`
| `--cp-spacing`                | `6px`
| `--cp-width-border`           | `1px`
| `--cp-width-color-space`      | `300px`

## Versioning

This package uses [semantic versioning](https://semver.org).

## Contributing

See [CONTRIBUTING.md](https://github.com/kleinfreund/yet-another-color-picker/blob/main/CONTRIBUTING.md).

## Design

The color picker consists of the following main elements:

- **Color space**:

	For fine-tuning the saturation and lightness/value, a slice of the HSV cylinder for the currently selected hue is shown.

	The HSV cylinder is more convenient for this task than the HSL cylinder as it shows a color at 100% saturation and 100% value in the top right corner (i.e. one can drag the color space thumb into the corner as a quasi shortcut). The HSL cylinder’s slice has this color at the halfway point of the Y axis (i.e. at 50% lightness) which isn’t easy to select.

- **Hue slider**:

	A slider for selecting the current hue. This rotates the HSV cylinder; thus, it changes the slice of the HSV cylinder that’s shown in the color space.

- **Alpha slider**:

	A slider for selecting the current alpha value.

- **Copy button**:

	Copies the color formatted as a CSS color string in the active format.

- **Color inputs**:

	A set of text fields which allow you to enter the individual components of each color. The text fields are shown based on the active format.

- **Switch format button**:

	Cycles through the available color formats (currently HEX, HSL, HWB, and RGB).

## To do

- Re-consider minification strategy following https://lit.dev/docs/tools/publishing/#don't-bundle-minify-or-optimize-modules (see also https://open-wc.org/guides/developing-components/publishing/#do-not-minify).

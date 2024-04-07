# yet-another-color-picker

[![Tests passing](https://github.com/kleinfreund/yet-another-color-picker/workflows/Tests/badge.svg)](https://github.com/kleinfreund/yet-another-color-picker/actions)

A color picker web component.

This package’s files are distributed in the ES module format and have not been transpiled. It uses [lit-html](https://www.npmjs.com/package/lit-html).

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
	- [Properties](#properties)
		- [`alphaChannel`](#alphachannel)
		- [`color`](#color)
		- [`format`](#format)
		- [`id`](#id)
		- [`visibleFormats`](#visibleformats)
	- [Methods](#methods)
		- [`copyColor()`](#copycolor)
		- [`switchFormat()`](#switchformat)
	- [Events](#events)
		- [`color-change`](#color-change)
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
	curl --remote-name-all 'https://cdn.jsdelivr.net/npm/yet-another-color-picker@latest/dist/ColorPicker.{js,css}'
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

### Properties

Most of the following properties can also be set via its corresponding attribute.

**Note**: Changing an attribute will be synced to its corresponding property; however, changing a property will *not* be synced to its corresponding attribute.

#### `alphaChannel`

- **Description**: Whether to show input controls for a color’s alpha channel. If set to `'hide'`, the alpha range input and the alpha channel input are hidden, the “Copy color” button will copy a CSS color value without alpha channel, and the object emitted in a `color-change` event will have a `cssColor` property value without alpha channel.
- **Type**: `'show' | 'hide'`
- **Required**: `false`
- **Default**: `'show'`
- **Attribute**: `alpha-channel`
- **Usage**:

	JavaScript:
	```js
	colorPicker.alphaChannel = 'hide'
	```

	HTML:
	```html
	<color-picker alpha-channel="hide"></color-picker>
	```

#### `color`

- **Description**: Sets the color of the color picker. You can pass any valid CSS color string.
- **Type**: `string | ColorHsl | ColorHwb | ColorRgb` (for `string`, any valid CSS color string will work)
- **Required**: `false`
- **Default**: `'#ffffffff'`
- **Attribute**: `color`
- **Usage**:

	JavaScript:
	```js
	colorPicker.color = 'hsl(270 100% 50% / 0.8)'
	```

	JavaScript:
	```js
	colorPicker.color = { h: 270, s: 100, l: 50, a: 0.8 }
	```

	HTML:
	```html
	<color-picker color="hsl(270 100% 50% / 0.8)"></color-picker>
	```

	HTML:
	```html
	<color-picker color="#f80b"></color-picker>
	```

#### `format`

- **Description**: The current color format. Also changes when interacting with the “Switch format” button or when calling [`switchFormat()`](#switchformat).
- **Type**: `VisibleColorFormat`
- **Required**: `false`
- **Default**: `'hsl'`
- **Attribute**: `format`
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

- **Description**: The ID value will be used to prefix all `input` elements’ `id` and `label` elements’ `for` attribute values. Make sure to set this if you use multiple instances of the component on a page.
- **Type**: `string`
- **Required**: `false`
- **Default**: `'color-picker'`
- **Attribute**: `id`
- **Usage**:

	JavaScript:
	```js
	colorPicker.id = 'color-picker-1'
	```

	HTML:
	```html
	<color-picker id="color-picker-1"></color-picker>
	```

#### `visibleFormats`

- **Description**: A list of visible color formats. Controls for which formats the color `input` elements are shown and in which order the formats will be cycled through when activating the format switch button.
- **Type**: `VisibleColorFormat` (an array of `VisibleColorFormat`s)
- **Required**: `false`
- **Default**: `['hex', 'hsl', 'hwb', 'rgb']`
- **Attribute**: `visible-formats`
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

#### `color-change`

- **Description**: The custom event that is emitted each time the internal colors object is updated.
- **Type**: `CustomEvent<ColorChangeDetail>`
- **Data**: The custom event emits an object whose `detail` property contains both the internal colors object and a CSS color value as a string based on the currently active format. The `cssColor` property will respect `alpha-channel`.

	```ts
	{
		colors: {
			hex: string
			hsl: ColorHsl
			hsv: ColorHsv
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

# color-picker

[![Tests passing](https://github.com/kleinfreund/yet-another-color-picker/workflows/main/badge.svg)](https://github.com/kleinfreund/yet-another-color-picker/actions)

A color picker web component.

This package’s files are distributed in the ES module format and have not been transpiled.

Links:

- [demo](https://yet-another-color-picker.netlify.app)
- [**npmjs.com**/package/yet-another-color-picker](https://www.npmjs.com/package/yet-another-color-picker)
	- [on BundlePhobia](https://bundlephobia.com/result?p=yet-another-color-picker)
- [**github.com**/kleinfreund/yet-another-color-picker](https://github.com/kleinfreund/yet-another-color-picker)
	- [code of conduct](https://github.com/kleinfreund/yet-another-color-picker/blob/main/CODE_OF_CONDUCT.md)
	- [contributing guidelines](https://github.com/kleinfreund/yet-another-color-picker/blob/main/CONTRIBUTING.md)

## Contents

- [Installation](#installation)
- [Usage](#usage)
- [Documentation](#documentation)
	- [Props](#props)
		- [`data-color`](#data-color)
		- [`data-visible-formats`](#data-visible-formats)
		- [`data-default-format`](#data-default-format)
		- [`data-alpha-channel`](#data-alpha-channel)
		- [`id`](#id)
	- [Events](#events)
		- [`color-change`](#color-change)
- [Versioning](#versioning)
- [Contributing](#contributing)
- [Design](#design)
- [To do](#to-do)

## Installation

```sh
npm install yet-another-color-picker
```

## Usage

Import the `ColorPicker` custom element class and define it.

HTML:
```html
<color-picker></color-picker>
```

JavaScript:
```js
import { ColorPicker } from 'yet-another-color-picker'

window.customElements.define('color-picker', ColorPicker)
```

### Styles

HTML:
```html
<link
	rel="stylesheet"
	href="./node_modules/yet-another-color-picker/dist/ColorPicker.css"
>
```

## Documentation

### Props

#### `data-color`

- **Description**: Sets the color of the color picker. You can pass any valid CSS color string.
- **Type**: `string` (any valid CSS color string)
- **Required**: `false`
- **Default**: `'#ffffffff'`
- **Usage**:

	HTML:
	```html
	<color-picker data-color="hsl(270 100% 50% / 0.8)" />
	```

	HTML:
	```html
	<color-picker data-color="#f80b" />
	```

	JavaScript:
	```js
	colorPicker.setAttribute('data-color', 'hsl(270 100% 50% / 0.8)')
	```

#### `data-visible-formats`

- **Description**: A comma-separated string of visible color formats. Controls for which formats the color `input` elements are shown and in which order the formats will be cycled through when activating the format switch button.
- **Type**: `string` (a comma-separated list of `VisibleColorFormat`s)
- **Required**: `false`
- **Default**: `'hex,hsl,hwb,rgb'`
- **Usage**:

	HTML:
	```html
	<color-picker data-visible-formats="hsl,hwb" />
	```

#### `data-default-format`

- **Description**: The color format to show by default when rendering the color picker. Must be one of the formats specified in `data-visible-formats`.
- **Type**: `VisibleColorFormat`
- **Required**: `false`
- **Default**: `'hsl'`
- **Usage**:

	HTML:
	```html
	<color-picker data-default-format="hwb" />
	```

#### `data-alpha-channel`

- **Description**: Whether to show input controls for a color’s alpha channel. If set to `'hide'`, the alpha range input and the alpha channel input are hidden, the “Copy color” button will copy a CSS color value without alpha channel, and the object emitted in a `color-change` event will have a `cssColor` property value without alpha channel.
- **Type**: `'show'` or `'hide'`
- **Required**: `false`
- **Default**: `'show'`
- **Usage**:

	HTML:
	```html
	<color-picker data-alpha-channel="hide" />
	```

#### `id`

- **Description**: The ID value will be used to prefix all `input` elements’ `id` and `label` elements’ `for` attribute values. Set this prop if you use multiple instances of the component on one page.
- **Type**: `string`
- **Required**: `false`
- **Default**: `'color-picker'`
- **Usage**:

	HTML:
	```html
	<color-picker id="color-picker-1" />
	```

### Events

#### `color-change`

- **Description**: The custom event that is emitted each time the internal colors object is updated.
- **Data**: The custom event emits an object whose `detail` property contains both the internal colors object and a CSS color value as a string based on the currently active format. The `cssColor` property will respect `data-alpha-channel`.

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
	<color-picker data-color="hsl(270 100% 50% / 0.8)" />
	```

	JavaScript:
	```js
	import { ColorPicker } from 'yet-another-color-picker'
	/** @typedef {import('yet-another-color-picker').ColorChangeDetail} ColorChangeDetail */

	window.customElements.define('color-picker', ColorPicker)

	const colorPicker = document.querySelector('color-picker')
	colorPicker.addEventListener('color-change', colorChangeListener)

	/**
	 * @param {CustomEvent<ColorChangeDetail>} event
	 */
	function colorChangeListener (event) {
		console.log(event.detail)
	}
	```

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

- Document browser usage via import maps (https://caniuse.com/import-maps).
- Consider providing a version that adds `ColorPicker` to `window` so the package can be used via CDNs such as unpkg and jsDelivr.
- Re-consider how state is recomputed internally.

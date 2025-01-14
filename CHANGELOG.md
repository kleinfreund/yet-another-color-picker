## [4.0.1](https://github.com/kleinfreund/yet-another-color-picker/compare/v4.0.0...v4.0.1) (2024-12-17)

### Bug Fixes

* **dist:** declaring sideEffects: false in package.json ([512142a](https://github.com/kleinfreund/yet-another-color-picker/commit/512142aea525e043e88154d5f4f4bec314fa2116))

  Fix declaring `sideEffects: false` in the package.json file with inadvertently breaks the likely most common usage of the package using `import 'yet-another-color-picker'` specifically for its side effect of registering the custom element.

## [4.0.0](https://github.com/kleinfreund/yet-another-color-picker/compare/v3.0.1...v4.0.0) (2024-10-20)

### ⚠ BREAKING CHANGES

* Remove the content attribute `color`. **How to update**: Use the `value` content attribute or the `defaultValue` IDL attribute instead.
* Remove the IDL attribute `color`. **How to update**: Use the `value` IDL attribute instead.
* Remove the IDL attribute `colors`. **How to update**: Use the event data of the `color-change` event instead.
* Remove the IDL attribute `defaultFormat`. **How to update**: Use the IDL attribute `format` instead.
* Remove the content attribute `default-format`. **How to update**: Use the content attribute `format` instead.

### Features

* add color-copy event ([8d850f0](https://github.com/kleinfreund/yet-another-color-picker/commit/8d850f09929dde4d6676477f6d3277feede489d2))

  Add a new event `copy-color` that is fired once a copy operation succeeded. Its event data is the same as that of the `color-change` event.
* make the color picker a form-associated custom element ([e11232a](https://github.com/kleinfreund/yet-another-color-picker/commit/e11232ac6b35324133a2bc16d41ff828ac32193d))

  Make the color picker a form-associated custom element via the ElementInternals API. This allows the color picker to participate in forms as a form control and contribute a form value on form submission. Additionally, on form reset, the color picker's form value is reset to the value of the `value` content attribute. The `value` content attribute, `defaultValue` IDL attribute, and `value` IDL attribute are implemented to match the behavior of native HTML form controls.

  Add the `value` IDL attribute. The getter returns a string formatted as a CSS RGB color (e.g. `'rgb(127.5 0 255 / 0.8)'`). This is also the value used in form submission. The setter accepts any valid CSS color string in a known format (including named colors) or any of the color picker's internal color object formats (e.g. `{ r: 127.5, g: 0, b: 255, a: 0.8 }`).

  Add the `defaultValue` IDL and `value` content attribute. Sets the default value used on form reset. Also sets the `value` IDL attribute as long as the user hasn't change the color.

  Add the `disabled` IDL and content attribute. Disabling the color picker will render it completely inert. All containing form controls and buttons will be disabled and the color picker thumb won't respond to interactions. An ancestor `fieldset` element which is disabled will also render the color picker disabled.

  Add the `readOnly` IDL and `readonly` content attribute. Setting the color picker to read-only will prevent the user from changing the color.

  Add the `required` IDL and content attribute.

  Add the `input` and `change` events. They are fired whenever the user changes the color. Note, that there is currently no scenario in which only the `input` but not the `change` event is fired.

  **BREAKING CHANGE**: Remove the content attribute `color`. **How to update**: Use the `value` content attribute or the `defaultValue` IDL attribute instead.

  **BREAKING CHANGE**: Remove the IDL attribute `color`. **How to update**: Use the `value` IDL attribute instead.

  **BREAKING CHANGE**: Remove the IDL attribute `colors`. **How to update**: Use the event data of the `color-change` event instead.
* support format content attribute ([8aeaae9](https://github.com/kleinfreund/yet-another-color-picker/commit/8aeaae98378eb6c4bbc264acd1ac71b7f13894ff))

  Add support for the `format` content attribute which corresponds to the `activeFormat` IDL attribute.

  **BREAKING CHANGE**: Remove the IDL attribute `defaultFormat. **How to update**: Use the IDL attribute `format` instead.

  **BREAKING CHANGE**: Remove the content attribute `default-format`. **How to update**: Use the content attribute `format` instead.

### Bug Fixes

* not listing lit-html as a peer dependency ([94bc1e9](https://github.com/kleinfreund/yet-another-color-picker/commit/94bc1e95ae2921c992c5289611cb056be309ad10))

## [3.0.1](https://github.com/kleinfreund/yet-another-color-picker/compare/v3.0.0...v3.0.1) (2023-11-23)


### Bug Fixes

* cannot find module TypeScript error ([9872519](https://github.com/kleinfreund/yet-another-color-picker/commit/987251931308a5339d246ab54ba47dd976e1e468))

  Adds the types field back to the package.json file to prevent the "Cannot find module 'yet-another-color-picker' or its corresponding type declarations." error.

## [3.0.0](https://github.com/kleinfreund/yet-another-color-picker/compare/v2.0.1...v3.0.0) (2023-11-23)


### ⚠ BREAKING CHANGES

* Renames the following CSS custom properties: `--cp-border-color` → `--cp-color-border`, `--cp-border-width` → `--cp-width-border`, `--cp-color-space-width` → `--cp-width-color-space`, `--cp-focus-color` → `--cp-color-focus` (see README.md for the full list of supported custom properties).
* Removes the following CSS custom properties: `--cp-border` (direct replacement: `var(--cp-width-border) solid var(--cp-color-border)`), `--cp-focus-outline` (direct replacement: `2px solid var(--cp-color-focus)`).
* Removes the module specifier `yet-another-color-picker/dist/ColorPicker.css`. **How to update**: Use `yet-another-color-picker/styles` instead.
* Removes the module specifier `yet-another-color-picker/dist/ColorPicker.d.ts`. **How to update**: Import from `yet-another-color-picker` instead.
* Changes how color objects provided to the `color` property are handled. Color objects no longer use values that are constrained to the range [0, 1] (except for any alpha channel values). **How to update**: Multiply any value of objects you pass to the `color` property by the number in parentheses corresponding to the right color channel: For HSL: h (360), s (100), l (100). For HWB: h (360), w (100), b (100). For RGB: r (255), g (255), b (255).
* Changes the data emitted by the `color-change` event such that the values on the `colors` object are no longer constrained to the range [0, 1] (except for any alpha channel values). **How to update**: Divide any value of objects from the `colors` object you mkae use of by the number in parentheses corresponding to the right color channel: For HSL: h (360), s (100), l (100). For HWB: h (360), w (100), b (100). For RGB: r (255), g (255), b (255).


### Features

* feat: add module specifier yet-another-color-picker/styles ([17fee1d13ed72c7ce0fa589b7e30965c713c1d08](https://github.com/kleinfreund/yet-another-color-picker/commit/17fee1d13ed72c7ce0fa589b7e30965c713c1d08))

  Adds the module specifier `yet-another-color-picker/styles` which resolves to the color picker styles (i.e. `dist/ColorPicker.css`).

  **BREAKING CHANGE**: Removes the module specifier `yet-another-color-picker/dist/ColorPicker.css`. **How to update**: Use `yet-another-color-picker/styles` instead.

* feat: make theming using custom properties easier ([0c1d5b6b5f53a0c068b71a0e8517402fbd50c458](https://github.com/kleinfreund/yet-another-color-picker/commit/0c1d5b6b5f53a0c068b71a0e8517402fbd50c458))

  Simplifies theming of the color picker GUI with CSS custom properties by making better use of the CSS cascade. Customizing the custom properties (e.g. `--cp-focus-color`) can now be done on any ancestor element of `.cp-color-picker` in addition to `.cp-color-picker` itself. For example, you can set `--cp-focus-color: orange` on `:root` and it will work.

  Adds the following CSS custom properties for theming: `--cp-color-background-input`, `--cp-color-background`, `--cp-color-text-input`, `--cp-color-text`, `--cp-font-family`, `--cp-font-size` (see README.md for the full list of supported custom properties).

  **BREAKING CHANGE**: Renames the following CSS custom properties: `--cp-border-color` → `--cp-color-border`, `--cp-border-width` → `--cp-width-border`, `--cp-color-space-width` → `--cp-width-color-space`, `--cp-focus-color` → `--cp-color-focus` (see README.md for the full list of supported custom properties).

  **BREAKING CHANGE**: Removes the following CSS custom properties: `--cp-border` (direct replacement: `var(--cp-width-border) solid var(--cp-color-border)`), `--cp-focus-outline` (direct replacement: `2px solid var(--cp-color-focus)`).

* feat: support all angle values as input ([ec7944ed4a50c303ababcf4084f7ed4214a6a731](https://github.com/kleinfreund/yet-another-color-picker/commit/ec7944ed4a50c303ababcf4084f7ed4214a6a731))

  Adds support for the angle value units `deg`, `grad`, `rad`, and `turn` when entering hues (see https://www.w3.org/TR/css-values-4/#angle-value).


  Stops normalizing angle values to the range [0, 360) (e.g. a hue value of 450 will no longer be processed as 90).


### Bug Fixes

* fix: color property being listed as accepting ColorHsv ([c4084a8b24ee118efef772f5fa6c4b756f731489](https://github.com/kleinfreund/yet-another-color-picker/commit/c4084a8b24ee118efef772f5fa6c4b756f731489))

* fix: integers with trailing zeros being incorrectly rounded ([a7ec5cf20a8d477f332df1f5a3a679edfa5a043d](https://github.com/kleinfreund/yet-another-color-picker/commit/a7ec5cf20a8d477f332df1f5a3a679edfa5a043d))

  Fixes cases where integers would be incorrectly rounded and lose their trailing zeros (only affects representation of color values as CSS color strings, e.g. when copying).


### Miscellaneous Chores

* chore: remove dist/ColorPicker.d.ts module specifier ([c21138f00089b4927de5fff482bbaa0b211e8db0](https://github.com/kleinfreund/yet-another-color-picker/commit/c21138f00089b4927de5fff482bbaa0b211e8db0))

  **BREAKING CHANGE**: Removes the module specifier `yet-another-color-picker/dist/ColorPicker.d.ts`. **How to update**: Import from `yet-another-color-picker` instead.


### Code Refactoring

* refactor: change color channels to not be constrained to the range [0, 1] ([6161e746ecf98b062a4b68b7c6512f65e4c286dc](https://github.com/kleinfreund/yet-another-color-picker/commit/6161e746ecf98b062a4b68b7c6512f65e4c286dc))

  Changes how color objects are processed (via the `color` property), stored, and emitted (via the `color-change` event) such that the representation of the current color doesn't have its values constrained to the range [0, 1] (inclusive) anymore. Instead, the values are now stored as close as possible to the native representation in CSS (e.g. the hue value 270 is now stored as 270 instead of 0.75). Alpha channel values continue to be stored in the range [0, 1].

  **BREAKING CHANGE**: Changes how color objects provided to the `color` property are handled. Color objects no longer use values that are constrained to the range [0, 1] (except for any alpha channel values). **How to update**: Multiply any value of objects you pass to the `color` property by the number in parentheses corresponding to the right color channel: For HSL: h (360), s (100), l (100). For HWB: h (360), w (100), b (100). For RGB: r (255), g (255), b (255).

  **BREAKING CHANGE**: Changes the data emitted by the `color-change` event such that the values on the `colors` object are no longer constrained to the range [0, 1] (except for any alpha channel values). **How to update**: Divide any value of objects from the `colors` object you mkae use of by the number in parentheses corresponding to the right color channel: For HSL: h (360), s (100), l (100). For HWB: h (360), w (100), b (100). For RGB: r (255), g (255), b (255).

## [2.0.1](https://github.com/kleinfreund/yet-another-color-picker/compare/v2.0.0...v2.0.1) (2023-08-03)


### Bug Fixes

* copy button being labelled as "Copy coloy" ([fd3348e](https://github.com/kleinfreund/yet-another-color-picker/commit/fd3348e97dfb2d406be96ef266742277384cee51))

## [2.0.0](https://github.com/kleinfreund/yet-another-color-picker/compare/v1.0.1...v2.0.0) (2023-07-24)


### ⚠ BREAKING CHANGES

* Stops bundling lit-html so applications can deduplicate the dependency in their build process. This removes the ability to use the package *directly* in the browser without a build step. To continue doing so, use import maps to map `lit-html` to a CDN URL to address this issue (see documentation for instructions).
* Changes the file name and location of the color picker typings from `types/index.d.ts` to `dist/ColorPicker.d.ts`. Please update your imports.
* Removes the `data-` prefix from all color picker attributes (`data-alpha-channel` → `alpha-channel`, `data-color` → `color`, `data-default-format` → `default-format`, `data-visible-channels` → `visible-channels`).
* No longer sets color picker attributes to their respective default values. As a replacement, their associated properties will now be set to those default values.
* Makes the color picker self-define (with the local name "color-picker") when importing the module. This removes the need for calling `window.customElements.define('color-picker', ColorPicker)` manually in application code.

### Features

* adds copyColor() method ([42ebe28](https://github.com/kleinfreund/yet-another-color-picker/commit/42ebe280fd34d0790a07af84af53ab4acd898d12))
* adds support for properties ([a3737c4](https://github.com/kleinfreund/yet-another-color-picker/commit/a3737c4bb1ecb8fad0378d7e30f5585ad2e5bb67))
* adds switchFormat() method ([0574aa1](https://github.com/kleinfreund/yet-another-color-picker/commit/0574aa1545b770829b3401f438cf0a70100a2189))
* self-defines custom element as color-picker on import ([a1bd609](https://github.com/kleinfreund/yet-another-color-picker/commit/a1bd6092742d4d5ff87a0ef333532062956ce4bb))


### Bug Fixes

* not setting box-sizing on the color picker element ([752d7d4](https://github.com/kleinfreund/yet-another-color-picker/commit/752d7d4ab4abd7888a2d32bc74b4380c4c5572e6))


### Code Refactoring

* converts code base to typescript ([be55758](https://github.com/kleinfreund/yet-another-color-picker/commit/be5575853c9204ec207c8ffdab490441634ae6a0))


### Miscellaneous Chores

* removes "data-" prefix from color picker attributes ([318bb3f](https://github.com/kleinfreund/yet-another-color-picker/commit/318bb3f737c6ebbb41175e508407e3d4ff7eaad9))
* stops bundling lit-html ([facdaba](https://github.com/kleinfreund/yet-another-color-picker/commit/facdaba6715df7702530b84c044793c5c4600349))

## [1.0.1](https://github.com/kleinfreund/yet-another-color-picker/compare/v1.0.0...v1.0.1) (2023-05-18)


### Bug Fixes

* types incorrectly set-up in pkg.exports ([f4833bb](https://github.com/kleinfreund/yet-another-color-picker/commit/f4833bb1f294a0a10f4ba4ba88e0054e1f6910fd))

## 1.0.0 (2022-11-20)


### Features

* publishes first version of the package ([2a7ec02](https://github.com/kleinfreund/yet-another-color-picker/commit/2a7ec02b04b70d90f50a8d2c259fb2deb76c4d9c))

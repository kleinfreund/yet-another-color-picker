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

## 1.0.1 (https://github.com/kleinfreund/yet-another-color-picker/compare/v1.0.0...v1.0.1) (2023-05-18)

### Bug Fixes

* types incorrectly set-up in pkg.exports (f4833bb (https://github.com/kleinfreund/yet-another-color-picker/commit/f4833bb1f294a0a10f4ba4ba88e0054e1f6910fd))

## 1.0.0 (2022-11-20)

### Features

* publishes first version of the package (2a7ec02 (https://github.com/kleinfreund/yet-another-color-picker/commit/2a7ec02b04b70d90f50a8d2c259fb2deb76c4d9c))

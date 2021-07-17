# Changelog

All notable changes to **colors-convert** library are be documented here.

## Unreleased

-

## 1.4.0

- **[add]** add the following functions: `isRgbString`, `isRgbaString`, `isCmykString`, `isHslString`, `isHslaString`, `stringToColor`

## 1.3.0

- **[fix]** `#00000` is not a valid hex color
- **[add]** add the following functions: `colorToHex`, `color2rgba`, `rgbaToHex`, `cmykToRgba`, `cmykToHsla`, `hexToHsla`, `rgbToHsla`, `rgbaToHsla`, `hslToRgba`, `colorToCmyk`, `colorToHsl`, `hslToHsla`, `colorToHsla`, `hslaStringToObject`, `hexToRgb`, `hexToRgba`, `shortToLongHex`
- **[add]** add hsla color format
- **[add]** add api page
- **[add]** test coverage > 97%
- **[add]** add a new logo
- **[change]** set as deprecated the following functions: `color2string`, `color2cssString`, `hex2rgbOrRgba`, `hex2rgba`, `hex2hexWithAlpha`, `hex2cmyk`, `hex2hsl`, `rgb2hex`, `rgb2cmyk`, `rgb2hsl`, `rgb2rgba`, `color2rgb`, `rgbString2Object`, `rgba2rgb`, `rgbaString2Object`, `cmyk2hex`, `cmyk2rgb`, `cmyk2hsl`, `cmykString2Object`, `hsl2hex`, `hsl2rgb`, `hsl2cmyk`, `hslString2Object`, `getRandomColor`,
- **[change]** `rgb2rgba` has optional alpha parameter
- **[change]** `ColorName` type: is no more a string, but an object with name, hex and rgb
- **[change]** update README
- **[remove]** remove useless dependencies

## 1.2.4 - 2020-06-28

- **[change]** add Netlify Status in README
- **[add]** add useless demo page

## 1.2.3 - 2020-06-28

- **[change]** update README

## 1.2.2 - 2020-06-28

- **[change]** update README

## 1.2.1 - 2020-06-28

- [fix] remove the `°` character for hsl on `color2cssString` function (closes: #2)

## 1.2.0 - 2020-06-28

- **[add]** add `hslString2Object`, `rgbString2Object`, `rgbaString2Object`, `cmykString2Object` functiona

## 1.1.5 - 2020-02-16

- **[change]** update README
- **[add]** add test for `color2string` and `color2cssString` for hsl color format

## 1.1.4 - 2020-02-16

- [fix] fix compiling problems

## 1.1.3 - 2020-02-16

- I don't know

## 1.1.2 - 2020-02-16

- **[change]** rename `COLOR` type with `Color`
- **[add]** add and test `color2rgb`, `rgb2rgba`, `rgba2rgb` functions
- **[add]** add and test `mix`, `name` functions

## 1.1.1 - 2019-12-26

- I don't know

## 1.1.0 - 2019-12-26

- **[add]** add Hsl color model
- **[add]** add `cmyk2hsl`, `hex2hsl`, `hsl2cmyk`, `hsl2hex`, `rgb2hsl` functions

## 1.0.9 - 2019-12-19

- **[add]** create clean script

## 1.0.8 - 2019-12-19

- **[add]** test utils functions

## 1.0.7 - 2019-12-18

- **[change]** update README
- **[change]** throw errors
- **[change]** small refactor on test, conversion functions and package.json scripts
- **[change]** git ignore coverage files
- **[add]** add `rgb2cmyk`, `hex2cmyk`, `cmyk2rgb`, `cmyk2hex` functions

## 1.0.6 - 2019-12-18

- I don't know

## 1.0.5 - 2019-12-18

- **[change]** update README
- **[change]** update tsconfig

## 1.0.4 - 2019-12-17

- **[change]** update README
- **[add]** add package.json scripts
- **[change]** test refactor
- **[add]** add `hex2cmyk`, `getRandomColor` functions

## 1.0.3 - 2019-11-24

- **[add]** create README

## 1.0.2 - 2019-11-24

- **[change]** small refactor

## 1.0.1 - 2019-11-24

- **[setup]** TypeScript, Jest
- **[add]** add Hex, Rgb, Rgba, Cmyk color models
- **[add]** add basic functions to convert colors

## 1.0.0 - 2019-11-02

- **[add]** first commit: basic setup

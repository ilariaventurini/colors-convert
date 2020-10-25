import { round } from 'lodash'
import { RGB, RGBA, CMYK, HEX, HSL, Color } from '../../types/types'
import { isRgb, isRgba, isColor, isHex, isCmyk } from '../../types/isType'
import { applyFnToEachObjValue } from '../misc/utils'
import { hex2rgba } from './hex'
import { cmyk2rgb } from './cmyk'
import { hsl2rgb } from './hsl'

/**
 * Convert an rgb object to hex.
 * @param rgb color to convert to HEX
 * @returns HEX color
 */
export function rgb2hex(rgb: RGB): HEX {
  if (!isRgb(rgb)) {
    throw new Error(`${rgb} is not a rgb color.`)
  }

  const { r, g, b } = rgb
  const hex = [r, g, b]
    .map((value) => {
      const hex = value.toString(16)
      const paddedHex = hex.length === 1 ? `0${hex}` : hex
      return paddedHex
    })
    .join('')
  return `#${hex}`
}

/**
 * Convert an rgb to a cmyk.
 * @param rgb color to convert to CMYK
 * @returns CMYK color
 */
export function rgb2cmyk(rgb: RGB): CMYK {
  if (!isRgb(rgb)) {
    throw new Error(`${rgb} is not a rgb color.`)
  }

  const { r, g, b } = rgb

  // normalize r,g,b values (from 0-255 to 0-1)
  const r01 = r / 255
  const g01 = g / 255
  const b01 = b / 255

  if (r01 === 0 && g01 === 0 && b01 === 0) {
    return { c: 0, m: 0, y: 0, k: 100 }
  }

  const k = 1 - Math.max(r01, g01, b01)
  const c = (1 - r01 - k) / (1 - k)
  const m = (1 - g01 - k) / (1 - k)
  const y = (1 - b01 - k) / (1 - k)

  const roundedCmyk = applyFnToEachObjValue({ c, m, y, k }, (c: number) => round(c * 100)) as CMYK

  return roundedCmyk
}

/**
 * Convert an rgb object to hsl.
 * @param rgb color to convert to HSL
 * @returns HSL color
 */
export function rgb2hsl(rgb: RGB): HSL {
  if (!isRgb(rgb)) {
    throw new Error(`${rgb} is not a rgb color.`)
  }

  const { r, g, b } = rgb

  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  const l = (max + min) / 2

  if (max === min) {
    // achromatic
    return { h: 0, s: 0, l: (l / 255) * 100 }
  }

  const chroma = max - min
  const s = Math.abs(chroma / (1 - Math.abs(2 * l - 1))) * 100 - 1

  let h
  switch (max) {
    case r:
      h = 60 * ((g - b) / chroma) + (g < b ? 360 : 0)
      break
    case g:
      h = 120 + (60 * (b - r)) / chroma
      break
    case b:
      h = 240 + (60 * (r - g)) / chroma
      break
  }

  const hsl = { h, s, l: (l / 255) * 100 }
  const hslRounded = applyFnToEachObjValue(hsl, (c: number) => round(c)) as HSL

  return hslRounded
}

/**
 * Convert an rgba color to a rgb color removing the alpha value.
 * @param rgba color to convert to RGB
 * @returns RGB color
 */
export function rgba2rgb(rgba: RGBA): RGB {
  if (!isRgba(rgba)) {
    throw new Error(`${rgba} is not a rgba color.`)
  }
  return { r: rgba.r, g: rgba.g, b: rgba.b }
}

/**
 * Convert an rgb color to a rgba color adding 1 as alpha.
 * @param rgb color to convert to RGBA
 * @returns RGBA color
 */
export function rgb2rgba(rgb: RGB): RGBA {
  if (!isRgb(rgb)) {
    throw new Error(`${rgb} is not a rgb color.`)
  }
  return { r: rgb.r, g: rgb.g, b: rgb.b, a: 1 }
}

/**
 * Convert a generic color to rgb.
 * @param color color to convert to RGB
 * @returns RGB color
 */
export function color2rgb(color: Color): RGB {
  if (isHex(color)) {
    return rgba2rgb(hex2rgba(color))
  } else if (isRgb(color)) {
    return color
  } else if (isRgba(color)) {
    return rgba2rgb(color)
  } else if (isCmyk(color)) {
    return cmyk2rgb(color)
  } else {
    // hsl
    return hsl2rgb(color)
  }
}

/**
 * Covert a string in these two formats to a rgb object:
 *  - 255, 0, 255 (short format) -> {r: 255, g: 0, b: 255}
 *  - rgb(255, 0, 255) (long format) -> {r: 255, g: 0, b: 255}.
 * @param rgbString rgb string color to convert to RGB
 * @returns RGB color
 */
export function rgbString2Object(rgbString: string): RGB {
  const errorMessage = `${rgbString} is not a valid format. The accepted formats are 'r, g, b' and 'rgb(r, g, b)' with r, g, b in [0, 255].`

  // check short and long formats
  const regexShortFormat = /^(([0-9]+)(\s)*,(\s)*([0-9]+)(\s)*,(\s)*([0-9]+))/gi
  const regexLongFormat = /^((rgb(\s)*\()(\s)*([0-9]+)(\s)*,(\s)*([0-9]+)(\s)*,(\s)*([0-9]+)(\s)*(\)))/gi
  const isShortFormat = regexShortFormat.test(rgbString)
  const isLongFormat = regexLongFormat.test(rgbString)

  if (!isShortFormat && !isLongFormat) {
    throw new Error(errorMessage)
  }

  const rgbStringCleanShortFormat = isShortFormat ? rgbString : fromLongToShortRgbFormat(rgbString)
  return shortRgbFormatToRgbObject(rgbStringCleanShortFormat)
}

/**
 * Convert a string in format '255, 0, 255' (short format) to a RGB object {r: 255, g: 0, b: 255}.
 * @param rgbString rgb string color to convert to RGB
 * @returns RGB color
 */
function shortRgbFormatToRgbObject(rgbString: string): RGB {
  // split by comma, remove white spaces, convert to number
  const values = rgbString.split(',').map((v) => Number(v.trim()))
  return { r: values[0], g: values[1], b: values[2] }
}

/**
 * Convert 'rgb(N, N, N)' to 'N, N, N'
 * @param rgbStringLongFormat long format
 * @returns short format
 */
function fromLongToShortRgbFormat(rgbStringLongFormat: string): string {
  const rgbStringShortFormat = rgbStringLongFormat
    .replace('rgb', '')
    .replace('(', '')
    .replace(')', '')
  return rgbStringShortFormat
}

/**
 * Covert a string in these two formats to a rgba object:
 *  - 255, 0, 255, 0.5 (short format) -> {r: 255, g: 0, b: 255, a: 0.5}
 *  - rgba(255, 0, 255, 0.5) (long format) -> {r: 255, g: 0, b: 255, a: 0.5}.
 * @param rgbaString rgba string
 * @returns RGBA object
 */
// TODO: change regex to accept also a = .4
export function rgbaString2Object(rgbaString: string): RGBA {
  // check short and long formats
  const regexShortFormat = /^(([0-9]+)(\s)*,(\s)*([0-9]+)(\s)*,(\s)*([0-9]+)(\s)*,(\s)*((0(\.\d+)?|1(\.0+)?)))/gi
  const regexLongFormat = /^((rgba(\s)*\()(\s)*([0-9]+)(\s)*,(\s)*([0-9]+)(\s)*,(\s)*([0-9]+)(\s)*, (\s)*((0(\.\d+)?|1(\.0+)?))(\s)*(\)))/gi
  const isShortFormat = regexShortFormat.test(rgbaString)
  const isLongFormat = regexLongFormat.test(rgbaString)

  if (!isShortFormat && !isLongFormat) {
    throw new Error(
      `${rgbaString} is not a valid format. The accepted formats are 'r, g, b, a' and 'rgba(r, g, b, a)' with r, g, b in [0, 255] and a in [0, 1].`
    )
  }

  const rgbaStringCleanShortFormat = isShortFormat
    ? rgbaString
    : fromLongToShortRgbaFormat(rgbaString)
  return shortRgbaFormatToRgbObject(rgbaStringCleanShortFormat)
}

/**
 * Convert a string in format '255, 0, 255, 0.5' (short format) to a RGB object {r: 255, g: 0, b: 255, a: 0.5}.
 * @param rgbaString rgba string
 * @returns RGBA object
 */
function shortRgbaFormatToRgbObject(rgbaString: string): RGBA {
  // split by comma, remove white spaces, convert to number
  const values = rgbaString.split(',').map((v) => Number(v.trim()))
  return { r: values[0], g: values[1], b: values[2], a: values[3] }
}

/**
 * Convert 'rgba(N, N, N, N)' to 'N, N, N, N'
 * @param rgbaStringLongFormat long format
 * @returns short format
 */
function fromLongToShortRgbaFormat(rgbaStringLongFormat: string): string {
  const rgbaStringShortFormat = rgbaStringLongFormat
    .replace('rgba', '')
    .replace('(', '')
    .replace(')', '')
  return rgbaStringShortFormat
}

// TODO: sometimes use 2, sometimes to
// TODO: check funstions, check doc

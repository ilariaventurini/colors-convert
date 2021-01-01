import { round } from 'lodash'
import { RGB, RGBA, CMYK, HEX, HSL, Color, HSLA } from '../types/types'
import { isRgb, isRgba, isHex, isCmyk, isHsl, isColor } from '../types/isType'
import { applyFnToEachObjValue } from '../../utils/utils'
import { hexToRgba } from './hex'
import { cmyk2rgb } from './cmyk'
import { hsl2rgb } from './hsl'
import { number0255ToHex } from '../../utils/hex-utils'
import { rgba2rgb } from './rgba'
import { hslaToRgb } from './hsla'
import { fromLongToShortRgbFormat, shortRgbFormatToRgbObject } from '../../utils/rgb-utils'
import { RGB_REGEX } from '../../constants/regex'
import { between } from '../../utils/math-utils'
import {
  notValidAlphaValueMessage,
  notValidColorMessage,
  notValidRgbMessage,
  notValidRgbStringMessage,
} from '../../utils/logs-utils'

/**
 * Convert an rgb object to hex.
 * @param rgb color object to convert to hex
 * @returns hex color
 */
export function rgb2hex(rgb: RGB): HEX {
  if (!isRgb(rgb)) throw new Error(notValidRgbMessage('rgb2hex', rgb))

  const hex = Object.values(rgb)
    .map((n) => number0255ToHex(n))
    .join('')
  return `#${hex}`
}

/**
 * Convert a rgb object to a cmyk object.
 * @param rgb color object to convert to cmyk
 * @returns cmyk color
 */
export function rgb2cmyk(rgb: RGB): CMYK {
  if (!isRgb(rgb)) throw new Error(notValidRgbMessage('rgb2cmyk', rgb))

  const { r, g, b } = rgb
  // normalize r,g,b values (from 0-255 to 0-1)
  const r01 = r / 255
  const g01 = g / 255
  const b01 = b / 255

  if (r01 === 0 && g01 === 0 && b01 === 0) return { c: 0, m: 0, y: 0, k: 100 }

  const k = 1 - Math.max(r01, g01, b01)
  const c = (1 - r01 - k) / (1 - k)
  const m = (1 - g01 - k) / (1 - k)
  const y = (1 - b01 - k) / (1 - k)

  const roundedCmyk = applyFnToEachObjValue({ c, m, y, k }, (c: number) => round(c * 100)) as CMYK
  return roundedCmyk
}

/**
 * Convert a rgb object to hsl object.
 * @param rgb color to convert to HSL
 * @returns hsl color object
 */
export function rgb2hsl(rgb: RGB): HSL {
  if (!isRgb(rgb)) throw new Error(notValidRgbMessage('rgb2hsl', rgb))

  const { r, g, b } = rgb
  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  const l = (max + min) / 2

  // achromatic
  if (max === min) return { h: 0, s: 0, l: (l / 255) * 100 }

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
 * Convert an rgb color to a rgba color.
 * @param rgb color to convert to rgba
 * @param alpha opacity value in range [0, 1]
 * @returns rgba color object
 */
export function rgb2rgba(rgb: RGB, alpha = 1): RGBA {
  if (!isRgb(rgb)) throw new Error(notValidRgbMessage('rgb2rgba', rgb))
  if (!between(alpha, [0, 1])) throw new Error(notValidAlphaValueMessage('rgb2rgba', alpha))

  return { r: rgb.r, g: rgb.g, b: rgb.b, a: alpha }
}

/**
 * Convert a rgb color object to a hsla object.
 * @param rgb color object to convert to hsla
 * @param alpha opacity value in range [0, 1]
 * @returns hsla color object
 */
export function rgbToHsla(rgb: RGB, alpha = 1): HSLA {
  if (!isRgb(rgb)) throw new Error(notValidRgbMessage('rgbToHsla', rgb))
  if (!between(alpha, [0, 1])) throw new Error(notValidAlphaValueMessage('rgb2rgba', alpha))

  const hsl = rgb2hsl(rgb)
  return { ...hsl, a: alpha }
}

/**
 * Convert a generic color to rgb.
 * @param color color to convert to rgb
 * @returns rgb color object
 */
export function color2rgb(color: Color): RGB {
  if (!isColor(color)) throw new Error(notValidColorMessage('color2rgb', color))

  if (isHex(color)) return rgba2rgb(hexToRgba(color))
  else if (isRgb(color)) return color
  else if (isRgba(color)) return rgba2rgb(color)
  else if (isCmyk(color)) return cmyk2rgb(color)
  else if (isHsl(color)) return hsl2rgb(color)
  else return hslaToRgb(color) // hsla
}

/**
 * Convert a string in these two formats to a rgb object:
 *  - 255, 0, 255 (short format) -> {r: 255, g: 0, b: 255}
 *  - rgb(255, 0, 255) (long format) -> {r: 255, g: 0, b: 255}.
 * @param rgbString rgb string color to convert to rgb
 * @returns rgb color object
 */
export function rgbString2Object(rgbString: string): RGB {
  // check short and long formats
  const isShortFormat = RGB_REGEX.short.test(rgbString)
  const isLongFormat = RGB_REGEX.long.test(rgbString)

  if (!isShortFormat && !isLongFormat)
    throw new Error(notValidRgbStringMessage('rgbString2Object', rgbString))

  // convert rgbString to short format: 'R, G, B'
  const rgbStringCleanShortFormat = isShortFormat ? rgbString : fromLongToShortRgbFormat(rgbString)
  return shortRgbFormatToRgbObject(rgbStringCleanShortFormat)
}

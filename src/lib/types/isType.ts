import { between } from '../../utils/math-utils'
import { sameContent } from '../../utils/utils'
import { HEX, RGB, RGBA, CMYK, HSL, HSLA, Color } from './types'
import {
  CMYK_REGEX,
  HEX_REGEX,
  HSLA_REGEX,
  HSL_REGEX,
  RGBA_REGEX,
  RGB_REGEX,
} from '../../constants/regex'
import { notValidRgbStringMessage } from '../../utils/logs-utils'

/**
 * Accept:
 *  - #rrggbb[aa] (6/8-digit, long form)
 *  - #rgb[a] (3/4-digit, short form)
 * with r, g, b, a in [0-9a-fA-F].
 * @param color color to check if it is in the right hex format
 * @returns true if color is in the right hex format, false otherwise
 */
export function isHex(color: any): color is HEX {
  return HEX_REGEX.color.test(color)
}

/**
 * Accept an object like this {r, g, b} with r, b, g numeric values in [0, 255].
 * @param color color to check if it is in the right rgb format
 * @returns true if color is in the right rgb format, false otherwise
 */
// TODO: support values in [0, 1]
// TODO: support values in [0%, 100%]
export function isRgb(color: any): color is RGB {
  const keys = Object.keys(color)
  if (keys.length !== 3) return false
  if (!sameContent(keys, ['r', 'g', 'b'])) return false
  const isValid = (value: any) => typeof value === 'number' && between(value, [0, 255])
  const r = isValid(color.r)
  const g = isValid(color.g)
  const b = isValid(color.b)
  return r && g && b
}

/**
 * Check if a string is in these two formats:
 *  - 255, 0, 255 (short format)
 *  - rgb(255, 0, 255) (long format).
 * @param rgbString rgb string color to check to be a valid rgb string
 * @returns true if rgbString is a valid format, false otherwise
 */
export function isRgbString(rgbString: string): rgbString is string {
  // check short and long formats
  const isShortFormat = RGB_REGEX.short.test(rgbString)
  const isLongFormat = RGB_REGEX.long.test(rgbString)

  if (!isShortFormat && !isLongFormat) return false
  else return true
}

/**
 * Accept an object like this {r, g, b, a} with r, g, b numeric values in [0, 255] and a in [0, 1].
 * @param color color to check if it is in the right rgba format
 * @returns true if color is in the right rgba format, false otherwise
 */
// TODO: support values r,g,b in [0, 1]
// TODO: support values r,g,b,a in [0%, 100%]
export function isRgba(color: any): color is RGBA {
  const keys = Object.keys(color)
  if (keys.length !== 4) return false
  if (!sameContent(keys, ['r', 'g', 'b', 'a'])) return false
  const { r, g, b } = color
  const isValidRgb = isRgb({ r, g, b })
  const a = typeof color.a === 'number' && between(color.a, [0, 1])
  return isValidRgb && a
}

/**
 * Check if a string is in these two formats:
 *  - 255, 0, 255 (short format)
 *  - rgba(255, 0, 255) (long format).
 * @param rgbaString rgba string color to check to be a valid rgba string
 * @returns true if rgbaString is a valid format, false otherwise
 */
export function isRgbaString(rgbaString: string): rgbaString is string {
  // check short and long formats
  const isShortFormat = RGBA_REGEX.short.test(rgbaString)
  const isLongFormat = RGBA_REGEX.long.test(rgbaString)

  if (!isShortFormat && !isLongFormat) return false
  else return true
}

/**
 * Accept an object like this {c, m, y, k} with c, m, y, k numeric values in [0, 100].
 * @param color color to check if it is in the right cmyk format
 * @returns true if color is in the right cmyk format, false otherwise
 */
// TODO: support values in [0, 1]
export function isCmyk(color: any): color is CMYK {
  const keys = Object.keys(color)
  if (keys.length !== 4) return false
  if (!sameContent(keys, ['c', 'm', 'y', 'k'])) return false
  const isValid = (value: any) => typeof value === 'number' && between(value, [0, 100])
  const c = isValid(color.c)
  const m = isValid(color.m)
  const y = isValid(color.y)
  const k = isValid(color.k)
  return c && m && y && k
}

/**
 * Check if a string is in these two formats:
 *  - 0, 50, 20, 100 (short format)
 *  - cmyk(0, 50, 20, 100) (long format).
 * @param cmykString cmyk string color to check to be a valid cmyk string
 * @returns true if cmykString is a valid format, false otherwise
 */
export function isCmykString(cmykString: string): cmykString is string {
  // check short and long formats
  const isShortFormat = CMYK_REGEX.short.test(cmykString)
  const isLongFormat = CMYK_REGEX.long.test(cmykString)

  if (!isShortFormat && !isLongFormat) return false
  else return true
}

/**
 * Accept hsl colors with:
 *  - h (hue): [0-359]°
 *  - s (saturation): [0-100]%
 *  - l (lightness): [0-100]%.
 * @param color color to check if it is in the right hsl format
 * @returns true if color is in the right hsl format, false otherwise
 */
export function isHsl(color: any): color is HSL {
  const keys = Object.keys(color)
  if (keys.length !== 3) return false
  if (!sameContent(keys, ['h', 's', 'l'])) return false
  const isValid = (value: any, range: [number, number]) =>
    typeof value === 'number' && between(value, range)
  const h = isValid(color.h, [0, 359])
  const s = isValid(color.s, [0, 100])
  const l = isValid(color.l, [0, 100])
  return h && s && l
}

/**
 * Check if a string is in these two formats:
 *  - 322, 79%, 52% (short format)
 *  - hsl(322, 79%, 52%) (long format).
 * @param hslString hsl string color to check to be a valid hsl string
 * @returns true if hslString is a valid format, false otherwise
 */
export function isHslString(hslString: string): hslString is string {
  // check short and long formats
  const isShortFormat = HSL_REGEX.short.test(hslString)
  const isLongFormat = HSL_REGEX.long.test(hslString)

  if (!isShortFormat && !isLongFormat) return false
  else return true
}

/**
 * Accept hsla colors with:
 *  - h (hue): [0-359]°
 *  - s (saturation): [0-100]%
 *  - l (lightness): [0-100]%.
 *  - a (alpha): [0-1].
 * @param color color to check if it is in the right hsla format
 * @returns true if color is in the right hsla format, false otherwise
 */
export function isHsla(color: any): color is HSLA {
  const keys = Object.keys(color)
  if (keys.length !== 4) return false
  if (!sameContent(keys, ['h', 's', 'l', 'a'])) return false
  const { h, s, l } = color
  const isValidHsl = isHsl({ h, s, l })
  const a = typeof color.a === 'number' && between(color.a, [0, 1])
  return isValidHsl && a
}

/**
 * Check if a string is in these two formats:
 *  - 322, 79%, 52%, 0.5 (short format)
 *  - hsla(322, 79%, 52%, 0.5) (long format).
 * @param hslaString hsl string color to check to be a valid hsla string
 * @returns true if hslaString is a valid format, false otherwise
 */
export function isHslaString(hslaString: string): hslaString is string {
  // check short and long formats
  const isShortFormat = HSLA_REGEX.short.test(hslaString)
  const isLongFormat = HSLA_REGEX.long.test(hslaString)

  if (!isShortFormat && !isLongFormat) return false
  else return true
}

/**
 * Return true if color is hex, rgb, rgba, cmyk, hls or hsla, false otherwise
 * @param color color to check if it is in the right Color format
 * @returns true if color is in the right Color format, false otherwise
 */
export function isColor(color: any): color is Color {
  return (
    isHex(color) || isRgb(color) || isRgba(color) || isCmyk(color) || isHsl(color) || isHsla(color)
  )
}

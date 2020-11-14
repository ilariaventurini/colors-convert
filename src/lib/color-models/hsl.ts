import { HSL, RGB, CMYK, HEX, RGBA, HSLA, Color } from '../types/types'
import { isCmyk, isColor, isHex, isHsl, isRgb, isRgba } from '../types/isType'
import { applyFnToEachObjValue } from '../misc/utils'
import { round } from 'lodash'
import { rgb2hex, rgb2cmyk, rgb2hsl } from './rgb'
import { between } from '../../utils/math-utils'
import { fromLongToShortFormat, shortHslFormatToHslObject } from '../../utils/hsl-utils'
import { HSL_REGEX } from '../../constants/regex'
import { hex2hsl } from './hex'
import { rgbaToHsl } from './rgba'
import { cmyk2hsl } from './cmyk'
import { hslaToHsl } from './hsla'
import {
  notValidAlphaValueMessage,
  notValidColorMessage,
  notValidHslMessage,
  notValidHslStringMessage,
} from '../../utils/logs-utils'

/**
 * Convert a hsl object to hex.
 * @param hsl color to convert to hex
 * @returns hex color
 */
export function hsl2hex(hsl: HSL): HEX {
  if (!isHsl(hsl)) throw new Error(notValidHslMessage('hsl2hex', hsl))

  const rgb = hsl2rgb(hsl)
  return rgb2hex(rgb)
}

/**
 * Convert a hsl object to rgb color object.
 * @param hsl color to convert to rgb color object
 * @returns rgb color object
 */
export function hsl2rgb(hsl: HSL): RGB {
  if (!isHsl(hsl)) throw new Error(notValidHslMessage('hsl2rgb', hsl))

  const { h, s, l } = hsl
  // normalize values
  const s01 = s / 100
  const l01 = l / 100

  if (s01 === 0) {
    const l = l01 * 255
    return { r: l, g: l, b: l }
  }

  const angle = (h / 60) % 6
  const angleRangeIndex = Math.floor(angle)
  const f = angle - angleRangeIndex
  const chroma = s01 * (1 - Math.abs(2 * l01 - 1))
  const p = l01 + chroma / 2
  const q = l01 - chroma / 2
  const t = p - chroma * f
  const w = q + chroma * f

  let rgb01 = { r: 0, g: 0, b: 0 }
  if (angleRangeIndex === 0) {
    rgb01 = { r: p, g: w, b: q }
  } else if (angleRangeIndex === 1) {
    rgb01 = { r: t, g: p, b: q }
  } else if (angleRangeIndex === 2) {
    rgb01 = { r: q, g: p, b: w }
  } else if (angleRangeIndex === 3) {
    rgb01 = { r: q, g: t, b: p }
  } else if (angleRangeIndex === 4) {
    rgb01 = { r: w, g: q, b: p }
  } else {
    // angleRangeIndex === 5
    rgb01 = { r: p, g: q, b: t }
  }

  const rgb = applyFnToEachObjValue(rgb01, (c: number) => round(c * 255)) as RGB
  return rgb
}

/**
 * Convert a hsl object to rgba.
 * @param hsl color to convert to rgba
 * @param alpha opacity value in [0, 1]
 * @returns rgba object
 */
export function hslToRgba(hsl: HSL, alpha = 1): RGBA {
  if (!isHsl(hsl)) throw new Error(notValidHslMessage('hslToRgba', hsl))
  if (!between(alpha, [0, 1])) throw new Error(notValidAlphaValueMessage('hslToRgba', alpha))

  const rgb = hsl2rgb(hsl)
  return { ...rgb, a: alpha }
}

/**
 * Convert a hsl object to cmyk.
 * @param hsl color to convert to cmyk
 * @returns cmyk object
 */
export function hsl2cmyk(hsl: HSL): CMYK {
  if (!isHsl(hsl)) throw new Error(notValidHslMessage('hsl2cmyk', hsl))

  const rgb = hsl2rgb(hsl)
  const cmyk = rgb2cmyk(rgb)
  return cmyk
}

/**
 * Convert a hsl object to hsla.
 * @param hsl color to convert to hsla
 * @param alpha opacity value in range [0, 1]
 * @returns hsla object
 */
export function hslToHsla(hsl: HSL, alpha = 1): HSLA {
  if (!isHsl(hsl)) throw new Error(notValidHslMessage('hslToHsla', hsl))
  if (!between(alpha, [0, 1])) throw new Error(notValidAlphaValueMessage('hslToHsla', alpha))

  return { ...hsl, a: alpha }
}

/**
 * Convert a generic color to hsl.
 * @param color color to convert to hsl
 * @returns hsl color object
 */
export function colorToHsl(color: Color): HSL {
  if (!isColor(color)) throw new Error(notValidColorMessage('colorToHsl', color))

  if (isHex(color)) return hex2hsl(color)
  else if (isRgb(color)) return rgb2hsl(color)
  else if (isRgba(color)) return rgbaToHsl(color)
  else if (isCmyk(color)) return cmyk2hsl(color)
  else if (isHsl(color)) return color
  else return hslaToHsl(color) // hsla
}

/**
 * Covert a string in these two formats to a hsl object:
 *  - 322, 79%, 52% (short format) -> { h: 322, s: 79, l: 52 }
 *  - hsl(322, 79%, 52%) (long format) -> { h: 322, s: 79, l: 52 }.
 * @param hsl string to convert to hsl object
 * @returns hsl object
 */
export function hslString2Object(hslString: string): HSL {
  const isShortFormat = HSL_REGEX.short.test(hslString)
  const isLongFormat = HSL_REGEX.long.test(hslString)

  if (!isShortFormat && !isLongFormat)
    throw new Error(notValidHslStringMessage('hslString2Object', hslString))

  const hslStringCleanShortFormat = isShortFormat ? hslString : fromLongToShortFormat(hslString)
  return shortHslFormatToHslObject(hslStringCleanShortFormat)
}

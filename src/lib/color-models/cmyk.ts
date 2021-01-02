import { CMYK, HEX, RGB, HSL, RGBA, HSLA, Color } from '../types/types'
import { applyFnToEachObjValue } from '../../utils/utils'
import { round } from 'lodash'
import { isCmyk, isColor, isHex, isHsl, isRgb, isRgba } from '../types/isType'
import { rgbToCmyk, rgbToHex, rgb2hsl } from './rgb'
import { between } from '../../utils/math-utils'
import { CMYK_REGEX } from '../../constants/regex'
import { fromLongToShortCmykFormat, shortCmykFormatToCmykObject } from '../../utils/cmyk-utils'
import { hexToCmyk } from './hex'
import { rgbaToCmyk } from './rgba'
import { hsl2cmyk } from './hsl'
import { hslaToCmyk } from './hsla'
import {
  notValidAlphaValueMessage,
  notValidCmykMessage,
  notValidCmykStringMessage,
  notValidColorMessage,
} from '../../utils/logs-utils'

/**
 * Convert a cmyk color to a hex.
 * @param cmyk color to convert to hex
 * @returns hex color
 */
export function cmyk2hex(cmyk: CMYK): HEX {
  if (!isCmyk(cmyk)) throw new Error(notValidCmykMessage('cmyk2hex', cmyk))

  const rgb = cmyk2rgb(cmyk)
  return rgbToHex(rgb)
}

/**
 * Convert a cmyk color to a rgb.
 * @param cmyk color to convert to rgb
 * @returns rgb object
 */
export function cmyk2rgb(cmyk: CMYK): RGB {
  if (!isCmyk(cmyk)) throw new Error(notValidCmykMessage('cmyk2rgb', cmyk))

  const { c, m, y, k } = applyFnToEachObjValue(cmyk, (col: number) => col / 100) as CMYK
  const rgb01 = {
    r: 1 - Math.min(1, c * (1 - k) + k),
    g: 1 - Math.min(1, m * (1 - k) + k),
    b: 1 - Math.min(1, y * (1 - k) + k),
  }
  return applyFnToEachObjValue(rgb01, (col: number) => round(col * 255)) as RGB
}

/**
 * Convert a cmyk color to a rgba.
 * @param cmyk color to convert to rgba
 * @param alpha opacity value in range [0, 1]
 * @returns rgba object
 */
export function cmykToRgba(cmyk: CMYK, alpha = 1): RGBA {
  if (!isCmyk(cmyk)) throw new Error(notValidCmykMessage('cmykToRgba', cmyk))
  if (!between(alpha, [0, 1])) throw new Error(notValidAlphaValueMessage('cmykToRgba', alpha))

  const rgb = cmyk2rgb(cmyk)
  return { ...rgb, a: alpha }
}

/**
 * Convert a cmyk color to a hsl.
 * @param cmyk color to convert to hsl
 * @returns hsl object
 */
export function cmyk2hsl(cmyk: CMYK): HSL {
  if (!isCmyk(cmyk)) throw new Error(notValidCmykMessage('cmyk2hsl', cmyk))

  const rgb = cmyk2rgb(cmyk)
  return rgb2hsl(rgb)
}

/**
 * Convert a cmyk color to a hsla.
 * @param cmyk color to convert to hsla
 * @param alpha opacity value in range [0, 1]
 * @returns hsla object
 */
export function cmykToHsla(cmyk: CMYK, alpha = 1): HSLA {
  if (!isCmyk(cmyk)) throw new Error(notValidCmykMessage('cmykToHsla', cmyk))
  if (!between(alpha, [0, 1])) throw new Error(notValidAlphaValueMessage('cmykToHsla', alpha))

  const rgb = cmyk2rgb(cmyk)
  const hsl = rgb2hsl(rgb)
  return { ...hsl, a: alpha }
}

/**
 * Convert a generic color to cmyk.
 * @param color color to convert to cmyk
 * @returns cmyk color object
 */
export function colorToCmyk(color: Color): CMYK {
  if (!isColor(color)) throw new Error(notValidColorMessage('colorToCmyk', color))

  if (isHex(color)) return hexToCmyk(color)
  else if (isRgb(color)) return rgbToCmyk(color)
  else if (isRgba(color)) return rgbaToCmyk(color)
  else if (isCmyk(color)) return color
  else if (isHsl(color)) return hsl2cmyk(color)
  else return hslaToCmyk(color) // hsla
}

/**
 * Covert a string in these two formats to a cmyk object:
 *  - 0, 50, 20, 100 (short format) -> {c: 0, m: 50, y: 20, k: 100}
 *  - cmyk(0, 50, 20, 100) (long format) -> {c: 0, m: 50, y: 20, k: 100}.
 * @param cmykString string to convert to cmyk
 * @returns cmyk object
 */
export function cmykString2Object(cmykString: string): CMYK {
  const isShortFormat = CMYK_REGEX.short.test(cmykString)
  const isLongFormat = CMYK_REGEX.long.test(cmykString)

  if (!isShortFormat && !isLongFormat)
    throw new Error(notValidCmykStringMessage('cmykString2Object', cmykString))

  const cmykStringCleanShortFormat = isShortFormat
    ? cmykString
    : fromLongToShortCmykFormat(cmykString)
  return shortCmykFormatToCmykObject(cmykStringCleanShortFormat)
}

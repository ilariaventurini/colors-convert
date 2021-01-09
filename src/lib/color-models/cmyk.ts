import { CMYK, HEX, RGB, HSL, RGBA, HSLA, Color } from '../types/types'
import { applyFnToEachObjValue } from '../../utils/utils'
import { round } from 'lodash'
import { isCmyk, isColor, isHex, isHsl, isRgb, isRgba } from '../types/isType'
import { rgbToCmyk, rgbToHex, rgbToHsl } from './rgb'
import { between } from '../../utils/math-utils'
import { CMYK_REGEX } from '../../constants/regex'
import { fromLongToShortCmykFormat, shortCmykFormatToCmykObject } from '../../utils/cmyk-utils'
import { hexToCmyk } from './hex'
import { rgbaToCmyk } from './rgba'
import { hslToCmyk } from './hsl'
import { hslaToCmyk } from './hsla'
import {
  notValidAlphaValueMessage,
  notValidCmykMessage,
  notValidCmykStringMessage,
  notValidColorMessage,
} from '../../utils/logs-utils'
import { obsolete } from '../../utils/obsolete'
import { DELETE_VERSION_2, DEPRECATE_VERSION_2 } from '../../constants/constants'

/**
 * Convert a cmyk color to a hex.
 * @param cmyk color to convert to hex
 * @returns hex color
 */
export function cmykToHex(cmyk: CMYK): HEX {
  if (!isCmyk(cmyk)) throw new Error(notValidCmykMessage('cmykToHex', cmyk))

  const rgb = cmykToRgb(cmyk)
  return rgbToHex(rgb)
}
/**
 * Convert a cmyk color to a hex.
 * @param cmyk color to convert to hex
 * @returns hex color
 * @deprecated since version 1.3.0, use `cmykToHex` instead
 */
export function cmyk2hex(cmyk: CMYK): HEX {
  return obsolete(
    cmykToHex,
    'cmyk2hex',
    'cmykToHex',
    DEPRECATE_VERSION_2,
    DELETE_VERSION_2,
    arguments
  )
}

/**
 * Convert a cmyk color to a rgb.
 * @param cmyk color to convert to rgb
 * @returns rgb object
 */
export function cmykToRgb(cmyk: CMYK): RGB {
  if (!isCmyk(cmyk)) throw new Error(notValidCmykMessage('cmykToRgb', cmyk))

  const { c, m, y, k } = applyFnToEachObjValue(cmyk, (col: number) => col / 100) as CMYK
  const rgb01 = {
    r: 1 - Math.min(1, c * (1 - k) + k),
    g: 1 - Math.min(1, m * (1 - k) + k),
    b: 1 - Math.min(1, y * (1 - k) + k),
  }
  return applyFnToEachObjValue(rgb01, (col: number) => round(col * 255)) as RGB
}
/**
 * Convert a cmyk color to a rgb.
 * @param cmyk color to convert to rgb
 * @returns rgb object
 * @deprecated since version 1.3.0, use `cmykToRgb` instead
 */
export function cmyk2rgb(cmyk: CMYK): RGB {
  return obsolete(
    cmykToRgb,
    'cmyk2rgb',
    'cmykToRgb',
    DEPRECATE_VERSION_2,
    DELETE_VERSION_2,
    arguments
  )
}

/**
 * Convert a cmyk color to a rgba.
 * @param cmyk color to convert to rgba
 * @param alpha opacity value in range [0, 1]
 * @returns rgba object
 */
export function cmykToRgba(cmyk: CMYK, alpha: number = 1): RGBA {
  if (!isCmyk(cmyk)) throw new Error(notValidCmykMessage('cmykToRgba', cmyk))
  if (!between(alpha, [0, 1])) throw new Error(notValidAlphaValueMessage('cmykToRgba', alpha))

  const rgb = cmykToRgb(cmyk)
  return { ...rgb, a: alpha }
}

/**
 * Convert a cmyk color to a hsl.
 * @param cmyk color to convert to hsl
 * @returns hsl object
 */
export function cmykToHsl(cmyk: CMYK): HSL {
  if (!isCmyk(cmyk)) throw new Error(notValidCmykMessage('cmykToHsl', cmyk))

  const rgb = cmykToRgb(cmyk)
  return rgbToHsl(rgb)
}
/**
 * Convert a cmyk color to a hsl.
 * @param cmyk color to convert to hsl
 * @returns hsl object
 * @deprecated since version 1.3.0, use `cmykToHsl` instead
 */
export function cmyk2hsl(cmyk: CMYK): HSL {
  return obsolete(
    cmykToHsl,
    'cmyk2hsl',
    'cmykToHsl',
    DEPRECATE_VERSION_2,
    DELETE_VERSION_2,
    arguments
  )
}

/**
 * Convert a cmyk color to a hsla.
 * @param cmyk color to convert to hsla
 * @param alpha opacity value in range [0, 1]
 * @returns hsla object
 */
export function cmykToHsla(cmyk: CMYK, alpha: number = 1): HSLA {
  if (!isCmyk(cmyk)) throw new Error(notValidCmykMessage('cmykToHsla', cmyk))
  if (!between(alpha, [0, 1])) throw new Error(notValidAlphaValueMessage('cmykToHsla', alpha))

  const rgb = cmykToRgb(cmyk)
  const hsl = rgbToHsl(rgb)
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
  else if (isHsl(color)) return hslToCmyk(color)
  else return hslaToCmyk(color) // hsla
}

/**
 * Covert a string in these two formats to a cmyk object:
 *  - 0, 50, 20, 100 (short format) -> {c: 0, m: 50, y: 20, k: 100}
 *  - cmyk(0, 50, 20, 100) (long format) -> {c: 0, m: 50, y: 20, k: 100}.
 * @param cmykString string to convert to cmyk
 * @returns cmyk object
 */
export function cmykStringToObject(cmykString: string): CMYK {
  const isShortFormat = CMYK_REGEX.short.test(cmykString)
  const isLongFormat = CMYK_REGEX.long.test(cmykString)

  if (!isShortFormat && !isLongFormat)
    throw new Error(notValidCmykStringMessage('cmykStringToObject', cmykString))

  const cmykStringCleanShortFormat = isShortFormat
    ? cmykString
    : fromLongToShortCmykFormat(cmykString)
  return shortCmykFormatToCmykObject(cmykStringCleanShortFormat)
}
/**
 * Covert a string in these two formats to a cmyk object:
 *  - 0, 50, 20, 100 (short format) -> {c: 0, m: 50, y: 20, k: 100}
 *  - cmyk(0, 50, 20, 100) (long format) -> {c: 0, m: 50, y: 20, k: 100}.
 * @param cmykString string to convert to cmyk
 * @returns cmyk object
 * @deprecated since version 1.3.0, use `cmykStringToObject` instead
 */
export function cmykString2Object(cmykString: string): CMYK {
  return obsolete(
    cmykStringToObject,
    'cmykString2Object',
    'cmykStringToObject',
    DEPRECATE_VERSION_2,
    DELETE_VERSION_2,
    arguments
  )
}

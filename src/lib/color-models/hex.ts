import { HEX, RGB, RGBA, CMYK, HSL, HSLA, Color } from '../types/types'
import { isCmyk, isColor, isHex, isHsl, isRgb, isRgba } from '../types/isType'
import { between } from '../../utils/math-utils'
import { chunkString } from '../../utils/string-utils'
import {
  notValidAlphaValueMessage,
  notValidColorMessage,
  notValidHexMessage,
} from '../../utils/logs-utils'
import { hexAlphaTo0255, hexToAlpha, alphaToHex } from '../../utils/hex-utils'
import { obsolete } from '../../utils/obsolete'
import { HEX_REGEX } from '../../constants/regex'
import { rgb2cmyk, rgb2hex, rgb2hsl } from './rgb'
import { rgbaToHex, rgbaToHsla } from './rgba'
import { ALPHA_PRECISION } from '../../constants/rgba'
import { cmyk2hex } from './cmyk'
import { hsl2hex } from './hsl'
import { hslaToHex } from './hsla'
import { DELETE_VERSION_2, DEPRECATE_VERSION_2 } from '../../constants/constants'

/**
 * Convert a hex to a rgb or rgba color (depends on hex format).
 * @param hex color to convert to rgb or rgba
 * @returns rgb or rgba object
 */
export function hexToRgbOrRgba(hex: HEX) {
  if (!isHex(hex)) throw new Error(notValidHexMessage('hexToRgbOrRgba', hex))
  const hexLongWtihoutHashtag = shortToLongHex(hex).substring(1)
  const [r, g, b, a] = chunkString(hexLongWtihoutHashtag, 2)
  // convert each color component to number
  const r0255 = hexAlphaTo0255(r)
  const g0255 = hexAlphaTo0255(g)
  const b0255 = hexAlphaTo0255(b)
  const rgb = { r: r0255, g: g0255, b: b0255 }
  if (a) return { ...rgb, a: hexToAlpha(a, ALPHA_PRECISION) }
  return rgb
}
/**
 * Convert a hex to a rgb or rgba color (depends on hex format).
 * @param hex color to convert to rgb or rgba
 * @returns rgb or rgba object
 * @deprecated since version 1.3.0, use `hexToRgbOrRgba` instead
 */
export function hex2rgbOrRgba(hex: HEX) {
  return obsolete(
    hexToRgbOrRgba,
    'hex2rgbOrRgba',
    'hexToRgbOrRgba',
    DEPRECATE_VERSION_2,
    DELETE_VERSION_2,
    arguments
  )
}

/**
 * Convert a hex to a rgb color, if hex color has opacity, it will be lost.
 * @param hex color to convert to rgb
 * @returns rgb object
 */
export function hexToRgb(hex: HEX): RGB {
  if (!isHex(hex)) throw new Error(notValidHexMessage('hexToRgb', hex))

  const { r, g, b } = hex2rgba(hex)
  return { r, g, b }
}

/**
 * Convert a hex to a rgba object, by default alpha is 1.
 * @param hex color to convert to rgba
 * @param alpha opacity value in range [0, 1]
 * @returns rbga color
 */
export function hexToRgba(hex: HEX, alpha = 1): RGBA {
  if (!isHex(hex)) throw new Error(notValidHexMessage('hex2rgba', hex))
  if (!between(alpha, [0, 1])) throw new Error(notValidAlphaValueMessage('hex2rgba', alpha))

  const rgbOrRgba = hexToRgbOrRgba(hex)
  if (isRgb(rgbOrRgba)) return { ...rgbOrRgba, a: alpha }
  return rgbOrRgba
}
/**
 * Convert a hex to a rgba object, by default alpha is 1.
 * @param hex color to convert to rgba
 * @param alpha opacity value in range [0, 1]
 * @returns rbga color
 * @deprecated since version 1.3.0, use `hex2rgba` instead
 */
export function hex2rgba(hex: HEX, alpha = 1): RGBA {
  return obsolete(
    hexToRgba,
    'hex2rgba',
    'hexToRgba',
    DEPRECATE_VERSION_2,
    DELETE_VERSION_2,
    arguments
  )
}

/**
 * Convert a hex to another hex with the given alpha.
 * @param hex original hex
 * @param alpha opacity value in range [0, 1]
 * @returns hex color with opacity
 */
export function hexToHexWithAlpha(hex: HEX, alpha = 1): HEX {
  if (!isHex(hex)) throw new Error(notValidHexMessage('hexToHexWithAlpha', hex))
  if (!between(alpha, [0, 1]))
    throw new Error(notValidAlphaValueMessage('hexToHexWithAlpha', alpha))

  const longHex = shortToLongHex(hex)
  if (HEX_REGEX.longWithAlpha.test(longHex)) return longHex

  const alphaHex = alphaToHex(alpha)
  return `${longHex}${alphaHex}`
}
/**
 * Convert a hex to another hex with the given alpha.
 * @param hex original hex
 * @param alpha opacity value in range [0, 1]
 * @returns hex color with opacity
 * @deprecated since version 1.3.0, use `hexToHexWithAlpha` instead
 */
export function hex2hexWithAlpha(hex: HEX, alpha = 1): HEX {
  return obsolete(
    hexToHexWithAlpha,
    'hex2hexWithAlpha',
    'hexToHexWithAlpha',
    DEPRECATE_VERSION_2,
    DELETE_VERSION_2,
    arguments
  )
}

/**
 * Convert a hex to a cmyk. It ignores opacity because cmyk doens't support it.
 * @param hex color to convert to cmyk
 * @returns cmyk color object
 */
export function hexToCmyk(hex: HEX): CMYK {
  if (!isHex(hex)) throw new Error(notValidHexMessage('hexToCmyk', hex))

  const rgb = hexToRgb(hex)
  return rgb2cmyk(rgb)
}
/**
 * Convert a hex to a cmyk. It ignores opacity because cmyk doens't support it.
 * @param hex color to convert to cmyk
 * @returns cmyk color object
 * @deprecated since version 1.3.0, use `hexToCmyk` instead
 */
export function hex2cmyk(hex: HEX): CMYK {
  return obsolete(
    hexToCmyk,
    'hex2cmyk',
    'hexToCmyk',
    DEPRECATE_VERSION_2,
    DELETE_VERSION_2,
    arguments
  )
}

/**
 * Convert a hex color string to a hsl object. It ignores opacity.
 * @param hex color to convert to hsl
 * @returns hsl color object
 */
export function hexToHsl(hex: HEX): HSL {
  if (!isHex(hex)) throw new Error(notValidHexMessage('hexToHsl', hex))

  const rgb = hexToRgb(hex)
  return rgb2hsl(rgb)
}
/**
 * Convert a hex color string to a hsl object. It ignores opacity.
 * @param hex color to convert to hsl
 * @returns hsl color object
 * @deprecated since version 1.3.0, use `hexToHsl` instead
 */
export function hex2hsl(hex: HEX): HSL {
  return obsolete(hexToHsl, 'hex2hsl', 'hexToHsl', DEPRECATE_VERSION_2, DELETE_VERSION_2, arguments)
}

/**
 * Convert a hex color string to a hsla object.
 * Hex can have opacity or not, if not you can use the alpha parameter.
 * If hex has opacity and alpha != undefined, then the returned alpha value is the hex related one.
 * @param hex color to convert to hsla
 * @param alpha opacity value in range [0, 1]
 * @returns hsla color object
 */
export function hexToHsla(hex: HEX, alpha = 1): HSLA {
  if (!isHex(hex)) throw new Error(notValidHexMessage('hexToHsla', hex))
  if (!between(alpha, [0, 1])) throw new Error(notValidAlphaValueMessage('hexToHsla', alpha))

  const rgbOrRgba = hexToRgbOrRgba(hex)
  if (isRgb(rgbOrRgba)) return { ...rgb2hsl(rgbOrRgba), a: alpha }
  else return rgbaToHsla(rgbOrRgba)
}

/**
 * Expand the 3-digit hexadecimal form to the 6-digit form doubling each digit.
 * For example #09C becomes #0099CC and #09CA becomes #0099CCAA.
 * If hex is in the long format, return it.
 * @param hex in the short form
 * @returns hex in the long form
 */
export function shortToLongHex(hex: HEX): HEX {
  if (!isHex(hex)) throw new Error(notValidHexMessage('shortToLongHex', hex))
  if (!HEX_REGEX.short.test(hex)) return hex

  const [hashtag, r, g, b, a] = Array.from(hex)
  return a ? `${hashtag}${r}${r}${g}${g}${b}${b}${a}${a}` : `${hashtag}${r}${r}${g}${g}${b}${b}`
}

/**
 * Convert a generic color to hex string.
 * @param color color to convert to hex
 * @returns hex string
 */
export function colorToHex(color: Color): HEX {
  if (!isColor(color)) throw new Error(notValidColorMessage('colorToHex', color))

  if (isHex(color)) return color
  else if (isRgb(color)) return rgb2hex(color)
  else if (isRgba(color)) return rgbaToHex(color)
  else if (isCmyk(color)) return cmyk2hex(color)
  else if (isHsl(color)) return hsl2hex(color)
  else return hslaToHex(color) // hsla
}

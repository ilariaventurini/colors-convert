import { HEX, RGB, RGBA, CMYK, HSL, HSLA, Color } from '../../types/types'
import { isCmyk, isColor, isHex, isHsl, isRgb, isRgba } from '../../types/isType'
import { between } from '../../utils/math-utils'
import { chunkString } from '../../utils/string-utils'
import { rgb2cmyk, rgb2hex, rgb2hsl } from './rgb'
import { HEX_REGEX } from '../../constants/regex'
import { ALPHA_PRECISION } from '../../constants/rgba'
import { hexAlphaTo0255, hexToAlpha, alphaToHex } from '../../utils/hex-utils'
import { rgbaToHex, rgbaToHsla } from './rgba'
import { cmyk2hex } from './cmyk'
import { hsl2hex } from './hsl'
import { hslaToHex } from './hsla'

/**
 * Convert a hex to a rgb or rgba color (depends on hex format).
 * @param hex color to convert to rgb or rgba
 * @returns rgb or rgba object
 */
export function hex2rgbOrRgba(hex: HEX): RGB | RGBA {
  if (!isHex(hex)) throw new Error(`${hex} is not a valid hex color.`)

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
 * Convert a hex to a rgb color, if hex color has opacity, it will be lost.
 * @param hex color to convert to RGB
 * @returns RGB object
 */
export function hex2rgb(hex: HEX): RGB {
  if (!isHex(hex)) throw new Error(`${hex} is not a hex color.`)

  const { r, g, b } = hex2rgba(hex)
  return { r, g, b }
}

/**
 * Convert a hex to a rgba object, by default alpha is 1.
 * @param hex color to convert to rgba
 * @param alpha opacity value in range [0, 1]
 * @returns rbga color
 */
export function hex2rgba(hex: HEX, alpha = 1): RGBA {
  if (!isHex(hex)) throw new Error(`${hex} is not a hex color.`)
  if (!between(alpha, [0, 1])) throw new Error(`${alpha} is not in the range [0, 1].`)

  const rgbOrRgba = hex2rgbOrRgba(hex)
  if (isRgb(rgbOrRgba)) return { ...rgbOrRgba, a: alpha }
  return rgbOrRgba
}

/**
 * Convert a hex to another hex with the given alpha.
 * @param hex original hex
 * @param alpha opacity value in range [0, 1]
 * @returns hex color with opacity
 */
export function hex2hexWithAlpha(hex: HEX, alpha: number): HEX {
  if (!isHex(hex)) throw new Error(`${hex} is not a hex color.`)
  if (!between(alpha, [0, 1])) throw new Error(`${alpha} must be in [0, 1].`)

  const longHex = shortToLongHex(hex)
  if (HEX_REGEX.longWithAlpha.test(longHex)) return longHex

  const alphaHex = alphaToHex(alpha)
  return `${longHex}${alphaHex}`
}

/**
 * Convert a hex to a cmyk. It ignores opacity because cmyk doens't support it.
 * @param hex color to convert to cmyk
 * @returns cmyk color
 */
export function hex2cmyk(hex: HEX): CMYK {
  if (!isHex(hex)) throw new Error(`${hex} is not a hex color.`)

  const rgb = hex2rgb(hex)
  return rgb2cmyk(rgb)
}

/**
 * Convert a hex color string to a hsl object. It ignores opacity.
 * @param hex color to convert to hsl
 * @returns hsl color object
 */
export function hex2hsl(hex: HEX): HSL {
  if (!isHex(hex)) throw new Error(`${hex} is not a hex color.`)

  const rgb = hex2rgb(hex)
  return rgb2hsl(rgb)
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
  if (!isHex(hex)) throw new Error(`${hex} is not a hex color.`)
  if (!between(alpha, [0, 1])) throw new Error(`${alpha} is not in the range [0, 1].`)

  const rgbOrRgba = hex2rgbOrRgba(hex)
  if (isRgb(rgbOrRgba)) return { ...rgb2hsl(rgbOrRgba), a: alpha }
  else return rgbaToHsla(rgbOrRgba)
}

/**
 * Expand the 3-digit hexadecimal form to the 6-digit form doubling each digit.
 * For example #09C becomes #0099CC and #09CA becomes #0099CCAA.
 * If hex is in the long format, return it.
 * @param hex in shorthand hexadecimal form
 * @returns hex in long hexadecimal form
 */
export function shortToLongHex(hex: HEX): HEX {
  if (!isHex(hex)) throw new Error(`${hex} is not a hex color.`)
  if (!HEX_REGEX.short.test(hex)) {
    console.warn(`shortToLongHex: ${hex} is not in the short format.`)
    return hex
  }

  const [hashtag, r, g, b, a] = Array.from(hex)
  return a ? `${hashtag}${r}${r}${g}${g}${b}${b}${a}${a}` : `${hashtag}${r}${r}${g}${g}${b}${b}`
}

/**
 * Convert a generic color to hex string.
 * @param color color to convert to hex
 * @returns hex string
 */
export function colorToHex(color: Color): HEX {
  if (!isColor(color)) throw new Error(`${color} is not a valid color format.`)

  if (isHex(color)) return color
  else if (isRgb(color)) return rgb2hex(color)
  else if (isRgba(color)) return rgbaToHex(color)
  else if (isCmyk(color)) return cmyk2hex(color)
  else if (isHsl(color)) return hsl2hex(color)
  else return hslaToHex(color) // hsla
}

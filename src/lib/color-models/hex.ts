import { round } from 'lodash'
import { HEX, RGB, RGBA, CMYK, HSL } from '../../types/types'
import { isHex, isRgb } from '../../types/isType'
import { between } from '../../utils/math-utils'
import { rgb2cmyk, rgb2hsl } from './rgb'
import { HEX_REGEX, HEX_SHORT_REGEX } from '../../constants/regex'
import { ALPHA_PRECISION } from '../../constants/rgba'
import { percentToHex } from '../../utils/hex-utils'

/**
 * Convert a hex to a rgb or rgba color (depends on hex format).
 * @param hex color to convert to rgb or rgba
 * @returns rgb or rgba object
 */
export function hex2rgbOrRgba(hex: HEX): RGB | RGBA {
  if (!isHex(hex)) throw new Error(`${hex} is not a valid hex color.`)

  // Matches a string or an object that supports being matched against
  // and returns an array containing the results of that search
  const [originalHex, shortWithoutHashtag, longWithoutHashtag, opacity] = hex.match(
    HEX_REGEX
  ) as RegExpMatchArray
  // save in color the hex long format color, if hex is long format save it,
  // if is in short format convert it to long format and remove the hashtag
  const color = longWithoutHashtag || shortToLongHex(`#${shortWithoutHashtag}`).substr(1)

  // convert a string to a integer using base 16 (so from hexadecimal string to number base 10)
  const hexadecimalBase10 = Number.parseInt(color, 16)
  const rgb = {
    r: (hexadecimalBase10 >> 16) & 255,
    g: (hexadecimalBase10 >> 8) & 255,
    b: hexadecimalBase10 & 255,
  }
  if (!opacity) return rgb

  const opacityBase10 = parseInt(opacity, 16)
  const opacityNormalized = opacityBase10 / 255 // opacityNormalized is in [0, 1]
  const opacityRounded = round(opacityNormalized, ALPHA_PRECISION)
  return { ...rgb, a: opacityRounded }
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
  const alphaHex = percentToHex(alpha)
  return `${longHex}${alphaHex}`
}

/**
 * Convert a hex to a cmyk. If hex is in long format (e.g. #000000FF)
 * it removes the last two chars because cmyk doens't support opacity.
 * @param hex color to convert to cmyk
 * @returns cmyk color
 */
export function hex2cmyk(hex: HEX): CMYK {
  if (!isHex(hex)) throw new Error(`${hex} is not a hex color.`)

  // remove opacity chars
  const hexWithoutOpacity = hex.substring(0, 7)
  const rgb = hex2rgbOrRgba(hexWithoutOpacity)
  return rgb2cmyk(rgb)
}

/**
 * Convert a hex color string to a hsl object.
 * @param hex color to convert to hsl
 * @returns hsl color object
 */
export function hex2hsl(hex: HEX): HSL {
  if (!isHex(hex)) throw new Error(`${hex} is not a hex color.`)

  const rgb = hex2rgb(hex)
  return rgb2hsl(rgb)
}

/**
 * Expand the 3-digit hexadecimal form to the 6-digit form doubling each digit.
 * For example #09C becomes #0099CC.
 * If hex is in the long format, it simply takes the first three characters and converts
 * this value to a hex in the long format.
 * @param hex in shorthand hexadecimal form
 * @returns hex in long hexadecimal form
 */
export function shortToLongHex(hex: HEX): HEX {
  if (!isHex(hex)) throw new Error(`${hex} is not a hex color.`)
  if (!HEX_SHORT_REGEX.test(hex)) console.warn(`shortToLongHex: ${hex} is not in the short format.`)

  const [hashtag, r, g, b] = Array.from(hex)
  return `${hashtag}${r}${r}${g}${g}${b}${b}`
}

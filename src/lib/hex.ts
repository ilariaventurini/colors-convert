import { HEX, RGB, RGBA, CMYK, HSL } from '../types/types'
import { isHex, isRgb } from '../types/isType'
import { round } from 'lodash'
import { between } from './utils'
import { rgb2cmyk, rgb2hsl } from './rgb'

/**
 * Convert a hex to a rgb color, if hex color has opacity, it will be lost.
 * @param hex color to convert to RGB
 * @returns RGB object
 */
export function hex2rgb(hex: HEX): RGB {
  if (!isHex(hex)) {
    throw new Error(`${hex} is not a hex color.`)
  }

  const { r, g, b } = hex2rgba(hex)
  return { r, g, b }
}
import { HEX_REGEX } from '../constants/regex'

/**
 * Convert a hex to a rgb or rgba color (depends on hex format).
 * @param hex color to convert to RGB or RGBA
 * @returns RGB or RGBA object
 */
export function hex2rgbOrRgba(hex: HEX): RGB | RGBA {
  if (!isHex(hex)) {
    throw new Error(`${hex} is not a hex color.`)
  }

  const [originalHex, short, long, opacity] = hex.match(HEX_REGEX) as RegExpMatchArray
  if (long) {
    const value = Number.parseInt(long, 16)
    const rgb = { r: value >> 16, g: (value >> 8) & 0xff, b: value & 0xff }
    if (opacity) {
      const alpha = round(parseInt(opacity, 16) / 255, 2)
      return { ...rgb, a: alpha }
    } else {
      return rgb
    }
  } else {
    // expand short form (e.g. "03F") to long form (e.g. "0033FF")
    const [r, g, b] = Array.from(short, (s) => Number.parseInt(s, 16)).map((n) => (n << 4) | n)
    return { r, g, b }
  }
}

/**
 * Convert a hex to a rgba object, by default alpha is 1.
 * @param hex color to convert to RGBA
 * @param alpha opacity value in range [0, 1]
 * @returns RBGA color
 */
export function hex2rgba(hex: HEX, alpha = 1): RGBA {
  if (!isHex(hex)) {
    throw new Error(`${hex} is not a hex color.`)
  }

  if (!between(alpha, [0, 1])) {
    throw new Error(`${alpha} is not in the range [0, 1].`)
  }

  const rgbOrRgba = hex2rgbOrRgba(hex)
  if (isRgb(rgbOrRgba)) {
    return { ...rgbOrRgba, a: alpha }
  }
  {
    return rgbOrRgba
  }
}

/**
 * Convert a hex to another hex with the given alpha.
 * @param hex original hex
 * @param alpha opacity value in range [0, 1]
 * @returns HEX color with opacity
 */
export function hex2hexWithAlpha(hex: HEX, alpha: number): HEX {
  if (!isHex(hex)) {
    throw new Error(`${hex} is not a hex color.`)
  }

  if (!between(alpha, [0, 1])) {
    throw new Error(`${alpha} is not in the range [0, 1].`)
  }

  const alpha255 = Math.round(alpha * 255)
  const alphaHex = alpha255.toString(16)
  const alphaHexPadded = alphaHex.length === 1 ? `0${alphaHex}` : alphaHex
  return `${hex}${alphaHexPadded}`
}

/**
 * Convert a hex to a cmyk. If hex is in long format (e.g. #000000FF) it removes the last two chars because cmyk doens't support opacity.
 * @param hex color to convert to CMYK
 * @returns CMYK color
 */
export function hex2cmyk(hex: HEX): CMYK {
  if (!isHex(hex)) {
    throw new Error(`${hex} is not a hex color.`)
  }

  // remove opacity chars
  const hexShortFormat = hex.substring(0, 7)
  const rgb = hex2rgbOrRgba(hexShortFormat)
  const cmyk = rgb2cmyk(rgb)

  return cmyk
}

/**
 * Convert a hex object to hsl.
 * @param hex color to convert to HSL
 * @returns HSL color
 */
export function hex2hsl(hex: HEX): HSL {
  if (!isHex(hex)) {
    throw new Error(`${hex} is not a hex color.`)
  }

  const { r, g, b, a } = hex2rgba(hex)
  const hsl = rgb2hsl({ r, g, b })

  return hsl
}

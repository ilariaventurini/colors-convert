import { HEX, RGB, RGBA, CMYK, HSL } from '../types/types'
import { isHex, isRgb, isRgba } from '../types/isType'
import { round } from 'lodash'
import { between } from './utils'
import { rgb2cmyk } from './rgb'

// Convert an hex to a rgb or rgba color (depeds on hex format)
export const hex2rgbOrRgba = (hex: HEX): RGB | RGBA => {
  if (!isHex(hex)) {
    throw new Error(`${hex} is not a hex color.`)
  }

  const RGB_HEX = /^#?(?:([0-9a-f]{3})|([0-9a-f]{6})([0-9a-f]{2})?)$/i
  // short and long are or undefined or the original_hex without #
  const [original_hex, short, long, opacity] = hex.match(RGB_HEX) || []
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
    const [r, g, b] = Array.from(short, s => Number.parseInt(s, 16)).map(n => (n << 4) | n)
    return { r, g, b }
  }
}

// Convert an hex to a rgba object
export const hex2rgba = (hex: HEX, alpha = 1): RGBA => {
  if (!isHex(hex)) {
    throw new Error(`${hex} is not a hex color.`)
  }

  if (!between(alpha, [0, 1])) {
    throw new Error(`${alpha} is not in the range [0, 1].`)
  }

  const rgbOrRgba = hex2rgbOrRgba(hex)
  if (isRgb(rgbOrRgba)) {
    return { ...rgbOrRgba, a: alpha }
  } else if (isRgba(rgbOrRgba)) {
    return rgbOrRgba
  } else {
    throw new Error(`${rgbOrRgba} is neither RGB nor RGBA.`)
  }
}

// Convert an hex to another hex with the given alpha
export const hex2hexWithAlpha = (hex: HEX, alpha: number): HEX => {
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

// Convert an hex to a cmyk. If hex is in the long format (e.g. #000000FF) it removes the last two chars because cmyk doens't support opacity
export const hex2cmyk = (hex: HEX): CMYK => {
  if (!isHex(hex)) {
    throw new Error(`${hex} is not a hex color.`)
  }

  // remove opacity chars
  const hexShortFormat = hex.substring(0, 7)
  const rgb = hex2rgbOrRgba(hexShortFormat)
  const cmyk = rgb2cmyk(rgb)

  return cmyk
}

// TODO: implement it
// Convert an hex object to hsl
export const hex2hsl = (hex: HEX): HSL => {
  return { h: 0, s: 0, l: 0 }
}

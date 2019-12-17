import { COLOR, HEX, RGB, RGBA, CMYK, isHex, isRgb, isRgba, isCmyk } from '../types/types'
import { toUpper, round } from 'lodash'
import { between } from '../lib/utils'

// TODO: add check that color is a valid color
// Convert a color to a string format
export const color2string = (color: COLOR): string => {
  if (isHex(color)) {
    return toUpper(color)
  } else if (isRgb(color)) {
    return `${color.r}, ${color.g}, ${color.b}`
  } else if (isRgba(color)) {
    return `${color.r}, ${color.g}, ${color.b}, ${color.a}`
  } else if (isCmyk(color)) {
    return `${color.c}%, ${color.m}%, ${color.y}%, ${color.k}%`
  } else throw new Error(`${color} is not a valid type of color.`)
}

// TODO: add check that color is a valid color
// Convert a color to a string format usable in CSS
export const color2cssString = (color: COLOR): string => {
  if (isHex(color)) {
    return toUpper(color)
  } else if (isRgb(color)) {
    return `rgb(${color.r}, ${color.g}, ${color.b})`
  } else if (isRgba(color)) {
    return `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`
  } else if (isCmyk(color)) {
    return `cmyk(${color.c}%, ${color.m}%, ${color.y}%, ${color.k}%)`
  } else throw new Error(`${color} is not a valid type of color.`)
}

// TODO: add check that hex is a valid hex
// Convert an hex to a rgb or rgba color (depeds on hex format)
export const hex2rgbOrRgba = (hex: HEX): RGB | RGBA => {
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
    // expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
    const [r, g, b] = Array.from(short, s => Number.parseInt(s, 16)).map(n => (n << 4) | n)
    return { r, g, b }
  }
}

// TODO: add check that hex is a valid hex
// Convert an hex to a rgba object
export const hex2rgba = (hex: HEX, alpha = 1): RGBA => {
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

// TODO: add check that rgb is a valid rgb
// Convert an rgb object to hex
export const rgb2hex = (rgb: RGB): HEX => {
  const { r, g, b } = rgb
  const hex = [r, g, b]
    .map(value => {
      const hex = value.toString(16)
      const paddedHex = hex.length === 1 ? `0${hex}` : hex
      return paddedHex
    })
    .join('')
  return `#${hex}`
}

// Convert an hex to another hex with the given alpha
export const hex2hexWithAlpha = (hex: HEX, alpha: number): HEX => {
  if (!between(alpha, [0, 1])) {
    throw new Error(`${alpha} is not in the range [0, 1].`)
  }
  const alpha255 = Math.round(alpha * 255)
  const alphaHex = alpha255.toString(16)
  const alphaHexPadded = alphaHex.length === 1 ? `0${alphaHex}` : alphaHex
  return `${hex}${alphaHexPadded}`
}

// TODO: consider also alpha
// TODO: check all types of hex formats
// Convert an hex to a cmyk
export const hex2cmyk = (hex: HEX): CMYK => {
  const { r, g, b } = hex2rgba(hex)
  let c = 0
  let m = 0
  let y = 0
  let k = 0
  if (r === 0 && g === 0 && b === 0) {
    k = 1
    return { c, m, y, k }
  }
  c = 1 - r / 255
  m = 1 - g / 255
  y = 1 - b / 255
  const minCMY = Math.min(c, Math.min(m, y))
  c = (c - minCMY) / (1 - minCMY)
  m = (m - minCMY) / (1 - minCMY)
  y = (y - minCMY) / (1 - minCMY)
  k = minCMY
  return { c, m, y, k }
}
import { COLOR, HEX, RGB, RGBA, CMYK, isHex, isRgb, isRgba, isCmyk } from '../types/types'
import { toUpper } from 'lodash'
import { between } from '../lib/utils'

export const color2string = (color: COLOR): string | undefined => {
  if (isHex(color)) {
    return toUpper(color)
  } else if (isRgb(color)) {
    return `${color.r}, ${color.g}, ${color.b}`
  } else if (isRgba(color)) {
    return `${color.r}, ${color.g}, ${color.b}, ${color.a}`
  } else if (isCmyk(color)) {
    return `${color.c}%, ${color.m}%, ${color.y}%, ${color.k}%`
  } else return ''
}

export const color2cssString = (color: COLOR): string | undefined => {
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

export const hex2rgb = (hex: HEX): RGB => {
  const RGB_HEX = /^#?(?:([0-9a-f]{3})[0-9a-f]?|([0-9a-f]{6})(?:[0-9a-f]{2})?)$/i
  // short and long are or undefined or the original_hex without #
  const [original_hex, short, long] = hex.match(RGB_HEX) || []
  if (long) {
    const value = Number.parseInt(long, 16)
    return { r: value >> 16, g: (value >> 8) & 0xff, b: value & 0xff }
  } else {
    // expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
    const [r, g, b] = Array.from(short, s => Number.parseInt(s, 16)).map(n => (n << 4) | n)
    return { r, g, b }
  }
}

export const hex2rgba = (hex: HEX, alpha = 1): RGBA => {
  if (!between(alpha, [0, 1])) throw new Error(`${alpha} is not in the range [0, 1].`)
  const rgb = hex2rgb(hex)
  return { ...rgb, a: alpha }
}

export const rgb2hex = (rgb: RGB): HEX => {
  const { r, g, b } = rgb;
  const rgbTmp = b | (g << 8) | (r << 16);
  return `#${(0x1000000 + rgbTmp).toString(16).slice(1)}`;
}
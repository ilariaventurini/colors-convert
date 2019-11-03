import { COLOR, HEX, RGB, RGBA, CMYK, isHex, isRgb, isRgba, isCmyk } from '../types/types'
import { toUpper } from 'lodash'

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
  } else return ''
}

export const hex2rgb = (hex: HEX): RGB | undefined => {
  const RGB_HEX = /^#?(?:([0-9a-f]{3})[0-9a-f]?|([0-9a-f]{6})(?:[0-9a-f]{2})?)$/i
  const [, short, long] = hex.match(RGB_HEX) || []
  if (long) {
    const value = Number.parseInt(long, 16)
    return { r: value >> 16, g: (value >> 8) & 0xff, b: value & 0xff }
  } else {
    // short
    const rgbArray = Array.from(short, s => Number.parseInt(s, 16)).map(n => (n << 4) | n)
    return { r: rgbArray[0], g: rgbArray[1], b: rgbArray[2] }
  }
}

import { Color } from '../../types/types'
import { isHex, isRgb, isRgba, isCmyk, isHsl, isColor } from '../../types/isType'
import { toUpper } from 'lodash'

/**
 * Convert a color to a string format.
 * @param color color to convert to string
 * @returns string representing the color
 */
export function color2string(color: Color): string {
  if (!isColor(color)) throw new Error(`${color} is not a color.`)

  if (isHex(color)) return toUpper(color)
  else if (isRgb(color)) return `${color.r}, ${color.g}, ${color.b}`
  else if (isRgba(color)) return `${color.r}, ${color.g}, ${color.b}, ${color.a}`
  else if (isCmyk(color)) return `${color.c}%, ${color.m}%, ${color.y}%, ${color.k}%`
  else if (isHsl(color)) return `${color.h}, ${color.s}%, ${color.l}%`
  // @ts-ignore
  else return `${color.h}, ${color.s}%, ${color.l}%, ${color.a}` // is hsla
}

/**
 * Convert a color to a string format usable in CSS.
 * @param color color to convert to string
 * @returns string representing the color
 */
export function color2cssString(color: Color): string {
  if (!isColor(color)) throw new Error(`${color} is not a color.`)

  if (isHex(color)) return toUpper(color)
  else if (isRgb(color)) return `rgb(${color.r}, ${color.g}, ${color.b})`
  else if (isRgba(color)) return `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`
  else if (isCmyk(color)) return `cmyk(${color.c}%, ${color.m}%, ${color.y}%, ${color.k}%)`
  else if (isHsl(color)) return `hsl(${color.h}, ${color.s}%, ${color.l}%)`
  // @ts-ignore
  else return `hsla(${color.h}, ${color.s}%, ${color.l}%, ${color.a})` // is hsla
}

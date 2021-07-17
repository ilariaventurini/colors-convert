import { Color } from '../types/types'
import {
  isHex,
  isRgb,
  isRgba,
  isCmyk,
  isHsl,
  isColor,
  isRgbString,
  isRgbaString,
  isCmykString,
  isHslString,
  isHslaString,
} from '../types/isType'
import { toUpper } from 'lodash'
import { notValidColorMessage } from '../../utils/logs-utils'
import { obsolete } from '../../utils/obsolete'
import { DELETE_VERSION_2, DEPRECATE_VERSION_2 } from '../../constants/constants'
import { rgbStringToObject } from './rgb'
import { rgbaStringToObject } from './rgba'
import { cmykStringToObject } from './cmyk'
import { hslStringToObject } from './hsl'
import { hslaStringToObject } from './hsla'

/**
 * Convert a color to a string format.
 * @param color color to convert to string
 * @returns string representing the color
 */
export function colorToString(color: Color): string {
  if (!isColor(color)) throw new Error(notValidColorMessage('colorToString', color))

  if (isHex(color)) return toUpper(color)
  else if (isRgb(color)) return `${color.r}, ${color.g}, ${color.b}`
  else if (isRgba(color)) return `${color.r}, ${color.g}, ${color.b}, ${color.a}`
  else if (isCmyk(color)) return `${color.c}%, ${color.m}%, ${color.y}%, ${color.k}%`
  else if (isHsl(color)) return `${color.h}, ${color.s}%, ${color.l}%`
  // @ts-ignore
  else return `${color.h}, ${color.s}%, ${color.l}%, ${color.a}` // is hsla
}
/**
 * Convert a color to a string format.
 * @param color color to convert to string
 * @returns string representing the color
 * @deprecated since version 1.3.0, use `colorToString` instead
 */
export function color2string(color: Color): string {
  return obsolete(
    colorToString,
    'color2string',
    'colorToString',
    DEPRECATE_VERSION_2,
    DELETE_VERSION_2,
    arguments
  )
}

/**
 * Convert a color to a string format usable in CSS.
 * @param color color to convert to string
 * @returns string representing the color
 */
export function colorToCssString(color: Color): string {
  if (!isColor(color)) throw new Error(notValidColorMessage('colorToCssString', color))

  if (isHex(color)) return toUpper(color)
  else if (isRgb(color)) return `rgb(${color.r}, ${color.g}, ${color.b})`
  else if (isRgba(color)) return `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`
  else if (isCmyk(color)) return `cmyk(${color.c}%, ${color.m}%, ${color.y}%, ${color.k}%)`
  else if (isHsl(color)) return `hsl(${color.h}, ${color.s}%, ${color.l}%)`
  // @ts-ignore
  else return `hsla(${color.h}, ${color.s}%, ${color.l}%, ${color.a})` // is hsla
}
/**
 * Convert a color to a string format usable in CSS.
 * @param color color to convert to string
 * @returns string representing the color
 * @deprecated since version 1.3.0, use `colorToCssString` instead
 */
export function color2cssString(color: Color): string {
  return obsolete(
    colorToCssString,
    'color2cssString',
    'colorToCssString',
    DEPRECATE_VERSION_2,
    DELETE_VERSION_2,
    arguments
  )
}

/**
 * Check if a string is a valid color and if so, transform it to the right Color.
 * @param string to convert to a Color
 * @returns Color
 */
export function stringToColor(stringColor: string): Color {
  if (typeof stringColor !== 'string')
    throw new Error(`${stringToColor}: "${stringColor}" is not a string.`)

  if (isHex(stringColor)) return toUpper(stringColor)
  if (isRgbString(stringColor)) return rgbStringToObject(stringColor)
  if (isRgbaString(stringColor)) return rgbaStringToObject(stringColor)
  if (isCmykString(stringColor)) return cmykStringToObject(stringColor)
  if (isHslString(stringColor)) return hslStringToObject(stringColor)
  if (isHslaString(stringColor)) return hslaStringToObject(stringColor)

  throw new Error(`${stringToColor}: "${stringColor}" is not a valid color string.`)
}

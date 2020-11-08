import { RGB_REGEX } from '../constants/regex'
import { isRgb } from '../lib/types/isType'
import { RGB } from '../lib/types/types'

//////////////////////////////////////////////////////
// This file contains functions not exported.
//////////////////////////////////////////////////////

/**
 * Convert a string in format '255, 0, 255' (short format) to a rgb object {r: 255, g: 0, b: 255}.
 * @param rgbString rgb string color to convert to rgb object
 * @returns rgb color object
 */
export function shortRgbFormatToRgbObject(rgbString: string): RGB {
  if (!RGB_REGEX.short.test(rgbString))
    throw new Error(`${rgbString} is not in the format 'r, g, b'.`)

  // split by comma, remove white spaces, convert to number
  const values = rgbString.split(',').map((v) => Number(v.trim()))
  const rgb = { r: values[0], g: values[1], b: values[2] }
  if (!isRgb(rgb)) throw new Error(`${rgb} is not a valid rgb color.`)
  return rgb
}

/**
 * Convert 'rgb(N, N, N)' to 'N, N, N'.
 * @param rgbStringLongFormat long format
 * @returns short format
 */
export function fromLongToShortRgbFormat(rgbStringLongFormat: string): string {
  if (!RGB_REGEX.long.test(rgbStringLongFormat))
    throw new Error(`${rgbStringLongFormat} is not in the format 'rgb(r, g, b)'.`)

  const rgb = rgbStringLongFormat
    .replace('rgb', '')
    .replace('(', '')
    .replace(')', '')
    .split(',')
    .map((n) => n.trim())

  const short = rgb.join(', ')
  shortRgbFormatToRgbObject(short)
  return short
}

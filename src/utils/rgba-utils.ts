import { RGBA_REGEX } from '../constants/regex'
import { isRgba } from '../lib/types/isType'
import { RGBA } from '../lib/types/types'

//////////////////////////////////////////////////////
// This file contains functions not exported.
//////////////////////////////////////////////////////

/**
 * Convert a string in format '255, 0, 255, 0.5' (short format) to a RGBA object {r: 255, g: 0, b: 255, a: 0.5}.
 * @param rgbaString rgba string
 * @returns rgba color object
 */
export function shortRgbaFormatToRgbaObject(rgbaString: string): RGBA {
  if (!RGBA_REGEX.short.test(rgbaString))
    throw new Error(`${rgbaString} is not in the format 'r, g, b, a'.`)

  // split by comma, remove white spaces, convert to number
  const values = rgbaString.split(',').map((v) => Number(v.trim()))
  const rgba = { r: values[0], g: values[1], b: values[2], a: values[3] }
  if (!isRgba(rgba)) throw new Error(`${rgba} is not a valid rgba color.`)
  return rgba
}

/**
 * Convert 'rgba(N, N, N, N)' to 'N, N, N, N'.
 * @param rgbaStringLongFormat long format
 * @returns short format
 */
export function fromLongToShortRgbaFormat(rgbaStringLongFormat: string): string {
  if (!RGBA_REGEX.long.test(rgbaStringLongFormat))
    throw new Error(`${rgbaStringLongFormat} is not in the format 'rgba(r, g, b, a)'.`)

  const rgba = rgbaStringLongFormat
    .replace('rgba', '')
    .replace('(', '')
    .replace(')', '')
    .split(',')
    .map((n) => n.trim())

  const short = rgba.join(', ')
  shortRgbaFormatToRgbaObject(short)
  return short
}

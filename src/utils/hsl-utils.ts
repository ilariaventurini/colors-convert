import { HSL_REGEX } from '../constants/regex'
import { isHsl } from '../lib/types/isType'
import { HSL } from '../lib/types/types'

//////////////////////////////////////////////////////
// This file contains functions not exported.
//////////////////////////////////////////////////////

/**
 * Convert a string in format '322, 79%, 52%' (short format) to a hsl object { h: 322, s: 79, l: 52 }.
 * @param hslString string to convert to hsl object
 * @returns hsl object
 */
export function shortHslFormatToHslObject(hslString: string): HSL {
  if (!HSL_REGEX.short.test(hslString))
    throw new Error(`${hslString} is not in the format '322, 79%, 52%'.`)

  // split by comma, remove white spaces, remove last char (except for h), convert to number
  const values = hslString.split(',').map((v, i) => {
    if (i === 0) return Number(v.trim())
    else return Number(v.trim().slice(0, -1))
  })
  const hsl = { h: values[0], s: values[1], l: values[2] }
  if (!isHsl(hsl)) throw new Error(`${hsl} is not a valid hsl color.`)
  return hsl
}

/**
 * Convert a string in format 'hsl(0, 50, 20)' (long format) to '0, 50, 20' (short format).
 * @param hslStringLongFormat string to convert to short format
 * @returns hsl short format
 */
export function fromLongToShortFormat(hslStringLongFormat: string): string {
  if (!HSL_REGEX.long.test(hslStringLongFormat))
    throw new Error(`${hslStringLongFormat} is not in the format 'hsl(322, 79%, 52%)'.`)

  const hsl = hslStringLongFormat
    .replace('hsl', '')
    .replace('(', '')
    .replace(')', '')
    .split(',')
    .map((n) => n.trim())

  const short = hsl.join(', ')
  shortHslFormatToHslObject(short)
  return short
}

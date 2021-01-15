import { HSLA_REGEX } from '../constants/regex'
import { isHsla } from '../lib/types/isType'
import { HSLA } from '../lib/types/types'

//////////////////////////////////////////////////////
// This file contains functions not exported.
//////////////////////////////////////////////////////

/**
 * Convert a string in format 'A, N%, N%, a' (short format) to a hsla object { h: A, s: N, l: N, a: a }.
 * @param hslaString string to convert to hsla object
 * @returns hsla object
 * @private
 */
export function shortHslaFormatToHslaObject(hslaString: string): HSLA {
  if (!HSLA_REGEX.short.test(hslaString))
    throw new Error(`${hslaString} is not in the format 'A, N%, N%, a'.`)

  // split by comma, remove white spaces, remove last char (except for h), convert to number
  const values = hslaString.split(',').map((v, i) => {
    if (i === 0 || i === 3) return Number(v.trim())
    else return Number(v.trim().slice(0, -1))
  })
  const hsla = { h: values[0], s: values[1], l: values[2], a: values[3] }
  if (!isHsla(hsla)) throw new Error(`${hsla} is not a valid hsla color.`)
  return hsla
}

/**
 * Convert a string in format 'hsla(0, 50, 20, 1)' (long format) to '0, 50, 20, 1' (short format).
 * @param hslaStringLongFormat string to convert to short format
 * @returns hsla short format
 * @private
 */
export function fromLongToShortFormat(hslaStringLongFormat: string): string {
  if (!HSLA_REGEX.long.test(hslaStringLongFormat))
    throw new Error(`${hslaStringLongFormat} is not in the format 'hsla(322, 79%, 52%, 1)'.`)

  const hsla = hslaStringLongFormat
    .replace('hsla', '')
    .replace('(', '')
    .replace(')', '')
    .split(',')
    .map((n) => n.trim())

  const short = hsla.join(', ')
  shortHslaFormatToHslaObject(short)
  return short
}

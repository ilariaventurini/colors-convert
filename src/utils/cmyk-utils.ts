import { CMYK_REGEX } from '../constants/regex'
import { isCmyk } from '../lib/types/isType'
import { CMYK } from '../lib/types/types'

//////////////////////////////////////////////////////
// This file contains functions not exported.
//////////////////////////////////////////////////////

/**
 * Convert a string in format '0, 50, 20, 100' (short format) to a RGB object {c: 0, m: 50, y: 20, k: 100}.
 * @param cmykString string to convert to cmyk
 * @returns cmyk object
 * @private
 */
export function shortCmykFormatToCmykObject(cmykString: string): CMYK {
  if (!CMYK_REGEX.short.test(cmykString))
    throw new Error(`${cmykString} is not in the format 'c, m, y, k'.`)

  // split by comma, remove white spaces, convert to number
  const values = cmykString.split(',').map((v) => Number(v.trim()))
  const cmyk = { c: values[0], m: values[1], y: values[2], k: values[3] }
  if (!isCmyk(cmyk)) throw new Error(`${cmyk} is not a valid cmyk color.`)
  return cmyk
}

/**
 * Convert a string in format 'cmyk(0, 50, 20, 100)' (long format) to '0, 50, 20, 100' (short format).
 * @param cmykStringLongFormat string to convert to short format
 * @returns cmyk short format
 * @private
 */
export function fromLongToShortCmykFormat(cmykStringLongFormat: string): string {
  if (!CMYK_REGEX.long.test(cmykStringLongFormat))
    throw new Error(`${cmykStringLongFormat} is not in the format 'cmyk(c, m, y, k)'.`)

  const cmyk = cmykStringLongFormat
    .replace('cmyk', '')
    .replace('(', '')
    .replace(')', '')
    .split(',')
    .map((n) => n.trim())

  const short = cmyk.join(', ')
  shortCmykFormatToCmykObject(short)
  return short
}

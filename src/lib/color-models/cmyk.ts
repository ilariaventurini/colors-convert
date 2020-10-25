import { CMYK, HEX, RGB, HSL } from '../../types/types'
import { applyFnToEachObjValue } from '../misc/utils'
import { round } from 'lodash'
import { isCmyk } from '../../types/isType'
import { rgb2hex, rgb2hsl } from './rgb'

/**
 * Convert a cmyk color to a rgb.
 * @param cmyk color to convert to RGB
 * @returns RGB object
 */
export function cmyk2rgb(cmyk: CMYK): RGB {
  if (!isCmyk(cmyk)) {
    throw new Error(`${cmyk} is not a cmyk color.`)
  }

  const { c, m, y, k } = applyFnToEachObjValue(cmyk, (col: number) => col / 100) as CMYK
  const rgb01 = {
    r: 1 - Math.min(1, c * (1 - k) + k),
    g: 1 - Math.min(1, m * (1 - k) + k),
    b: 1 - Math.min(1, y * (1 - k) + k),
  }
  const rgb = applyFnToEachObjValue(rgb01, (col: number) => round(col * 255)) as RGB
  return rgb
}

/**
 * Convert a cmyk color to a hex.
 * @param cmyk color to convert to HEX
 * @returns hex color
 */
export function cmyk2hex(cmyk: CMYK): HEX {
  if (!isCmyk(cmyk)) {
    throw new Error(`${cmyk} is not a cmyk color.`)
  }

  const rgb = cmyk2rgb(cmyk)
  const hex = rgb2hex(rgb)
  return hex
}

/**
 * Convert a cmyk color to a hsl.
 * @param cmyk color to convert to HSL
 * @returns HSL object
 */
export function cmyk2hsl(cmyk: CMYK): HSL {
  if (!isCmyk(cmyk)) {
    throw new Error(`${cmyk} is not a cmyk color.`)
  }

  const rgb = cmyk2rgb(cmyk)
  const hsl = rgb2hsl(rgb)
  return hsl
}

/**
 * Covert a string in these two formats to a cmyk object:
 *  - 0, 50, 20, 100 (short format) -> {c: 0, m: 50, y: 20, k: 100}
 *  - cmyk(0, 50, 20, 100) (long format) -> {c: 0, m: 50, y: 20, k: 100}.
 * @param cmykString string to convert to CMYK
 * @returns CMYK object
 */
export function cmykString2Object(cmykString: string): CMYK {
  const errorMessage = `${cmykString} is not a valid format. The accepted formats are 'c, m, y, k' and 'cmyk(c, m, y, k)' with c, m, y, k in [0, 100].`

  // check short and long formats
  const regexShortFormat = /^(([0-9]+)(\s)*,(\s)*([0-9]+)(\s)*,(\s)*([0-9]+)(\s)*,(\s)*([0-9]+))/gi
  const regexLongFormat = /^((cmyk(\s)*\()(\s)*([0-9]+)(\s)*,(\s)*([0-9]+)(\s)*,(\s)*([0-9]+)(\s)*,(\s)*([0-9]+)(\s)*(\)))/gi
  const isShortFormat = regexShortFormat.test(cmykString)
  const isLongFormat = regexLongFormat.test(cmykString)

  if (!isShortFormat && !isLongFormat) {
    throw new Error(errorMessage)
  }

  const cmykStringCleanShortFormat = isShortFormat
    ? cmykString
    : fromLongToShortCmykFormat(cmykString)
  const cmykObject = shortCmykFormatToRgbObject(cmykStringCleanShortFormat)

  if (isCmyk(cmykObject)) {
    return cmykObject
  } else {
    throw new Error(errorMessage)
  }
}

/**
 * Convert a string in format '0, 50, 20, 100' (short format) to a RGB object {c: 0, m: 50, y: 20, k: 100}.
 * @param cmykString string to convert to CMYK
 * @returns CMYK object
 */
function shortCmykFormatToRgbObject(cmykString: string): CMYK {
  // split by comma, remove white spaces, convert to number
  const values = cmykString.split(',').map((v) => Number(v.trim()))
  return { c: values[0], m: values[1], y: values[2], k: values[3] }
}

/**
 * Convert a string in format 'cmyk(0, 50, 20, 100)' (long format) to '0, 50, 20, 100' (short format).
 * @param cmykStringLongFormat string to convert to short format
 * @returns cmyk short format
 */
function fromLongToShortCmykFormat(cmykStringLongFormat: string): string {
  const cmykStringShortFormat = cmykStringLongFormat
    .replace('cmyk', '')
    .replace('(', '')
    .replace(')', '')
  return cmykStringShortFormat
}

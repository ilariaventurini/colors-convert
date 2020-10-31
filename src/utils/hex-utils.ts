import { between } from './math-utils'
import { hexadecimalToDecimal } from './math-utils'
import { round } from 'lodash'
import { HEX_ALPHA_REGEX } from '../constants/regex'

/**
 * Convert a value number in range [0, 1] to a hexadecimal string of lenght 2.
 * @param alpha number to convert in base 16 in range [0, 1]
 * @returns hexadecimal value
 */
export function alphaToHex(alpha: number): string {
  if (!between(alpha, [0, 1])) throw new Error(`${alpha} is not in the range [0, 1].`)

  // A 2-digit hex value can express at most 16^2 = 256 = [0, 255] values
  // convert the percent value ([0, 1]) to the nearest integer value in [0, 255]
  const integerIn0255 = Math.round(alpha * 255)
  // get hexadecimal representation
  const hexValue = integerIn0255.toString(16)
  // padding it with 0s at the start and make it in upper case
  return hexValue.padStart(2, '0').toUpperCase()
}

/**
 * Convert a 2-digit hexadecimal string to a number in range [0, 1].
 * @param hex hexadecimal value of lenght 2
 * @param precision the precision to round to
 * @returns value number in range [0, 1]
 */
export function hexToAlpha(hex: string, precision = 2): number {
  if (!HEX_ALPHA_REGEX.test(hex)) throw new Error(`${hex} is not a valid hex color.`)
  if (hex.length !== 2) throw new Error(`${hex} lenght is not 2.`)

  const integer = hexadecimalToDecimal(hex)
  const integerIn0255 = integer / 255
  return round(integerIn0255, precision)
}

/**
 * Convert a 2-digit hexadecimal string to a number in range [0, 255].
 * @param hexAlpha hexadecimal value of lenght 2
 * @returns value number in range [0, 255]
 */
export function hexAlphaTo0255(hexAlpha: string): number {
  return Math.round(hexToAlpha(hexAlpha) * 255)
}

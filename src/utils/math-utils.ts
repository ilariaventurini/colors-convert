import { HEXADECIMAL_REGEX } from '../constants/regex'
import { ALPHA_PRECISION } from '../constants/rgba'
import { insertAt } from './string-utils'

/**
 * Return true if range[0] <= value <= range[1] or range[1] <= value <= range[0],
 * false otherwise.
 * @param value number to check is inside the range
 * @param range numeric range. Could be [min, max] or [max, min]
 * @returns true if range[0] <= value <= range[1] or range[1] <= value <= range[0], false otherwise
 */
export function between(value: number, range: [number, number]): boolean {
  const min = Math.min(...range)
  const max = Math.max(...range)
  return value >= min && value <= max
}

/**
 * Return true if value is >= the min range value and value < max,
 * false otherwise.
 * @param value number to check is inside the range
 * @param range numeric range. Could be [min, max] or [max, min]
 * @returns true if value is >= the min range value and value < max, false otherwise
 */
export function betweenMaxNotIncluded(value: number, range: [number, number]): boolean {
  const min = Math.min(...range)
  const max = Math.max(...range)
  return value >= min && value < max
}

/**
 * Convert a positive number (also float) in base 10 to a "number" in base 16, so a hexadecimal string.
 * @param decimal number to convert in base 16
 * @returns hexadecimal value
 */
export function decimalToHexadecimal(decimal: number): string {
  if (decimal < 0) console.warn(`${decimal} should be a positive number.`)

  const positiveDecimal = Math.abs(decimal)
  return positiveDecimal.toString(16).toUpperCase()
}

/**
 * Convert a hexadecimal value to a number (also float) in base 10.
 * @param hexadecimal hexadecimal value to convert in base 10
 * @returns number in base 10
 */
export function hexadecimalToDecimal(hexadecimal: string): number {
  if (!HEXADECIMAL_REGEX.test(hexadecimal))
    throw new Error(`${hexadecimal} is not a valid hexadecimal string.`)

  // parse the digits separately, dividing the hexadecimal string in two (integer and decimal parts)
  // and treating both parts as integers when converting and then adding them back together
  const [integerPart, decimalPart] = hexadecimal.split('.')
  if (!decimalPart) return parseInt(integerPart, 16)

  return parseInt(integerPart, 16) + parseInt(decimalPart, 16) / Math.pow(16, decimalPart.length)
}

/**
 * Return true if value is an integer, false otherwise.
 * @param value number to test if is integer
 * @returns true if value is an integer, false otherwise
 */
export function isInteger(value: number): boolean {
  return Number(value) === value && value % 1 === 0
}

/**
 * Return true if value is float, false otherwise.
 * @param value number to test if is float
 * @returns true if value is float, false otherwise
 */
export function isFloat(value: number): boolean {
  return Number(value) === value && value % 1 !== 0
}

/**
 * Given a number, return the number of decimals it has so the precision of that value.
 * @param value to compute decimals
 * @returns number of decimals the value has
 */
export function decimalsLenght(value: number): number {
  const [integerPart, decimalPart] = value.toString().split('.')
  return decimalPart ? decimalPart.length : 0
}

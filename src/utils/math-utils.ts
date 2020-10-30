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
 * Convert a number (also float) in base 10 to a "number" in base 16, so a hexadecimal string.
 * @param base10 number to convert in base 16
 * @returns hexadecimal value
 */
// export function base10ToBase16(base10: number, precision = ALPHA_PRECISION): string {
//   // 1. Decide how many digits of precision you need after the decimal point
//   const pp = decimalsLenght(base10)

//   // 2. Multiply your original number by that power of 16
//   const multiplied = base10 * Math.pow(16, precision)
//   console.log('multiplied: ', multiplied)

//   // 3. Convert it to hex
//   const hexadecimal = multiplied.toString(16)
//   console.log('hexadecimal: ', hexadecimal)

//   // 4. Put the decimal point in manually according to what you decided in step 1
//   if (isInteger(base10)) return hexadecimal
//   return insertAt(hexadecimal, '.', hexadecimal.length - pp)

//   //////////////////////////////////
//   // return base10.toString(16)
// }

/**
 * Convert a hexadecimal value to a number (also float) in base 10.
 * @param base16 hexadecimal value to convert in base 10
 * @returns number in base 10
 */
// export function base16ToBase10(base16: string): number {
//   // 1. Take out the decimal point, remembering where it was
//   // 2. Convert the hex to decimal in integer form
//   // 3. Divide the result by the the appropriate power of 16 (16^n, where n is the number of digits after the decimal point you took out in step 1)

//   return 0
//   //////////////////////////////////
//   // const [integerPart, decimalPart] = base16.split('.')
//   // if (!decimalPart) return parseInt(integerPart, 16)
//   // // parse the digits separately, splitting the string up in two and
//   // // treating both parts as ints during the conversion and then add them back together
//   // return parseInt(integerPart, 16) + parseInt(decimalPart, 16) / Math.pow(16, decimalPart.length)
// }

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

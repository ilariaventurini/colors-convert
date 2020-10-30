import { ALPHA_PRECISION } from '../constants/rgba'
import { between } from './math-utils'

// // TODO: move to hex-utils
// /**
//  * Convert an opacity value number in range [0, 1] to a hexadecimal string of lenght 2.
//  * @param base10 number to convert in base 16 in range [0, 1]
//  * @returns hexadecimal value
//  */
// export function opacity01ToHex(base10: number): string {
//   if (!between(base10, [0, 1])) throw new Error(`${base10} is not in the range [0, 1].`)

//   // since each digit can have 16 possible values, the total possible combinations for a 2-digit number is 16x16=256 possible values.
//   // convert base10 to a number in range [0, 255]
//   const base10To255 = Math.round(base10 * 255)
//   const hexAlpha = base10ToBase16(base10To255)
//   // since hexAlpha can have lenght 1, fill that value with 0s (0 -> 00)
//   return hexAlpha.length === 1 ? `0${hexAlpha}` : hexAlpha
// }

// // TODO: move to hex-utils
// /**
//  * Convert an opacity hexadecimal string (of lenght 2) to a value number in range [0, 1].
//  * @param hexOpacity hexadecimal value of lenght 2
//  * @returns value number in range [0, 1]
//  */
// export function hexOpacityTo01(hexOpacity: string): number {
//   if (hexOpacity.length !== 2) throw new Error(`${hexOpacity} lenght is not 2.`)

//   return base16ToBase10(hexOpacity) / 255
// }

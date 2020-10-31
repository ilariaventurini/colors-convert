import { RGB, RGBA } from '../types/types'

//////////////////////////////////////////////////////
// This file contains functions not exported.
//////////////////////////////////////////////////////

/**
 * Convert a string in format '255, 0, 255' (short format) to a rgb object {r: 255, g: 0, b: 255}.
 * @param rgbString rgb string color to convert to rgb object
 * @returns rgb color object
 */
// TODO: check
// TODO: do also for other color models
export function shortRgbFormatToRgbObject(rgbString: string): RGB {
  // split by comma, remove white spaces, convert to number
  const values = rgbString.split(',').map((v) => Number(v.trim()))
  return { r: values[0], g: values[1], b: values[2] }
}

/**
 * Convert 'rgb(N, N, N)' to 'N, N, N'.
 * @param rgbStringLongFormat long format
 * @returns short format
 */
// TODO: check
// TODO: do also for other color models
export function fromLongToShortRgbFormat(rgbStringLongFormat: string): string {
  const rgbStringShortFormat = rgbStringLongFormat
    .replace('rgb', '')
    .replace('(', '')
    .replace(')', '')
  return rgbStringShortFormat
}

/**
 * Convert a string in format '255, 0, 255, 0.5' (short format) to a RGB object {r: 255, g: 0, b: 255, a: 0.5}.
 * @param rgbaString rgba string
 * @returns rgba color object
 */
// TODO: check
// TODO: do also for other color models
export function shortRgbaFormatToRgbObject(rgbaString: string): RGBA {
  // split by comma, remove white spaces, convert to number
  const values = rgbaString.split(',').map((v) => Number(v.trim()))
  return { r: values[0], g: values[1], b: values[2], a: values[3] }
}

/**
 * Convert 'rgba(N, N, N, N)' to 'N, N, N, N'
 * @param rgbaStringLongFormat long format
 * @returns short format
 */
// TODO: check
// TODO: do also for other color models
export function fromLongToShortRgbaFormat(rgbaStringLongFormat: string): string {
  const rgbaStringShortFormat = rgbaStringLongFormat
    .replace('rgba', '')
    .replace('(', '')
    .replace(')', '')
  return rgbaStringShortFormat
}

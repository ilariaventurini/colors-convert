import { RGBA_REGEX } from '../../constants/regex'
import { isRgba } from '../../types/isType'
import { HEX, RGB, RGBA } from '../../types/types'
import { alphaToHex } from '../../utils/hex-utils'
import { fromLongToShortRgbaFormat, shortRgbaFormatToRgbaObject } from '../../utils/rgba-utils'
import { rgb2hex } from './rgb'

// TODO: rgba2hex
// TODO: rgba2cmyk
// TODO: rgba2hsl

/**
 * Convert a rgba color object to a hex color.
 * @param rgba color to convert to rgba
 * @returns hex color
 */
export function rgbaToHex(rgba: RGBA): HEX {
  if (!isRgba(rgba)) throw new Error(`${rgba} is not a rgba color.`)

  const { r, g, b, a } = rgba
  const rgbHex = rgb2hex({ r, g, b })
  const alphaHex = alphaToHex(a)
  return `${rgbHex}${alphaHex}`
}

/**
 * Convert a rgba color object to a rgb color removing the alpha value.
 * @param rgba color to convert to rgb
 * @returns rgb color object
 */
export function rgba2rgb(rgba: RGBA): RGB {
  if (!isRgba(rgba)) throw new Error(`${rgba} is not a rgba color.`)

  return { r: rgba.r, g: rgba.g, b: rgba.b }
}

/**
 * Covert a string in these two formats to a rgba object:
 *  - 255, 0, 255, 0.5 (short format) -> {r: 255, g: 0, b: 255, a: 0.5}
 *  - rgba(255, 0, 255, 0.5) (long format) -> {r: 255, g: 0, b: 255, a: 0.5}.
 * @param rgbaString rgba string
 * @returns rgba object
 */
export function rgbaString2Object(rgbaString: string): RGBA {
  // check short and long formats
  const isShortFormat = RGBA_REGEX.short.test(rgbaString)
  const isLongFormat = RGBA_REGEX.long.test(rgbaString)

  if (!isShortFormat && !isLongFormat)
    throw new Error(
      `${rgbaString} is not a valid format. The accepted formats are 'r, g, b, a' and 'rgba(r, g, b, a)' with r, g, b in [0, 255] and a in [0, 1].`
    )

  // convert rgbString to short format: 'R, G, B'
  const rgbaStringCleanShortFormat = isShortFormat
    ? rgbaString
    : fromLongToShortRgbaFormat(rgbaString)
  return shortRgbaFormatToRgbaObject(rgbaStringCleanShortFormat)
}

// TODO: colorToRgba

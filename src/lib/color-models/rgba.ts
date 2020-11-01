import { RGBA_REGEX } from '../../constants/regex'
import { isCmyk, isColor, isHex, isHsl, isRgb, isRgba } from '../../types/isType'
import { CMYK, Color, HEX, HSL, RGB, RGBA } from '../../types/types'
import { alphaToHex } from '../../utils/hex-utils'
import { fromLongToShortRgbaFormat, shortRgbaFormatToRgbaObject } from '../../utils/rgba-utils'
import { cmykToRgba } from './cmyk'
import { hex2rgba } from './hex'
import { hslToRgba } from './hsl'
import { hslaToRgba } from './hsla'
import { rgb2cmyk, rgb2hex, rgb2hsl, rgb2rgba } from './rgb'

/**
 * Convert a rgba color object to a hex color.
 * @param rgba color to convert to hex
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
 * Convert a rgba color object to a cmyk color object.
 * It ignores opacity because cmyk doens't support it.
 * @param rgba color to convert to cmyk
 * @returns cmyk color object
 */
export function rgbaToCmyk(rgba: RGBA): CMYK {
  if (!isRgba(rgba)) throw new Error(`${rgba} is not a rgba color.`)

  const { r, g, b } = rgba
  return rgb2cmyk({ r, g, b })
}

/**
 * Convert a rgba color object to a hsl color object removing the alpha value.
 * @param rgba color to convert to hsl
 * @returns hsl color object
 */
export function rgbaToHsl(rgba: RGBA): HSL {
  if (!isRgba(rgba)) throw new Error(`${rgba} is not a rgba color.`)

  const { r, g, b } = rgba
  return rgb2hsl({ r, g, b })
}

/**
 * Convert a generic color to rgba.
 * @param color color to convert to rgba
 * @returns rgba color object
 */
export function colorToRgba(color: Color): RGB {
  if (!isColor(color)) throw new Error(`${color} is not a valid color format.`)

  if (isHex(color)) return hex2rgba(color)
  else if (isRgb(color)) return rgb2rgba(color)
  else if (isRgba(color)) return color
  else if (isCmyk(color)) return cmykToRgba(color)
  else if (isHsl(color)) return hslToRgba(color)
  else return hslaToRgba(color) // hsla
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

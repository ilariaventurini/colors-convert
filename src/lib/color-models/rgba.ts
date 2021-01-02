import { RGBA_REGEX } from '../../constants/regex'
import { isCmyk, isColor, isHex, isHsl, isRgb, isRgba } from '../types/isType'
import { CMYK, Color, HEX, HSL, HSLA, RGB, RGBA } from '../types/types'
import { alphaToHex } from '../../utils/hex-utils'
import { fromLongToShortRgbaFormat, shortRgbaFormatToRgbaObject } from '../../utils/rgba-utils'
import { cmykToRgba } from './cmyk'
import { hexToRgba } from './hex'
import { hslToRgba } from './hsl'
import { hslaToRgba } from './hsla'
import { rgbToCmyk, rgbToHex, rgbToHsl, rgbToRgba } from './rgb'
import { notValidRgbaMessage, notValidRgbaStringMessage } from '../../utils/logs-utils'
import { obsolete } from '../../utils/obsolete'
import { DELETE_VERSION_2, DEPRECATE_VERSION_2 } from '../../constants/constants'

/**
 * Convert a rgba color object to a hex color.
 * @param rgba color to convert to hex
 * @returns hex color
 */
export function rgbaToHex(rgba: RGBA): HEX {
  if (!isRgba(rgba)) throw new Error(notValidRgbaMessage('rgbaToHex', rgba))

  const { r, g, b, a } = rgba
  const rgbHex = rgbToHex({ r, g, b })
  const alphaHex = alphaToHex(a)
  return `${rgbHex}${alphaHex}`
}

/**
 * Convert a rgba color object to a rgb color removing the alpha value.
 * @param rgba color to convert to rgb
 * @returns rgb color object
 */
export function rgbaToRgb(rgba: RGBA): RGB {
  if (!isRgba(rgba)) throw new Error(notValidRgbaMessage('rgbaToRgb', rgba))

  return { r: rgba.r, g: rgba.g, b: rgba.b }
}
/**
 * Convert a rgba color object to a rgb color removing the alpha value.
 * @param rgba color to convert to rgb
 * @returns rgb color object
 * @deprecated since version 1.3.0, use `rgbaToRgb` instead
 */
export function rgba2rgb(rgba: RGBA): RGB {
  return obsolete(
    rgbaToRgb,
    'rgba2rgb',
    'rgbaToRgb',
    DEPRECATE_VERSION_2,
    DELETE_VERSION_2,
    arguments
  )
}

/**
 * Convert a rgba color object to a cmyk color object.
 * It ignores opacity because cmyk doens't support it.
 * @param rgba color to convert to cmyk
 * @returns cmyk color object
 */
export function rgbaToCmyk(rgba: RGBA): CMYK {
  if (!isRgba(rgba)) throw new Error(notValidRgbaMessage('rgbaToCmyk', rgba))

  const { r, g, b } = rgba
  return rgbToCmyk({ r, g, b })
}

/**
 * Convert a rgba color object to a hsl color object removing the alpha value.
 * @param rgba color to convert to hsl
 * @returns hsl color object
 */
export function rgbaToHsl(rgba: RGBA): HSL {
  if (!isRgba(rgba)) throw new Error(notValidRgbaMessage('rgbaToHsl', rgba))

  const { r, g, b } = rgba
  return rgbToHsl({ r, g, b })
}

/**
 * Convert a rgba color object to a hsla color object.
 * @param rgba color to convert to hsla
 * @returns hsla color object
 */
export function rgbaToHsla(rgba: RGBA): HSLA {
  if (!isRgba(rgba)) throw new Error(notValidRgbaMessage('rgbaToHsla', rgba))

  return { ...rgbaToHsl(rgba), a: rgba.a }
}

/**
 * Convert a generic color to rgba.
 * @param color color to convert to rgba
 * @returns rgba color object
 */
export function colorToRgba(color: Color): RGBA {
  if (!isColor(color)) throw new Error(notValidRgbaMessage('colorToRgba', color))

  if (isHex(color)) return hexToRgba(color)
  else if (isRgb(color)) return rgbToRgba(color)
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
export function rgbaStringToObject(rgbaString: string): RGBA {
  // check short and long formats
  const isShortFormat = RGBA_REGEX.short.test(rgbaString)
  const isLongFormat = RGBA_REGEX.long.test(rgbaString)

  if (!isShortFormat && !isLongFormat)
    throw new Error(notValidRgbaStringMessage('rgbaStringToObject', rgbaString))

  // convert rgbString to short format: 'R, G, B'
  const rgbaStringCleanShortFormat = isShortFormat
    ? rgbaString
    : fromLongToShortRgbaFormat(rgbaString)
  return shortRgbaFormatToRgbaObject(rgbaStringCleanShortFormat)
}
/**
 * Covert a string in these two formats to a rgba object:
 *  - 255, 0, 255, 0.5 (short format) -> {r: 255, g: 0, b: 255, a: 0.5}
 *  - rgba(255, 0, 255, 0.5) (long format) -> {r: 255, g: 0, b: 255, a: 0.5}.
 * @param rgbaString rgba string
 * @returns rgba object
 * @deprecated since version 1.3.0, use `rgbaStringToObject` instead
 */
export function rgbaString2Object(rgbaString: string): RGBA {
  return obsolete(
    rgbaStringToObject,
    'rgbaString2Object',
    'rgbaStringToObject',
    DEPRECATE_VERSION_2,
    DELETE_VERSION_2,
    arguments
  )
}

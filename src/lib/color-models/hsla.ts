import { HSL, RGB, CMYK, HEX, HSLA, RGBA, Color } from '../../types/types'
import { isCmyk, isColor, isHex, isHsl, isHsla, isRgb, isRgba } from '../../types/isType'
import { hsl2cmyk, hsl2hex, hsl2rgb, hslToHsla } from './hsl'
import { alphaToHex } from '../../utils/hex-utils'
import { hexToHsla } from './hex'
import { rgbToHsla } from './rgb'
import { rgbaToHsla } from './rgba'
import { cmykToHsla } from './cmyk'
import { HSLA_REGEX } from '../../constants/regex'
import { fromLongToShortFormat, shortHslaFormatToHslaObject } from '../../utils/hsla-utils'

/**
 * Convert a hsla object to hex long format #RRGGBBAA.
 * @param hsla color to convert to hex
 * @returns hex color string
 */
export function hslaToHex(hsla: HSLA): HEX {
  if (!isHsla(hsla)) throw new Error(`${hsla} is not a hsla color.`)

  const { h, s, l, a } = hsla
  const hex = hsl2hex({ h, s, l })
  return `${hex}${alphaToHex(a)}`
}

/**
 * Convert a hsla object to and rgb color object.
 * @param hsla color to convert to rgba
 * @returns rgb color object
 */
export function hslaToRgb(hsla: HSLA): RGB {
  if (!isHsla(hsla)) throw new Error(`${hsla} is not a hsla color.`)

  const { h, s, l } = hsla
  return hsl2rgb({ h, s, l })
}

/**
 * Convert a hsla object to and rgba color object.
 * @param hsla color to convert to rgba
 * @returns rgba color object
 */
export function hslaToRgba(hsla: HSLA): RGBA {
  if (!isHsla(hsla)) throw new Error(`${hsla} is not a hsla color.`)

  const { h, s, l, a } = hsla
  const rgb = hsl2rgb({ h, s, l })
  return { ...rgb, a }
}

/**
 * Convert a hsla object to and hsl color object.
 * @param hsla color to convert to hsl
 * @returns hsl color object
 */
export function hslaToHsl(hsla: HSLA): HSL {
  if (!isHsla(hsla)) throw new Error(`${hsla} is not a hsla color.`)

  const { h, s, l, a } = hsla
  return { h, s, l }
}

/**
 * Convert a hsla object to and cmyk color object.
 * It ignores opacity because cmyk doens't support it.
 * @param hsla color to convert to cmyk
 * @returns cmyk color object
 */
export function hslaToCmyk(hsla: HSLA): CMYK {
  if (!isHsla(hsla)) throw new Error(`${hsla} is not a hsla color.`)

  const { h, s, l } = hsla
  return hsl2cmyk({ h, s, l })
}

/**
 * Convert a generic color to hsla.
 * @param color color to convert to hsla
 * @returns hsla color object
 */
export function colorToHsla(color: Color): HSLA {
  if (!isColor(color)) throw new Error(`${color} is not a valid color format.`)

  if (isHex(color)) return hexToHsla(color)
  else if (isRgb(color)) return rgbToHsla(color)
  else if (isRgba(color)) return rgbaToHsla(color)
  else if (isCmyk(color)) return cmykToHsla(color)
  else if (isHsl(color)) return hslToHsla(color)
  else return color // hsla
}

/**
 * Covert a string in these two formats to a hsla object:
 *  - 322, 79%, 52%, 0.5 (short format) -> { h: 322, s: 79, l: 52, a: 0.5 }
 *  - hsls(322, 79%, 52%, 0.5) (long format) -> { h: 322, s: 79, l: 52, a: 0.5 }.
 * @param hsls string to convert to hsla object
 * @returns hsla object
 */
export function hslaStringToObject(hslaString: string): HSLA {
  const isShortFormat = HSLA_REGEX.short.test(hslaString)
  const isLongFormat = HSLA_REGEX.long.test(hslaString)

  if (!isShortFormat && !isLongFormat)
    throw new Error(
      `${hslaString} is not a valid format. The accepted formats are 'h, s%, l%, a' and 'hsla(h, s%, l%, a)' with h in [0, 359], s, l in [0, 100] and a in [0, 1].`
    )

  const hslaStringCleanShortFormat = isShortFormat ? hslaString : fromLongToShortFormat(hslaString)
  return shortHslaFormatToHslaObject(hslaStringCleanShortFormat)
}

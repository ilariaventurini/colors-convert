import { HSL, RGB, CMYK, HEX, HSLA, RGBA } from '../../types/types'
import { isHsla } from '../../types/isType'
import { hsl2cmyk, hsl2hex, hsl2rgb } from './hsl'
import { alphaToHex } from '../../utils/hex-utils'

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

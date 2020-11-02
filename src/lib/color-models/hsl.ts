import { HSL, RGB, CMYK, HEX, RGBA, HSLA } from '../../types/types'
import { isHsl } from '../../types/isType'
import { applyFnToEachObjValue } from '../misc/utils'
import { round } from 'lodash'
import { rgb2hex, rgb2cmyk } from './rgb'
import { between } from '../../utils/math-utils'

/**
 * Convert an hsl object to hex.
 * @param hsl color to convert to hex
 * @returns hex color
 */
export function hsl2hex(hsl: HSL): HEX {
  if (!isHsl(hsl)) throw new Error(`${hsl} is not a hsl color.`)

  const rgb = hsl2rgb(hsl)
  return rgb2hex(rgb)
}

/**
 * Convert an hsl object to rgb color object.
 * @param hsl color to convert to rgb color object
 * @returns rgb color object
 */
export function hsl2rgb(hsl: HSL): RGB {
  if (!isHsl(hsl)) throw new Error(`${hsl} is not a hsl color.`)

  const { h, s, l } = hsl
  // normalize values
  const s01 = s / 100
  const l01 = l / 100

  if (s01 === 0) {
    const l = l01 * 255
    return { r: l, g: l, b: l }
  }

  const angle = (h / 60) % 6
  const angleRangeIndex = Math.floor(angle)
  const f = angle - angleRangeIndex
  const chroma = s01 * (1 - Math.abs(2 * l01 - 1))
  const p = l01 + chroma / 2
  const q = l01 - chroma / 2
  const t = p - chroma * f
  const w = q + chroma * f

  let rgb01 = { r: 0, g: 0, b: 0 }
  if (angleRangeIndex === 0) {
    rgb01 = { r: p, g: w, b: q }
  } else if (angleRangeIndex === 1) {
    rgb01 = { r: t, g: p, b: q }
  } else if (angleRangeIndex === 2) {
    rgb01 = { r: q, g: p, b: w }
  } else if (angleRangeIndex === 3) {
    rgb01 = { r: q, g: t, b: p }
  } else if (angleRangeIndex === 4) {
    rgb01 = { r: w, g: q, b: p }
  } else {
    // angleRangeIndex === 5
    rgb01 = { r: p, g: q, b: t }
  }

  const rgb = applyFnToEachObjValue(rgb01, (c: number) => round(c * 255)) as RGB
  return rgb
}

/**
 * Convert an hsl object to rgba.
 * @param hsl color to convert to rgba
 * @param alpha opacity value in [0, 1]
 * @returns rgba object
 */
export function hslToRgba(hsl: HSL, alpha = 1): RGBA {
  if (!isHsl(hsl)) throw new Error(`${hsl} is not a hsl color.`)
  if (!between(alpha, [0, 1])) throw new Error(`${alpha} is not in the range [0, 1].`)

  const rgb = hsl2rgb(hsl)
  return { ...rgb, a: alpha }
}

/**
 * Convert an hsl object to cmyk.
 * @param hsl color to convert to cmyk
 * @returns cmyk object
 */
export function hsl2cmyk(hsl: HSL): CMYK {
  if (!isHsl(hsl)) {
    throw new Error(`${hsl} is not a hsl color.`)
  }

  const rgb = hsl2rgb(hsl)
  const cmyk = rgb2cmyk(rgb)
  return cmyk
}

/**
 * Convert an hsl object to hsla.
 * @param hsl color to convert to hsla
 * @param alpha opacity value in range [0, 1]
 * @returns hsla object
 */
export function hslToHsla(hsl: HSL, alpha = 1): HSLA {
  if (!isHsl(hsl)) throw new Error(`${hsl} is not a hsl color.`)
  if (!between(alpha, [0, 1])) throw new Error(`${alpha} is not in the range [0, 1].`)

  return { ...hsl, a: alpha }
}

/**
 * Covert a string in these two formats to an hsl object:
 *  - 322, 79%, 52% (short format) -> { h: 322, s: 79, l: 52 }
 *  - hsl(322, 79%, 52%) (long format) -> { h: 322, s: 79, l: 52 }.
 * @param hsl string to convert to hsl object
 * @returns hsl object
 */
export function hslString2Object(hslString: string): HSL {
  const errorMessage = `${hslString} is not a valid format. The accepted formats are 'h°, s%, l%' and 'hsl(h°, s%, l%)' with h in [0, 359] and s, l in [0, 100].`

  // check short and long formats
  const regexShortFormat = /^(([0-9]+)(\s)*,(\s)*([0-9]+%)(\s)*,(\s)*([0-9]+%))/gi
  const regexLongFormat = /^((hsl(\s)*\()(\s)*([0-9]+)(\s)*,(\s)*([0-9]+%)(\s)*,(\s)*([0-9]+%)(\s)*(\)))/gi
  const isShortFormat = regexShortFormat.test(hslString)
  const isLongFormat = regexLongFormat.test(hslString)

  if (!isShortFormat && !isLongFormat) {
    throw new Error(errorMessage)
  }

  const hslStringCleanShortFormat = isShortFormat ? hslString : fromLongToShortFormat(hslString)
  const hslObject = shortHslFormatToHslObject(hslStringCleanShortFormat)

  if (isHsl(hslObject)) {
    return hslObject
  } else {
    throw new Error(errorMessage)
  }
}

/**
 * Convert a string in format '322°, 79%, 52%' (short format) to an HSL object { h: 322, s: 79, l: 52 }.
 * @param hslString string to convert to HSL object
 * @returns HSL object
 */
function shortHslFormatToHslObject(hslString: string): HSL {
  // split by comma, remove white spaces, remove last char (except for h), convert to number
  const values = hslString.split(',').map((v, i) => {
    if (i === 0) return Number(v.trim())
    else return Number(v.trim().slice(0, -1))
  })
  return { h: values[0], s: values[1], l: values[2] }
}

/**
 * Convert a string in format 'hsl(0, 50, 20)' (long format) to '0, 50, 20' (short format).
 * @param hslStringLongFormat string to convert to short format
 * @returns hsl short format
 */
function fromLongToShortFormat(hslStringLongFormat: string): string {
  const hslStringShortFormat = hslStringLongFormat
    .replace('hsl', '')
    .replace('(', '')
    .replace(')', '')
  return hslStringShortFormat
}

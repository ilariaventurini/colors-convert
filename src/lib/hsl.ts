import { HSL, RGB, CMYK, HEX } from '../types/types'
import { isHsl } from '../types/isType'
import { applyFnToEachObjValue } from './utils'
import { round } from 'lodash'
import { rgb2hex, rgb2cmyk } from './rgb'

// Convert an hsl object to hex
export function hsl2hex(hsl: HSL): HEX {
  if (!isHsl(hsl)) {
    throw new Error(`${hsl} is not a hsl color.`)
  }

  const rgb = hsl2rgb(hsl)
  const hex = rgb2hex(rgb)
  return hex
}

// Convert an hsl object to rgb
export function hsl2rgb(hsl: HSL): RGB {
  if (!isHsl(hsl)) {
    throw new Error(`${hsl} is not a hsl color.`)
  }

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
  } else if (angleRangeIndex === 5) {
    rgb01 = { r: p, g: q, b: t }
  } else {
    throw new Error(`Error during conversion of hsl2rgb with ${hsl}.`)
  }

  const rgb = applyFnToEachObjValue(rgb01, (c: number) => round(c * 255)) as RGB

  return rgb
}

// Convert an hsl object to cmyk
export function hsl2cmyk(hsl: HSL): CMYK {
  if (!isHsl(hsl)) {
    throw new Error(`${hsl} is not a hsl color.`)
  }

  const rgb = hsl2rgb(hsl)
  const cmyk = rgb2cmyk(rgb)
  return cmyk
}

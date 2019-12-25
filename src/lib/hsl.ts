import { HSL, RGB, CMYK, HEX, RGBA } from '../types/types'
import { isHsl } from '../types/isType'
import { applyFnToEachObjValue, between, betweenMaxNotIncluded } from './utils'
import { round } from 'lodash'

// TODO: implement it
// Convert an hsl object to hex
export const hsl2hex = (hsl: HSL): HEX => {
  return '#FFFFFF'
}


// Convert an hsl object to rgb
export const hsl2rgb = (hsl: HSL): RGB => {
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

// TODO: implement it
// Convert an hsl object to rgba
export const hsl2rgba = (hsl: HSL): RGBA => {
  return { r: 0, g: 0, b: 0, a: 0 }
}

// TODO: implement it
// Convert an hsl object to cmyk
export const hsl2cmyk = (hsl: HSL): CMYK => {
  return { c: 0, m: 0, y: 0, k: 0 }
}

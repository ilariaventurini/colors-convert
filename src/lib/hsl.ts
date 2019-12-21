import { HSL, RGB, CMYK, HEX, RGBA } from '../types/types'
import { isHsl } from '../types/isType'
import { applyFnToEachObjValue, between, betweenMaxNotIncluded } from './utils'
import { round } from 'lodash'

// TODO: implement it
// Convert an hsl object to hex
export const hsl2hex = (hsl: HSL): HEX => {
  return '#FFFFFF'
}

// TODO: need a refactor
// Convert an hsl object to rgb
export const hsl2rgb = (hsl: HSL): RGB => {
  if (!isHsl(hsl)) {
    throw new Error(`${hsl} is not a hsl color.`)
  }

  const { h, s, l } = hsl
  // normalize values
  const h01 = h / 360
  const s01 = s / 100
  const l01 = l / 100

  if (s01 === 0) {
    return { r: l01 * 255, g: l01 * 255, b: l01 * 255 }
  }

  let t1
  let t2
  let t3
  let rgb
  let val


  if (l01 < 0.5) {
    t2 = l01 * (1 + s01)
  }
  else {
    t2 = l01 + s01 - l01 * s01
  }
  t1 = 2 * l01 - t2

  rgb = [0, 0, 0]
  for (var i = 0; i < 3; i++) {
    t3 = h01 + 1 / 3 * - (i - 1)
    if (t3 < 0) {
      t3++
    }
    else if (t3 > 1) {
      t3--
    }
    if (6 * t3 < 1) {
      val = t1 + (t2 - t1) * 6 * t3
    }
    else if (2 * t3 < 1) {
      val = t2
    }
    else if (3 * t3 < 2) {
      val = t1 + (t2 - t1) * (2 / 3 - t3) * 6
    }
    else {
      val = t1
    }

    rgb[i] = val * 255
  }

  return { r: round(rgb[0]), g: round(rgb[1]), b: round(rgb[2]) }
}

const hue2rgb = (p: number, q: number, t: number) => {
  if (t < 0) t += 1
  if (t > 1) t -= 1
  if (t < 1 / 6) return p + (q - p) * 6 * t
  if (t < 1 / 2) return q
  if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6
  return p
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
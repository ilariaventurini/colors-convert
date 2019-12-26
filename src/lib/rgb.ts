import { RGB, CMYK, HEX, HSL } from '../types/types'
import { isRgb } from '../types/isType'
import { applyFnToEachObjValue } from './utils'
import { round } from 'lodash'

// Convert an rgb object to hex
export const rgb2hex = (rgb: RGB): HEX => {
  if (!isRgb(rgb)) {
    throw new Error(`${rgb} is not a rgb color.`)
  }

  const { r, g, b } = rgb
  const hex = [r, g, b]
    .map(value => {
      const hex = value.toString(16)
      const paddedHex = hex.length === 1 ? `0${hex}` : hex
      return paddedHex
    })
    .join('')
  return `#${hex}`
}

// Convert an rgb to a cmyk
export const rgb2cmyk = (rgb: RGB): CMYK => {
  if (!isRgb(rgb)) {
    throw new Error(`${rgb} is not a rgb color.`)
  }

  const { r, g, b } = rgb

  // normalize r,g,b values (from 0-255 to 0-1)
  const r01 = r / 255
  const g01 = g / 255
  const b01 = b / 255

  if (r01 === 0 && g01 === 0 && b01 === 0) {
    return { c: 0, m: 0, y: 0, k: 100 }
  }

  const k = 1 - Math.max(r01, g01, b01)
  const c = (1 - r01 - k) / (1 - k)
  const m = (1 - g01 - k) / (1 - k)
  const y = (1 - b01 - k) / (1 - k)

  const roundedCmyk = applyFnToEachObjValue({ c, m, y, k }, (c: number) => round(c * 100)) as CMYK

  return roundedCmyk
}

// Convert an rgb object to hsl
export const rgb2hsl = (rgb: RGB): HSL => {
  const { r, g, b } = rgb

  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  const l = (max + min) / 2

  if (max === min) { // achromatic
    return { h: 0, s: 0, l: (l / 255) * 100 }
  }

  const chroma = max - min
  const s = Math.abs(chroma / (1 - Math.abs(2 * l - 1))) * 100 - 1

  let h
  switch (max) {
    case r:
      h = 60 * ((g - b) / chroma) + (g < b ? 360 : 0)
      break
    case g:
      h = 120 + 60 * (b - r) / chroma
      break
    case b:
      h = 240 + 60 * (r - g) / chroma
      break
  }

  const hsl = { h, s, l: (l / 255) * 100 }
  const hslRounded = applyFnToEachObjValue(hsl, (c: number) => round(c)) as HSL


  return hslRounded
}

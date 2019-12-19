import { CMYK, HEX, RGB } from '../types/types'
import { applyFnToEachObjValue } from './utils'
import { round } from 'lodash'
import { isCmyk } from '../types/isType'
import { rgb2hex } from './rgb'

// Convert a cmyk color to a rgb
export const cmyk2rgb = (cmyk: CMYK): RGB => {
  if (!isCmyk(cmyk)) {
    throw new Error(`${cmyk} is not a cmyk color.`)
  }

  const { c, m, y, k } = applyFnToEachObjValue(cmyk, (col: number) => col / 100) as CMYK
  const rgb01 = {
    r: 1 - Math.min(1, c * (1 - k) + k),
    g: 1 - Math.min(1, m * (1 - k) + k),
    b: 1 - Math.min(1, y * (1 - k) + k),
  }
  const rgb = applyFnToEachObjValue(rgb01, (col: number) => round(col * 255)) as RGB
  return rgb
}

// Convert a cmyk color to a hex
export const cmyk2hex = (cmyk: CMYK): HEX => {
  if (!isCmyk(cmyk)) {
    throw new Error(`${cmyk} is not a cmyk color.`)
  }

  const rgb = cmyk2rgb(cmyk)
  const hex = rgb2hex(rgb)
  return hex
}

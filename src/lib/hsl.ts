import { HSL, RGB, CMYK, HEX, RGBA } from '../types/types'
import { isHsl } from '../types/isType'
import { applyFnToEachObjValue } from './utils'
import { round } from 'lodash'

// Convert an hsl object to hex
export const hsl2hex = (hsl: HSL): HEX => {
  return '#FFFFFF'
}

// TODO: implement it
// Convert an hsl object to rgb
export const hsl2rgb = (hsl: HSL): RGB => {
  return { r: 0, g: 0, b: 0 }
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
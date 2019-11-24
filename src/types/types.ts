import { between, sameContent } from '../lib/utils'

export type HEX = string
export type RGB = { r: number; g: number; b: number }
export type RGBA = { r: number; g: number; b: number; a: number }
export type CMYK = { c: number; m: number; y: number; k: number }

export type COLOR = HEX | RGB | RGBA | CMYK

// Accept:
//  - long form: #FFFFFF
//  - short form: #FFF
//  - long form with opacity: #FFFFFFFF (white with opacity FF=1)
export function isHex(color: any): color is HEX {
  const reg = /^#([0-9A-F]{3}){1,2}([0-9A-F]{2})?$/i
  return reg.test(color)
}

export function isRgb(color: any): color is RGB {
  const keys = Object.keys(color)
  if (keys.length !== 3) return false
  if (!sameContent(keys, ['r', 'g', 'b'])) return false
  const isValid = (value: any) => typeof value === 'number' && between(value, [0, 255])
  const r = isValid(color.r)
  const g = isValid(color.g)
  const b = isValid(color.b)
  return r && g && b
}

// TODO: add support for values in [0, 100]%
// TODO: accept also rgba without a, consider it 1 as default
export function isRgba(color: any): color is RGBA {
  const keys = Object.keys(color)
  if (keys.length !== 4) return false
  if (!sameContent(keys, ['r', 'g', 'b', 'a'])) return false
  const isValid = (value: any) => typeof value === 'number' && between(value, [0, 255])
  const r = isValid(color.r)
  const g = isValid(color.g)
  const b = isValid(color.b)
  const a = typeof color.a === 'number' && between(color.a, [0, 1])
  return r && g && b && a
}

export function isCmyk(color: any): color is CMYK {
  const keys = Object.keys(color)
  if (keys.length !== 4) return false
  if (!sameContent(keys, ['c', 'm', 'y', 'k'])) return false
  const isValid = (value: any) => typeof value === 'number' && between(value, [0, 100])
  const c = isValid(color.c)
  const m = isValid(color.m)
  const y = isValid(color.y)
  const k = isValid(color.k)
  return c && m && y && k
}

export function isColor(color: any): color is COLOR {
  return isHex(color) || isRgb(color) || isRgba(color) || isCmyk(color)
}

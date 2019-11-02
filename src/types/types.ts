import { between, sameContent } from '../lib/utils'

export type HEX = string
export type RGB = { r: number, g: number, b: number }

export type COLOR = HEX | RGB

export function isHex(color: any): color is HEX {
  const reg = /^#([0-9A-Fa-f]{3}){1,2}$/
  return reg.test(color)
}

export function isRgb(color: any): color is RGB {
  const keys = Object.keys(color)
  if (keys.length !== 3) return false
  if (!sameContent(keys, ['r', 'g', 'b'])) return false
  const isValid = (value: any) => typeof value === "number" && between(value, [0, 255])
  const r = isValid(color.r)
  const g = isValid(color.g)
  const b = isValid(color.b)
  return r && g && b
}

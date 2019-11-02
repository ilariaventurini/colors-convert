export type HEX = string;

export type COLOR = HEX

export function isHex(color: any): color is HEX {
  const reg = /^#([0-9A-Fa-f]{3}){1,2}$/
  return reg.test(color)
}
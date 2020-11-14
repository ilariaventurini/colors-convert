import { CMYK, Color, HSL, HSLA, RGB, RGBA } from '../lib/types/types'

////////////////////////////////////////////////////////
// hex
////////////////////////////////////////////////////////

export function notValidHexMessage(functionName: string, hex: string) {
  return `${functionName}: ${hex} is not a valid hex color.`
}

////////////////////////////////////////////////////////
// rgb
////////////////////////////////////////////////////////

export function notValidRgbMessage(functionName: string, rgb: RGB) {
  return `${functionName}: ${JSON.stringify(rgb)} is not a valid rgb color object.`
}

export function notValidRgbStringMessage(functionName: string, rgb: string) {
  return `${functionName}: ${rgb} is not a valid format. The accepted formats are 'r, g, b' and 'rgb(r, g, b)' with r, g, b in [0, 255].`
}

////////////////////////////////////////////////////////
// rgba
////////////////////////////////////////////////////////

export function notValidRgbaMessage(functionName: string, rgba: RGBA) {
  return `${functionName}: ${JSON.stringify(rgba)} is not a valid rgba color object.`
}

export function notValidRgbaStringMessage(functionName: string, rgba: string) {
  return `${functionName}: ${rgba} is not a valid format. The accepted formats are 'r, g, b, a' and 'rgba(r, g, b, a)' with r, g, b in [0, 255] and a in [0, 1].`
}

////////////////////////////////////////////////////////
// hsl
////////////////////////////////////////////////////////

export function notValidHslMessage(functionName: string, hsl: HSL) {
  return `${functionName}: ${JSON.stringify(hsl)} is not a valid hsl color object.`
}

export function notValidHslStringMessage(functionName: string, hsl: string) {
  return `${functionName}: ${hsl} is not a valid format. The accepted formats are 'h, s%, l%' and 'hsl(h, s%, l%)' with h in [0, 359] and s, l in [0, 100].`
}

////////////////////////////////////////////////////////
// hsla
////////////////////////////////////////////////////////

export function notValidHslaMessage(functionName: string, hsla: HSLA) {
  return `${functionName}: ${JSON.stringify(hsla)} is not a valid hsla color object.`
}

export function notValidHslaStringMessage(functionName: string, hsla: string) {
  return `${functionName}: ${hsla} is not a valid format. The accepted formats are 'h, s%, l%, a' and 'hsla(h, s%, l%, a)' with h in [0, 359], s, l in [0, 100] and a in [0, 1].`
}

////////////////////////////////////////////////////////
// cmyk
////////////////////////////////////////////////////////

export function notValidCmykMessage(functionName: string, cmyk: CMYK) {
  return `${functionName}: ${JSON.stringify(cmyk)} is not a valid cmyk color object.`
}

export function notValidCmykStringMessage(functionName: string, cmyk: string) {
  return `${functionName}: ${cmyk} is not a valid format. The accepted formats are 'c, m, y, k' and 'cmyk(c, m, y, k)' with c, m, y, k in [0, 100].`
}

////////////////////////////////////////////////////////
// all
////////////////////////////////////////////////////////

export function notValidAlphaValueMessage(functionName: string, alpha: number) {
  return `${functionName}: ${alpha} is not in range [0, 1].`
}

export function notValidColorMessage(functionName: string, color: Color) {
  if (typeof color === 'string') return `${functionName}: ${color} is not a valid color.`
  else return `${functionName}: ${JSON.stringify(color)} is not a valid color.`
}

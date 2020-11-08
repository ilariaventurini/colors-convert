export type HEX = string

/**
 * Rgb interface.
 */
export interface RGB {
  /** red */
  r: number
  /** green */
  g: number
  /** blue */
  b: number
} // red green blue

/**
 * Rgba interface.
 */
export interface RGBA {
  r: number
  g: number
  b: number
  a: number
} // red green blue alpha

export interface CMYK {
  c: number
  m: number
  y: number
  k: number
} // cyan magenta yellow black

export interface HSL {
  h: number
  s: number
  l: number
} // hue saturation lightness

export interface HSLA {
  h: number
  s: number
  l: number
  a: number
} // hue saturation lightness alpha

export type Color = HEX | RGB | RGBA | CMYK | HSL | HSLA

export type ColorFormat = 'hex' | 'rgb' | 'rgba' | 'cmyk' | 'hsl' | 'hsla'

export interface ColorName {
  name: string
  hex: HEX
  rgb: RGB
}

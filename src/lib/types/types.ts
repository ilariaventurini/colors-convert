/**
 * Hex type, basically a string.
 * @private
 */
export type HEX = string

/**
 * Rgb interface.
 * @typedef RGB
 * @property RGB.r - red
 * @property RGB.g - green
 * @property RGB.b - blue
 * @private
 */
export interface RGB {
  /** red */
  r: number
  /** green */
  g: number
  /** blue */
  b: number
}

/**
 * Rgba interface.
 * @typedef RGBA
 * @property RGBA.r - red
 * @property RGBA.g - green
 * @property RGBA.b - blue
 * @property RGBA.a - alpha
 * @private
 */
export interface RGBA {
  /** red */
  r: number
  /** green */
  g: number
  /** blue */
  b: number
  /** alpha */
  a: number
}

/**
 * Cmyk interface.
 * @typedef CMYK
 * @property CMYK.c - cyan
 * @property CMYK.m - magenta
 * @property CMYK.y - yellow
 * @property CMYK.k - key (black)
 * @private
 */
export interface CMYK {
  /** cyan */
  c: number
  /** magenta */
  m: number
  /** yellow */
  y: number
  /** key (black) */
  k: number
}

/**
 * Hsl interface.
 * @typedef HSL
 * @property HSL.h - hue
 * @property HSL.s - saturation
 * @property HSL.l - lightness
 * @private
 */
export interface HSL {
  /** hue */
  h: number
  /** saturation */
  s: number
  /** lightness */
  l: number
}

/**
 * Hsla interface.
 * @typedef HSLA
 * @property HSLA.h - hue
 * @property HSLA.s - saturation
 * @property HSLA.l - lightness
 * @property HSLA.a - alpha
 * @private
 */
export interface HSLA {
  /** hue */
  h: number
  /** saturation */
  s: number
  /** lightness */
  l: number
  /** alpha */
  a: number
}

/**
 * Color type. A color should be HEX, RGB, RGBA, CMYK, HSL or HSLA.
 * @typedef Color
 * @private
 */
export type Color = HEX | RGB | RGBA | CMYK | HSL | HSLA

/**
 * ColorFormat type. A color format should be 'hex', 'rgb', 'rgba', 'cmyk', 'hsl' or 'hsla'.
 * @typedef ColorFormat
 * @private
 */
export type ColorFormat = 'hex' | 'rgb' | 'rgba' | 'cmyk' | 'hsl' | 'hsla'

/**
 * ColorName interface.
 * @typedef ColorName
 * @property ColorName.name - color name
 * @property ColorName.hex - color hex format
 * @property ColorName.rgb - color rgb format
 * @private
 */
export interface ColorName {
  name: string
  hex: HEX
  rgb: RGB
}

export type HEX = string
export type RGB = { r: number; g: number; b: number } // red green blue
export type RGBA = { r: number; g: number; b: number; a: number } // red green blue alpha
export type CMYK = { c: number; m: number; y: number; k: number } // cyan magenta yellow black
export type HSL = { h: number; s: number; l: number } // hue saturation lightness

export type Color = HEX | RGB | RGBA | CMYK | HSL

export type ColorFormat = 'hex' | 'rgb' | 'rgba' | 'cmyk' | 'hsl'

export type ColorName = string

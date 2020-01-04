export type HEX = string
export type RGB = { r: number; g: number; b: number }
export type RGBA = { r: number; g: number; b: number; a: number }
export type CMYK = { c: number; m: number; y: number; k: number }
export type HSL = { h: number; s: number; l: number } // hue saturation lightness

export type Color = HEX | RGB | RGBA | CMYK | HSL

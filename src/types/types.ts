export type HEX = string
export interface RGB { r: number; g: number; b: number } // red green blue
export interface RGBA { r: number; g: number; b: number; a: number } // red green blue alpha
export interface CMYK { c: number; m: number; y: number; k: number } // cyan magenta yellow black
export interface HSL { h: number; s: number; l: number } // hue saturation lightness

export type Color = HEX | RGB | RGBA | CMYK | HSL

export type ColorFormat = 'hex' | 'rgb' | 'rgba' | 'cmyk' | 'hsl'

export type ColorName = string

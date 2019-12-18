import { COLOR, HEX, RGB, RGBA, CMYK, isHex, isRgb, isRgba, isCmyk, isColor } from '../types/types'
import { toUpper, round } from 'lodash'
import { between, applyFnToEachObjValue } from '../lib/utils'

// Convert a color to a string format
export const color2string = (color: COLOR): string => {
  if (!isColor(color)) {
    throw new Error(`${color} is not a color.`)
  }

  if (isHex(color)) {
    return toUpper(color)
  } else if (isRgb(color)) {
    return `${color.r}, ${color.g}, ${color.b}`
  } else if (isRgba(color)) {
    return `${color.r}, ${color.g}, ${color.b}, ${color.a}`
  } else if (isCmyk(color)) {
    return `${color.c}%, ${color.m}%, ${color.y}%, ${color.k}%`
  } else {
    throw new Error(`${color} is not a valid type of color.`)
  }
}

// Convert a color to a string format usable in CSS
export const color2cssString = (color: COLOR): string => {
  if (!isColor(color)) {
    throw new Error(`${color} is not a color.`)
  }

  if (isHex(color)) {
    return toUpper(color)
  } else if (isRgb(color)) {
    return `rgb(${color.r}, ${color.g}, ${color.b})`
  } else if (isRgba(color)) {
    return `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`
  } else if (isCmyk(color)) {
    return `cmyk(${color.c}%, ${color.m}%, ${color.y}%, ${color.k}%)`
  } else {
    throw new Error(`${color} is not a valid type of color.`)
  }
}

// Convert an hex to a rgb or rgba color (depeds on hex format)
export const hex2rgbOrRgba = (hex: HEX): RGB | RGBA => {
  if (!isHex(hex)) {
    throw new Error(`${hex} is not a hex color.`)
  }

  const RGB_HEX = /^#?(?:([0-9a-f]{3})|([0-9a-f]{6})([0-9a-f]{2})?)$/i
  // short and long are or undefined or the original_hex without #
  const [original_hex, short, long, opacity] = hex.match(RGB_HEX) || []
  if (long) {
    const value = Number.parseInt(long, 16)
    const rgb = { r: value >> 16, g: (value >> 8) & 0xff, b: value & 0xff }
    if (opacity) {
      const alpha = round(parseInt(opacity, 16) / 255, 2)
      return { ...rgb, a: alpha }
    } else {
      return rgb
    }
  } else {
    // expand short form (e.g. "03F") to long form (e.g. "0033FF")
    const [r, g, b] = Array.from(short, s => Number.parseInt(s, 16)).map(n => (n << 4) | n)
    return { r, g, b }
  }
}

// Convert an hex to a rgba object
export const hex2rgba = (hex: HEX, alpha = 1): RGBA => {
  if (!isHex(hex)) {
    throw new Error(`${hex} is not a hex color.`)
  }

  if (!between(alpha, [0, 1])) {
    throw new Error(`${alpha} is not in the range [0, 1].`)
  }

  const rgbOrRgba = hex2rgbOrRgba(hex)
  if (isRgb(rgbOrRgba)) {
    return { ...rgbOrRgba, a: alpha }
  } else if (isRgba(rgbOrRgba)) {
    return rgbOrRgba
  } else {
    throw new Error(`${rgbOrRgba} is neither RGB nor RGBA.`)
  }
}

// Convert an rgb object to hex
export const rgb2hex = (rgb: RGB): HEX => {
  if (!isRgb(rgb)) {
    throw new Error(`${rgb} is not a rgb color.`)
  }

  const { r, g, b } = rgb
  const hex = [r, g, b]
    .map(value => {
      const hex = value.toString(16)
      const paddedHex = hex.length === 1 ? `0${hex}` : hex
      return paddedHex
    })
    .join('')
  return `#${hex}`
}

// Convert an hex to another hex with the given alpha
export const hex2hexWithAlpha = (hex: HEX, alpha: number): HEX => {
  if (!isHex(hex)) {
    throw new Error(`${hex} is not a hex color.`)
  }

  if (!between(alpha, [0, 1])) {
    throw new Error(`${alpha} is not in the range [0, 1].`)
  }

  const alpha255 = Math.round(alpha * 255)
  const alphaHex = alpha255.toString(16)
  const alphaHexPadded = alphaHex.length === 1 ? `0${alphaHex}` : alphaHex
  return `${hex}${alphaHexPadded}`
}

// Convert an rgb to a cmyk
export const rgb2cmyk = (rgb: RGB): CMYK => {
  if (!isRgb(rgb)) {
    throw new Error(`${rgb} is not a rgb color.`)
  }

  const { r, g, b } = rgb

  // normalize r,g,b values (from 0-255 to 0-1)
  const r01 = r / 255
  const g01 = g / 255
  const b01 = b / 255

  if (r01 === 0 && g01 === 0 && b01 === 0) {
    return { c: 0, m: 0, y: 0, k: 100 }
  }

  const k = 1 - Math.max(r01, g01, b01)
  const c = (1 - r01 - k) / (1 - k)
  const m = (1 - g01 - k) / (1 - k)
  const y = (1 - b01 - k) / (1 - k)

  const roundedCmyk = applyFnToEachObjValue({ c, m, y, k }, (c: number) => round(c * 100)) as CMYK

  return roundedCmyk
}

// Convert an hex to a cmyk. If hex is in the long format (e.g. #000000FF) it removes the last two chars because cmyk doens't support opacity
export const hex2cmyk = (hex: HEX): CMYK => {
  if (!isHex(hex)) {
    throw new Error(`${hex} is not a hex color.`)
  }

  // remove opacity chars
  const hexShortFormat = hex.substring(0, 7)
  const rgb = hex2rgbOrRgba(hexShortFormat)
  const cmyk = rgb2cmyk(rgb)

  return cmyk
}

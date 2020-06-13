export { isHex, isRgb, isRgba, isCmyk, isHsl, isColor } from './types/isType'
export { color2string, color2cssString } from './lib/color'
export { hex2rgbOrRgba, hex2rgba, hex2hexWithAlpha, hex2cmyk, hex2hsl } from './lib/hex'
export {
  rgb2hex,
  rgb2cmyk,
  rgb2hsl,
  rgba2rgb,
  rgb2rgba,
  color2rgb,
  rgbString2Object,
} from './lib/rgb'
export { cmyk2rgb, cmyk2hex, cmyk2hsl } from './lib/cmyk'
export { hsl2hex, hsl2rgb, hsl2cmyk, hslString2Object } from './lib/hsl'
export { getRandomColor } from './lib/random'
export { mix } from './lib/mix'
export { name } from './lib/name'

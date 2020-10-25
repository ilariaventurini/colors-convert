export { isHex, isRgb, isRgba, isCmyk, isHsl, isColor } from './types/isType'
export { color2string, color2cssString } from './lib/color-models/color'
export {
  hex2rgbOrRgba,
  hex2rgb,
  hex2rgba,
  hex2hexWithAlpha,
  hex2cmyk,
  hex2hsl,
  shortToLongHex,
} from './lib/color-models/hex'
export {
  rgb2hex,
  rgb2cmyk,
  rgb2hsl,
  rgba2rgb,
  rgb2rgba,
  color2rgb,
  rgbString2Object,
  rgbaString2Object,
} from './lib/color-models/rgb'
export { cmyk2rgb, cmyk2hex, cmyk2hsl, cmykString2Object } from './lib/color-models/cmyk'
export { hsl2hex, hsl2rgb, hsl2cmyk, hslString2Object } from './lib/color-models/hsl'
export { getRandomColor } from './lib/misc/random'
export { mix } from './lib/misc/mix'
export { name } from './lib/color-names/name'

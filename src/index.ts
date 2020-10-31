export { isHex, isRgb, isRgba, isCmyk, isHsl, isHsla, isColor } from './types/isType'
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
  rgb2rgba,
  color2rgb,
  rgbString2Object,
} from './lib/color-models/rgb'
export { rgba2rgb, rgbaString2Object } from './lib/color-models/rgba'
export { cmyk2rgb, cmyk2hex, cmyk2hsl, cmykString2Object } from './lib/color-models/cmyk'
export { hsl2hex, hsl2rgb, hsl2cmyk, hslString2Object } from './lib/color-models/hsl'
export { hslaToHex, hslaToRgb, hslaToRgba, hslaToHsl, hslaToCmyk } from './lib/color-models/hsla'
export { getRandomColor } from './lib/misc/random'
export { mix } from './lib/misc/mix'
export { name } from './lib/color-names/name'

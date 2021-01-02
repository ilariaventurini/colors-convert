export { isHex, isRgb, isRgba, isCmyk, isHsl, isHsla, isColor } from './lib/types/isType'
export { color2string, color2cssString } from './lib/color-models/color'
export {
  hex2rgbOrRgba,
  hexToRgbOrRgba,
  hexToRgb,
  hex2rgba,
  hexToRgba,
  hex2hexWithAlpha,
  hexToHexWithAlpha,
  hex2cmyk,
  hexToCmyk,
  hex2hsl,
  hexToHsl,
  hexToHsla,
  shortToLongHex,
  colorToHex,
} from './lib/color-models/hex'
export {
  rgb2hex,
  rgbToHex,
  rgb2cmyk,
  rgbToCmyk,
  rgb2hsl,
  rgbToHsl,
  rgbToHsla,
  rgb2rgba,
  rgbToRgba,
  color2rgb,
  colorToRgb,
  rgbString2Object,
  rgbStringToObject,
} from './lib/color-models/rgb'
export {
  rgbaToHex,
  rgba2rgb,
  rgbaToRgb,
  rgbaToCmyk,
  rgbaToHsl,
  rgbaToHsla,
  colorToRgba,
  rgbaString2Object,
  rgbaStringToObject,
} from './lib/color-models/rgba'
export {
  cmyk2hex,
  cmykToHex,
  cmyk2rgb,
  cmykToRgb,
  cmykToRgba,
  cmyk2hsl,
  cmykToHsl,
  cmykToHsla,
  colorToCmyk,
  cmykString2Object,
  cmykStringToObject,
} from './lib/color-models/cmyk'
export {
  hsl2hex,
  hslToHex,
  hsl2rgb,
  hslToRgb,
  hslToRgba,
  hsl2cmyk,
  hslToCmyk,
  hslToHsla,
  colorToHsl,
  hslString2Object,
  hslStringToObject,
} from './lib/color-models/hsl'
export {
  hslaToHex,
  hslaToRgb,
  hslaToRgba,
  hslaToHsl,
  hslaToCmyk,
  colorToHsla,
  hslaStringToObject,
} from './lib/color-models/hsla'
export { getRandomColor } from './lib/misc/random'
export { mix } from './lib/misc/mix'
export { name } from './lib/color-names/name'

import { isHex, isRgb, isRgba, isCmyk, isColor, color2string, color2cssString, hex2rgb } from '../index'
import { colors } from './colors'

////////////////////////////////////////////////////////
// isHex
////////////////////////////////////////////////////////

// test valid hex
const HEX_VALID = ['#000000', '#FFFFFF', '#efefef', '#eFeeFa', '#FFF', '#0a0A00', '#000', '#EfE']
HEX_VALID.forEach(color => test(color, () => expect(isHex(color)).toBe(true)))

// test not valid hex
const HEX_NOT_VALID = ['', '#', '#0', '#00', '#0000', '0a0A00', '#000ZGF']
HEX_NOT_VALID.forEach(color => test(color, () => expect(isHex(color)).toBe(false)))

////////////////////////////////////////////////////////
// isRgb
////////////////////////////////////////////////////////

// test valid rgb
const RGB_VALID = [
  { r: 0, g: 0, b: 0 },
  { r: 255, g: 255, b: 255 },
  { r: 10, g: 255, b: 100 },
  { r: 2, g: 2, b: 2 },
]
RGB_VALID.forEach(color => test(JSON.stringify(color), () => expect(isRgb(color)).toBe(true)))

// test not valid rgb
const RGB_NOT_VALID = [
  {},
  { r: 0 },
  { b: 0 },
  { r: 0, g: 0, b: 0, a: 1 },
  { r: -1, g: 0, b: 0 },
  { r: 300, g: 0, b: 0 },
  { r: 'twenty', g: 0, b: 0 },
]
RGB_NOT_VALID.forEach(color => test(JSON.stringify(color), () => expect(isRgb(color)).toBe(false)))

////////////////////////////////////////////////////////
// isRgba
////////////////////////////////////////////////////////

// test valid rgba
const RGBA_VALID = [
  { r: 0, g: 0, b: 0, a: 0 },
  { r: 255, g: 255, b: 255, a: 1 },
  { r: 10, g: 255, b: 100, a: 0.5 },
  { r: 2, g: 2, b: 2, a: 1 },
]
RGBA_VALID.forEach(color => test(JSON.stringify(color), () => expect(isRgba(color)).toBe(true)))

// test not valid rgba
const RGBA_NOT_VALID = [
  {},
  { r: 0 },
  { b: 0 },
  { r: 0, g: 0, b: 0, a: 0, o: 3 },
  { r: -1, g: 0, b: 0, a: 0 },
  { r: 300, g: 0, b: 0, a: 0 },
  { r: 'twenty', g: 0, b: 0, a: 0 },
]
RGBA_NOT_VALID.forEach(color =>
  test(JSON.stringify(color), () => expect(isRgba(color)).toBe(false))
)

////////////////////////////////////////////////////////
// isCmyk
////////////////////////////////////////////////////////

// test valid cmyk
const CMYK_VALID = [
  { c: 0, m: 0, y: 0, k: 0 },
  { c: 100, m: 100, y: 100, k: 1 },
  { c: 10, m: 100, y: 100, k: 50 },
  { c: 2, m: 2, y: 2, k: 100 },
]
CMYK_VALID.forEach(color => test(JSON.stringify(color), () => expect(isCmyk(color)).toBe(true)))

// test not valid cmyk
const CMYK_NOT_VALID = [
  {},
  { c: 0 },
  { y: 0 },
  { c: 0, m: 0, y: 0, k: 0, o: 3 },
  { c: -1, m: 0, y: 0, k: 0 },
  { c: 300, m: 0, y: 0, k: 0 },
  { c: 'twenty', m: 0, y: 0, k: 0 },
]
CMYK_NOT_VALID.forEach(color =>
  test(JSON.stringify(color), () => expect(isCmyk(color)).toBe(false))
)

////////////////////////////////////////////////////////
// isColor
////////////////////////////////////////////////////////
// TODO: add tests

////////////////////////////////////////////////////////
// color2string
////////////////////////////////////////////////////////

const STRING_VALID = [
  '#ffffff',
  { r: 0, g: 0, b: 0 },
  { r: 0, g: 0, b: 0, a: 0 },
  { c: 0, m: 0, y: 0, k: 0 },
]
const STRING_VALID_CHECK = ['#FFFFFF', `0, 0, 0`, `0, 0, 0, 0`, `0%, 0%, 0%, 0%`]
STRING_VALID.forEach((color, i) =>
  test(JSON.stringify(color), () => expect(color2string(color)).toBe(STRING_VALID_CHECK[i]))
)

////////////////////////////////////////////////////////
// color2cssString
////////////////////////////////////////////////////////

const STRING_CSS_VALID = [
  '#ffffff',
  { r: 0, g: 0, b: 0 },
  { r: 0, g: 0, b: 0, a: 0 },
  { c: 0, m: 0, y: 0, k: 0 },
]
const STRING_CSS_VALID_CHECK = [
  '#FFFFFF',
  `rgb(0, 0, 0)`,
  `rgba(0, 0, 0, 0)`,
  `cmyk(0%, 0%, 0%, 0%)`,
]
STRING_CSS_VALID.forEach((color, i) =>
  test(JSON.stringify(color), () => expect(color2cssString(color)).toBe(STRING_CSS_VALID_CHECK[i]))
)

////////////////////////////////////////////////////////
// hex2rgb
////////////////////////////////////////////////////////

colors.forEach(({ name, hex, rgb }) => test(`hex2rgb: ${name} (${hex})`, () => expect(hex2rgb(hex)).toStrictEqual(rgb)))

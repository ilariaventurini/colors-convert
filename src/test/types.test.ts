import { isHex, isRgb, isRgba, isCmyk } from '../index'
import { colors } from './colors'

////////////////////////////////////////////////////////
// isHex
////////////////////////////////////////////////////////

// test valid hex
colors.forEach(({ name, hex, opacity }) =>
  test(`isHex: ${name} (${hex}, ${opacity})`, () => expect(isHex(hex)).toBe(true))
)

// test not valid hex
const HEX_NOT_VALID = ['', '#', '#0', '#00', '#0000', '0a0A00', '#000ZGF', '#FFFFFFGG']
HEX_NOT_VALID.forEach(color => test(color, () => expect(isHex(color)).toBe(false)))

////////////////////////////////////////////////////////
// isRgb
////////////////////////////////////////////////////////

// test valid rgb
colors.forEach(({ name, rgb }) =>
  test(`isHex: ${name} (${rgb})`, () => expect(isRgb(rgb)).toBe(true))
)

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
colors.forEach(({ name, rgba }) =>
  test(`isHex: ${name} (${rgba})`, () => expect(isRgba(rgba)).toBe(true))
)

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
colors.forEach(({ name, cmyk }) =>
  test(`isHex: ${name} (${cmyk})`, () => expect(isCmyk(cmyk)).toBe(true))
)

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

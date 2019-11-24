import { color2string, color2cssString, hex2rgbOrRgba, hex2rgba, rgb2hex, hex2hexWithAlpha } from '../index'
import { colors } from './colors'

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
// hex2rgbOrRgba
////////////////////////////////////////////////////////

colors.forEach(({ name, hex, rgb, rgba }) => test(`hex2rgbOrRgba: ${name} (${hex})`, () => {
  if (hex.length > 7)
    expect(hex2rgbOrRgba(hex)).toStrictEqual(rgba)
  else expect(hex2rgbOrRgba(hex)).toStrictEqual(rgb)
}))

////////////////////////////////////////////////////////
// hex2rgba
////////////////////////////////////////////////////////

colors.forEach(({ name, hex, rgba, opacity }) => test(`hex2rgba: ${name} (${hex}, ${opacity})`, () => expect(hex2rgba(hex)).toStrictEqual(rgba)))

////////////////////////////////////////////////////////
// rgb2hex
////////////////////////////////////////////////////////

colors.filter(c => c.hex.length === 7).forEach(({ name, hex, rgb }) => test(`rgb2hex: ${name} (${hex})`, () => expect(rgb2hex(rgb)).toStrictEqual(hex)))

////////////////////////////////////////////////////////
// hex2hexWithAlpha
////////////////////////////////////////////////////////

colors.filter(c => c.hex.length === 9).forEach(({ name, hex, opacity }) => {
  const hexWithoutAlpha = hex.slice(0, 7)
  return test(`hex2hexWithAlpha: ${name} (${hexWithoutAlpha})`, () => expect(hex2hexWithAlpha(hexWithoutAlpha, opacity)).toStrictEqual(hex)
  )
})

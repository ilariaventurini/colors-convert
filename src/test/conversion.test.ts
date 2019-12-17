import {
  color2string,
  color2cssString,
  hex2rgbOrRgba,
  hex2rgba,
  rgb2hex,
  hex2hexWithAlpha,
} from '../index'

////////////////////////////////////////////////////////
// color2string
////////////////////////////////////////////////////////

test(`color2string`, () => {
  expect(color2string('#000000')).toBe('#000000')
  expect(color2string({ r: 0, g: 0, b: 0 })).toBe('0, 0, 0')
  expect(color2string({ r: 0, g: 0, b: 0, a: 0 })).toBe('0, 0, 0, 0')
  expect(color2string({ c: 0, m: 0, y: 0, k: 0 })).toBe('0%, 0%, 0%, 0%')
})

////////////////////////////////////////////////////////
// color2cssString
////////////////////////////////////////////////////////

test(`color2cssString`, () => {
  expect(color2cssString('#000000')).toBe('#000000')
  expect(color2cssString({ r: 0, g: 0, b: 0 })).toBe('rgb(0, 0, 0)')
  expect(color2cssString({ r: 0, g: 0, b: 0, a: 0 })).toBe('rgba(0, 0, 0, 0)')
  expect(color2cssString({ c: 0, m: 0, y: 0, k: 0 })).toBe('cmyk(0%, 0%, 0%, 0%)')
})

////////////////////////////////////////////////////////
// hex2rgbOrRgba
////////////////////////////////////////////////////////

test(`hex2rgbOrRgba`, () => {
  expect(hex2rgbOrRgba('#000000')).toStrictEqual({ r: 0, g: 0, b: 0 })
  expect(hex2rgbOrRgba('#00000000')).toStrictEqual({ r: 0, g: 0, b: 0, a: 0 })
})

////////////////////////////////////////////////////////
// hex2rgba
////////////////////////////////////////////////////////

test(`hex2rgba`, () => {
  expect(hex2rgba('#000000')).toStrictEqual({ r: 0, g: 0, b: 0, a: 1 })
  expect(hex2rgba('#00000000')).toStrictEqual({ r: 0, g: 0, b: 0, a: 0 })
  expect(hex2rgba('#000000', 0)).toStrictEqual({ r: 0, g: 0, b: 0, a: 0 })
  expect(hex2rgba('#000000', 1)).toStrictEqual({ r: 0, g: 0, b: 0, a: 1 })
  expect(hex2rgba('#000000', 0.5)).toStrictEqual({ r: 0, g: 0, b: 0, a: 0.5 })
  // expect(hex2rgba('#000000', 3)).toThrow(new Error('3 is not in the range [0, 1].'))
})

////////////////////////////////////////////////////////
// rgb2hex
////////////////////////////////////////////////////////

test(`rgb2hex`, () => {
  expect(rgb2hex({ r: 0, g: 0, b: 0 })).toBe('#000000')
  expect(rgb2hex({ r: 255, g: 255, b: 255 })).toBe('#ffffff')
})

////////////////////////////////////////////////////////
// hex2hexWithAlpha
////////////////////////////////////////////////////////

test(`hex2hexWithAlpha`, () => {
  expect(hex2hexWithAlpha('#000000', 0)).toBe('#00000000')
  expect(hex2hexWithAlpha('#000000', 1)).toBe('#000000ff')
  expect(hex2hexWithAlpha('#000', 1)).toBe('#000ff')
  // expect(hex2hexWithAlpha('#000000', 3)).toThrow(new Error('3 is not in the range [0, 1].'))
})

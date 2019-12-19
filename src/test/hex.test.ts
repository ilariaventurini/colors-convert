import { hex2rgbOrRgba, hex2rgba, hex2hexWithAlpha, hex2cmyk } from '../index'

////////////////////////////////////////////////////////
// hex2rgbOrRgba
////////////////////////////////////////////////////////

test(`hex2rgbOrRgba`, () => {
  expect(hex2rgbOrRgba('#000000')).toStrictEqual({ r: 0, g: 0, b: 0 })
  expect(hex2rgbOrRgba('#00000000')).toStrictEqual({ r: 0, g: 0, b: 0, a: 0 })
  // expect(hex2rgbOrRgba('')).toThrow(new Error(' is not a hex color.'))
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
  // expect(hex2rgba('')).toThrow(new Error(' is not a hex color.'))
  // expect(hex2rgba('#000000', 3)).toThrow(new Error('3 is not in the range [0, 1].'))
})

////////////////////////////////////////////////////////
// hex2hexWithAlpha
////////////////////////////////////////////////////////

test(`hex2hexWithAlpha`, () => {
  expect(hex2hexWithAlpha('#000000', 0)).toBe('#00000000')
  expect(hex2hexWithAlpha('#000000', 1)).toBe('#000000ff')
  expect(hex2hexWithAlpha('#000', 1)).toBe('#000ff')
  // expect(hex2hexWithAlpha('')).toThrow(new Error(' is not a hex color.'))
  // expect(hex2hexWithAlpha('#000000', 3)).toThrow(new Error('3 is not in the range [0, 1].'))
})

////////////////////////////////////////////////////////
// hex2cmyk
////////////////////////////////////////////////////////

test(`hex2cmyk`, () => {
  expect(hex2cmyk('#ffffff')).toStrictEqual({ c: 0, m: 0, y: 0, k: 0 })
  expect(hex2cmyk('#000000')).toStrictEqual({ c: 0, m: 0, y: 0, k: 100 })
  expect(hex2cmyk('#4287f5')).toStrictEqual({ c: 73, m: 45, y: 0, k: 4 })
  expect(hex2cmyk('#000')).toStrictEqual({ c: 0, m: 0, y: 0, k: 100 })
  expect(hex2cmyk('#00000000')).toStrictEqual({ c: 0, m: 0, y: 0, k: 100 })
  // expect(hex2cmyk('')).toThrow(new Error(' is not a hex color.'))
})

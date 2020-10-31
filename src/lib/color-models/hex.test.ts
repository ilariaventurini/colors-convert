import {
  hex2rgbOrRgba,
  hex2rgb,
  hex2rgba,
  hex2hexWithAlpha,
  hex2cmyk,
  hex2hsl,
  shortToLongHex,
} from '../../index'

////////////////////////////////////////////////////////
// hex2rgbOrRgba
////////////////////////////////////////////////////////

test(`hex2rgbOrRgba`, () => {
  expect(hex2rgbOrRgba('#000')).toStrictEqual({ r: 0, g: 0, b: 0 })
  expect(hex2rgbOrRgba('#000000')).toStrictEqual({ r: 0, g: 0, b: 0 })
  expect(hex2rgbOrRgba('#00000000')).toStrictEqual({ r: 0, g: 0, b: 0, a: 0 })
  expect(hex2rgbOrRgba('#FFFFFFCC')).toStrictEqual({ r: 255, g: 255, b: 255, a: 0.8 })
  expect(hex2rgbOrRgba('#FFFFFFD9')).toStrictEqual({ r: 255, g: 255, b: 255, a: 0.851 })
  expect(hex2rgbOrRgba('#FFFFFFDA')).toStrictEqual({ r: 255, g: 255, b: 255, a: 0.8549 })
  expect(hex2rgbOrRgba('#FFFFFFDB')).toStrictEqual({ r: 255, g: 255, b: 255, a: 0.8588 })

  expect(() => hex2rgbOrRgba('#')).toThrowError()
})

////////////////////////////////////////////////////////
// hex2rgb
////////////////////////////////////////////////////////

test(`hex2rgb`, () => {
  expect(hex2rgb('#000000')).toStrictEqual({ r: 0, g: 0, b: 0 })
  expect(hex2rgb('#00000000')).toStrictEqual({ r: 0, g: 0, b: 0 })

  expect(() => hex2rgb('#')).toThrowError()
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

  expect(() => hex2rgba('#', 1)).toThrowError()
  expect(() => hex2rgba('#000000', 10)).toThrowError()
})

////////////////////////////////////////////////////////
// hex2hexWithAlpha
////////////////////////////////////////////////////////

test(`hex2hexWithAlpha`, () => {
  expect(hex2hexWithAlpha('#000000', 0)).toBe('#00000000')
  expect(hex2hexWithAlpha('#000000', 1)).toBe('#000000FF')
  expect(hex2hexWithAlpha('#000', 1)).toBe('#000000FF')

  expect(() => hex2hexWithAlpha('#', 1)).toThrowError()
  expect(() => hex2hexWithAlpha('#000000', 10)).toThrowError()
})

////////////////////////////////////////////////////////
// hex2cmyk
////////////////////////////////////////////////////////

test(`hex2cmyk`, () => {
  expect(hex2cmyk('#FFFFFF')).toStrictEqual({ c: 0, m: 0, y: 0, k: 0 })
  expect(hex2cmyk('#000000')).toStrictEqual({ c: 0, m: 0, y: 0, k: 100 })
  expect(hex2cmyk('#4287F5')).toStrictEqual({ c: 73, m: 45, y: 0, k: 4 })
  expect(hex2cmyk('#000')).toStrictEqual({ c: 0, m: 0, y: 0, k: 100 })
  expect(hex2cmyk('#00000000')).toStrictEqual({ c: 0, m: 0, y: 0, k: 100 })

  expect(() => hex2cmyk('#')).toThrowError()
})

////////////////////////////////////////////////////////
// hex2hsl
////////////////////////////////////////////////////////

test(`hex2hsl`, () => {
  expect(hex2hsl('#000000')).toEqual({ h: 0, s: 0, l: 0 })
  expect(hex2hsl('#FFFFFF')).toEqual({ h: 0, s: 0, l: 100 })
  expect(hex2hsl('#F2B90D')).toEqual({ h: 45, s: 90, l: 50 })
  expect(hex2hsl('#F2F20D')).toEqual({ h: 60, s: 90, l: 50 })
  expect(hex2hsl('#CCF20D')).toEqual({ h: 70, s: 90, l: 50 })
  expect(hex2hsl('#0DF233')).toEqual({ h: 130, s: 90, l: 50 })
  expect(hex2hsl('#0DDFF2')).toEqual({ h: 185, s: 90, l: 50 })
  expect(hex2hsl('#590DF2')).toEqual({ h: 260, s: 90, l: 50 })
  expect(hex2hsl('#F20DCC')).toEqual({ h: 310, s: 90, l: 50 })
  expect(hex2hsl('#F20D11')).toEqual({ h: 359, s: 90, l: 50 })

  expect(() => hex2hsl('#')).toThrowError()
})

////////////////////////////////////////////////////////
// shortToLongHex
////////////////////////////////////////////////////////

test(`shortToLongHex`, () => {
  expect(shortToLongHex('#000')).toBe('#000000')
  expect(shortToLongHex('#09C')).toBe('#0099CC')
  expect(shortToLongHex('#000000')).toBe('#000000') // warn, it's ok

  expect(() => shortToLongHex('#')).toThrowError()
})

import { hex2rgbOrRgba, hex2rgba, hex2hexWithAlpha, hex2cmyk, hex2hsl } from '../index'

////////////////////////////////////////////////////////
// hex2rgbOrRgba
////////////////////////////////////////////////////////

test(`hex2rgbOrRgba`, () => {
  expect(hex2rgbOrRgba('#000000')).toStrictEqual({ r: 0, g: 0, b: 0 })
  expect(hex2rgbOrRgba('#00000000')).toStrictEqual({ r: 0, g: 0, b: 0, a: 0 })

  expect(() => hex2rgbOrRgba('#')).toThrowError()
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
  expect(hex2hexWithAlpha('#000000', 1)).toBe('#000000ff')
  expect(hex2hexWithAlpha('#000', 1)).toBe('#000ff')

  expect(() => hex2hexWithAlpha('#', 1)).toThrowError()
  expect(() => hex2hexWithAlpha('#000000', 10)).toThrowError()
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

  expect(() => hex2cmyk('#')).toThrowError()
})

////////////////////////////////////////////////////////
// hex2hsl
////////////////////////////////////////////////////////

test(`hex2hsl`, () => {
  expect(hex2hsl('#000000')).toEqual({ h: 0, s: 0, l: 0 })
  expect(hex2hsl('#ffffff')).toEqual({ h: 0, s: 0, l: 100 })
  expect(hex2hsl('#f2b90d')).toEqual({ h: 45, s: 90, l: 50 })
  expect(hex2hsl('#f2f20d')).toEqual({ h: 60, s: 90, l: 50 })
  expect(hex2hsl('#ccf20d')).toEqual({ h: 70, s: 90, l: 50 })
  expect(hex2hsl('#0df233')).toEqual({ h: 130, s: 90, l: 50 })
  expect(hex2hsl('#0ddff2')).toEqual({ h: 185, s: 90, l: 50 })
  expect(hex2hsl('#590df2')).toEqual({ h: 260, s: 90, l: 50 })
  expect(hex2hsl('#f20dcc')).toEqual({ h: 310, s: 90, l: 50 })
  expect(hex2hsl('#f20d11')).toEqual({ h: 359, s: 90, l: 50 })

  expect(() => hex2hsl('#')).toThrowError()
})

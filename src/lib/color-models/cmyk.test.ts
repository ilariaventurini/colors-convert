import {
  cmykToHex,
  cmykToRgb,
  cmykToRgba,
  cmykToHsl,
  cmykToHsla,
  colorToCmyk,
  cmykStringToObject,
} from '../../index'

////////////////////////////////////////////////////////
// cmykToHex
////////////////////////////////////////////////////////

test(`cmykToHex`, () => {
  expect(cmykToHex({ c: 0, m: 0, y: 0, k: 0 })).toStrictEqual('#FFFFFF')
  expect(cmykToHex({ c: 0, m: 0, y: 0, k: 100 })).toStrictEqual('#000000')
  expect(cmykToHex({ c: 73, m: 45, y: 0, k: 4 })).toStrictEqual('#4287F5')

  expect(() => cmykToHex({ c: -1, m: 0, y: 0, k: 0 })).toThrowError()
})

////////////////////////////////////////////////////////
// cmykToRgb
////////////////////////////////////////////////////////

test(`cmykToRgb`, () => {
  expect(cmykToRgb({ c: 0, m: 0, y: 0, k: 100 })).toStrictEqual({ r: 0, g: 0, b: 0 })
  expect(cmykToRgb({ c: 0, m: 0, y: 0, k: 0 })).toStrictEqual({ r: 255, g: 255, b: 255 })
  expect(cmykToRgb({ c: 73, m: 45, y: 0, k: 4 })).toStrictEqual({ r: 66, g: 135, b: 245 })

  expect(() => cmykToRgb({ c: -1, m: 0, y: 0, k: 0 })).toThrowError()
})

////////////////////////////////////////////////////////
// cmykToRgba
////////////////////////////////////////////////////////

test(`cmykToRgba`, () => {
  expect(cmykToRgba({ c: 0, m: 0, y: 0, k: 100 })).toStrictEqual({ r: 0, g: 0, b: 0, a: 1 })
  expect(cmykToRgba({ c: 0, m: 0, y: 0, k: 0 }, 0.5)).toStrictEqual({
    r: 255,
    g: 255,
    b: 255,
    a: 0.5,
  })
  expect(cmykToRgba({ c: 73, m: 45, y: 0, k: 4 }, 0)).toStrictEqual({ r: 66, g: 135, b: 245, a: 0 })

  expect(() => cmykToRgba({ c: -1, m: 0, y: 0, k: 0 })).toThrowError()
  expect(() => cmykToRgba({ c: 0, m: 0, y: 0, k: 100 }, 30)).toThrowError()
})

////////////////////////////////////////////////////////
// cmykToHsl
////////////////////////////////////////////////////////

test(`cmykToHsl`, () => {
  expect(cmykToHsl({ c: 0, m: 0, y: 0, k: 100 })).toStrictEqual({ h: 0, s: 0, l: 0 })
  expect(cmykToHsl({ c: 0, m: 0, y: 0, k: 0 })).toStrictEqual({ h: 0, s: 0, l: 100 })
  expect(cmykToHsl({ c: 0, m: 24, y: 95, k: 5 })).toStrictEqual({ h: 45, s: 90, l: 50 })
  expect(cmykToHsl({ c: 0, m: 0, y: 95, k: 5 })).toStrictEqual({ h: 60, s: 90, l: 50 })
  expect(cmykToHsl({ c: 16, m: 0, y: 95, k: 5 })).toStrictEqual({ h: 70, s: 90, l: 50 })
  expect(cmykToHsl({ c: 95, m: 0, y: 79, k: 5 })).toStrictEqual({ h: 130, s: 90, l: 50 })
  expect(cmykToHsl({ c: 95, m: 8, y: 0, k: 5 })).toStrictEqual({ h: 185, s: 90, l: 50 })
  expect(cmykToHsl({ c: 63, m: 95, y: 0, k: 5 })).toStrictEqual({ h: 260, s: 90, l: 50 })
  expect(cmykToHsl({ c: 0, m: 95, y: 16, k: 5 })).toStrictEqual({ h: 310, s: 90, l: 50 })
  expect(cmykToHsl({ c: 0, m: 95, y: 93, k: 5 })).toStrictEqual({ h: 359, s: 90, l: 50 })

  expect(() => cmykToHsl({ c: -1, m: 0, y: 0, k: 0 })).toThrowError()
})

////////////////////////////////////////////////////////
// cmykToHsla
////////////////////////////////////////////////////////

test(`cmykToHsla`, () => {
  expect(cmykToHsla({ c: 0, m: 0, y: 0, k: 100 })).toEqual({ h: 0, s: 0, l: 0, a: 1 })
  expect(cmykToHsla({ c: 0, m: 0, y: 0, k: 0 }, 1)).toEqual({ h: 0, s: 0, l: 100, a: 1 })
  expect(cmykToHsla({ c: 0, m: 24, y: 95, k: 5 }, 0.5)).toEqual({ h: 45, s: 90, l: 50, a: 0.5 })

  expect(() => cmykToHsla({ c: -1, m: 0, y: 0, k: 0 })).toThrowError()
  expect(() => cmykToHsla({ c: 0, m: 0, y: 0, k: 0 }, 30)).toThrowError()
})

////////////////////////////////////////////////////////
// colorToCmyk
////////////////////////////////////////////////////////

test(`colorToCmyk`, () => {
  expect(colorToCmyk('#FFFFFF')).toEqual({ c: 0, m: 0, y: 0, k: 0 })
  expect(colorToCmyk('#FFFFFF00')).toEqual({ c: 0, m: 0, y: 0, k: 0 })
  expect(colorToCmyk('#FFF')).toEqual({ c: 0, m: 0, y: 0, k: 0 })
  expect(colorToCmyk({ r: 0, g: 0, b: 0 })).toEqual({ c: 0, m: 0, y: 0, k: 100 })
  expect(colorToCmyk({ r: 0, g: 0, b: 0, a: 1 })).toEqual({ c: 0, m: 0, y: 0, k: 100 })
  expect(colorToCmyk({ c: 0, m: 100, y: 0, k: 0 })).toEqual({ c: 0, m: 100, y: 0, k: 0 })
  expect(colorToCmyk({ h: 0, s: 0, l: 0 })).toEqual({ c: 0, m: 0, y: 0, k: 100 })
  expect(colorToCmyk({ h: 0, s: 0, l: 0, a: 1 })).toEqual({ c: 0, m: 0, y: 0, k: 100 })

  expect(() => colorToCmyk('#')).toThrowError()
})

////////////////////////////////////////////////////////
// cmykStringToObject
////////////////////////////////////////////////////////

test(`cmykStringToObject`, () => {
  expect(cmykStringToObject('0, 50, 20, 100')).toEqual({ c: 0, m: 50, y: 20, k: 100 })
  expect(cmykStringToObject('0,50, 20, 100')).toEqual({ c: 0, m: 50, y: 20, k: 100 })
  expect(cmykStringToObject('0,  50, 20, 100')).toEqual({ c: 0, m: 50, y: 20, k: 100 })
  expect(cmykStringToObject('cmyk(0, 50, 20, 100)')).toEqual({ c: 0, m: 50, y: 20, k: 100 })
  expect(cmykStringToObject('cmyk(0,50, 20, 100)')).toEqual({ c: 0, m: 50, y: 20, k: 100 })
  expect(cmykStringToObject('cmyk(0,  50, 20, 100)')).toEqual({ c: 0, m: 50, y: 20, k: 100 })

  expect(() => cmykStringToObject('1')).toThrowError()
  expect(() => cmykStringToObject('600, 50, 20, 100')).toThrowError()
  expect(() => cmykStringToObject('cmyk(600, 50, 20, 100)')).toThrowError()
})

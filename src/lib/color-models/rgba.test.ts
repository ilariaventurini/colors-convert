import {
  rgbaToHex,
  rgbaToRgb,
  rgbaToCmyk,
  rgbaToHsl,
  rgbaToHsla,
  colorToRgba,
  rgbaStringToObject,
} from '../../index'

////////////////////////////////////////////////////////
// rgbaToHex
////////////////////////////////////////////////////////

test(`rgbaToHex`, () => {
  expect(rgbaToHex({ r: 0, g: 0, b: 0, a: 0 })).toBe('#00000000')
  expect(rgbaToHex({ r: 255, g: 255, b: 255, a: 1 })).toBe('#FFFFFFFF')

  expect(() => rgbaToHex({ r: 100, g: 0, b: 0, a: -1 })).toThrowError()
  expect(() => rgbaToHex({ r: 600, g: 0, b: 0, a: 0 })).toThrowError()
})

////////////////////////////////////////////////////////
// rgbaToRgb
////////////////////////////////////////////////////////

test(`rgbaToRgb`, () => {
  expect(rgbaToRgb({ r: 0, g: 0, b: 0, a: 0 })).toStrictEqual({ r: 0, g: 0, b: 0 })

  expect(() => rgbaToRgb({ r: 600, g: 0, b: 0, a: 0 })).toThrowError()
})

////////////////////////////////////////////////////////
// rgbaToCmyk
////////////////////////////////////////////////////////

test(`rgbaToCmyk`, () => {
  expect(rgbaToCmyk({ r: 0, g: 0, b: 0, a: 0 })).toStrictEqual({ c: 0, m: 0, y: 0, k: 100 })
  expect(rgbaToCmyk({ r: 255, g: 255, b: 255, a: 1 })).toStrictEqual({ c: 0, m: 0, y: 0, k: 0 })
  expect(rgbaToCmyk({ r: 66, g: 135, b: 245, a: 0.5 })).toStrictEqual({ c: 73, m: 45, y: 0, k: 4 })

  expect(() => rgbaToCmyk({ r: 600, g: 0, b: 0, a: 0 })).toThrowError()
})

////////////////////////////////////////////////////////
// rgbaToHsl
////////////////////////////////////////////////////////

test(`rgbaToHsl`, () => {
  expect(rgbaToHsl({ r: 0, g: 0, b: 0, a: 0 })).toStrictEqual({ h: 0, s: 0, l: 0 })
  expect(rgbaToHsl({ r: 255, g: 255, b: 255, a: 1 })).toStrictEqual({ h: 0, s: 0, l: 100 })
  expect(rgbaToHsl({ r: 242, g: 185, b: 13, a: 0.5 })).toStrictEqual({ h: 45, s: 90, l: 50 })
  expect(rgbaToHsl({ r: 242, g: 242, b: 13, a: 0 })).toStrictEqual({ h: 60, s: 90, l: 50 })
  expect(rgbaToHsl({ r: 204, g: 242, b: 13, a: 0 })).toStrictEqual({ h: 70, s: 90, l: 50 })
  expect(rgbaToHsl({ r: 13, g: 242, b: 51, a: 0 })).toStrictEqual({ h: 130, s: 90, l: 50 })
  expect(rgbaToHsl({ r: 13, g: 223, b: 242, a: 0 })).toStrictEqual({ h: 185, s: 90, l: 50 })
  expect(rgbaToHsl({ r: 89, g: 13, b: 242, a: 0 })).toStrictEqual({ h: 260, s: 90, l: 50 })
  expect(rgbaToHsl({ r: 242, g: 13, b: 204, a: 0 })).toStrictEqual({ h: 310, s: 90, l: 50 })
  expect(rgbaToHsl({ r: 242, g: 13, b: 17, a: 0 })).toStrictEqual({ h: 359, s: 90, l: 50 })

  expect(() => rgbaToHsl({ r: 600, g: 0, b: 0, a: 0 })).toThrowError()
})

////////////////////////////////////////////////////////
// rgbaToHsla
////////////////////////////////////////////////////////

test(`rgbaToHsla`, () => {
  expect(rgbaToHsla({ r: 0, g: 0, b: 0, a: 0 })).toStrictEqual({ h: 0, s: 0, l: 0, a: 0 })
  expect(rgbaToHsla({ r: 0, g: 0, b: 0, a: 0.7 })).toStrictEqual({ h: 0, s: 0, l: 0, a: 0.7 })
  expect(rgbaToHsla({ r: 255, g: 255, b: 255, a: 1 })).toStrictEqual({ h: 0, s: 0, l: 100, a: 1 })
  expect(rgbaToHsla({ r: 255, g: 255, b: 255, a: 0.9 })).toStrictEqual({
    h: 0,
    s: 0,
    l: 100,
    a: 0.9,
  })

  expect(() => rgbaToHsla({ r: 600, g: 0, b: 0, a: 0 })).toThrowError()
  expect(() => rgbaToHsla({ r: 0, g: 0, b: 0, a: 10 })).toThrowError()
})

////////////////////////////////////////////////////////
// colorToRgba
////////////////////////////////////////////////////////

test(`colorToRgba`, () => {
  expect(colorToRgba('#FFFFFF')).toEqual({ r: 255, g: 255, b: 255, a: 1 })
  expect(colorToRgba('#FFFFFF00')).toEqual({ r: 255, g: 255, b: 255, a: 0 })
  expect(colorToRgba('#FFF')).toEqual({ r: 255, g: 255, b: 255, a: 1 })
  expect(colorToRgba({ r: 0, g: 0, b: 0 })).toEqual({ r: 0, g: 0, b: 0, a: 1 })
  expect(colorToRgba({ r: 0, g: 0, b: 0, a: 1 })).toEqual({ r: 0, g: 0, b: 0, a: 1 })
  expect(colorToRgba({ c: 0, m: 0, y: 0, k: 0 })).toEqual({ r: 255, g: 255, b: 255, a: 1 })
  expect(colorToRgba({ h: 0, s: 0, l: 0 })).toEqual({ r: 0, g: 0, b: 0, a: 1 })
  expect(colorToRgba({ h: 0, s: 0, l: 0, a: 1 })).toEqual({ r: 0, g: 0, b: 0, a: 1 })

  expect(() => colorToRgba('#')).toThrowError()
})

////////////////////////////////////////////////////////
// rgbaStringToObject
////////////////////////////////////////////////////////

test(`rgbaStringToObject`, () => {
  expect(rgbaStringToObject('255, 0, 255, 0')).toEqual({ r: 255, g: 0, b: 255, a: 0 })
  expect(rgbaStringToObject('255,0, 255, 0.5')).toEqual({ r: 255, g: 0, b: 255, a: 0.5 })
  expect(rgbaStringToObject('255,  0, 255, 1')).toEqual({ r: 255, g: 0, b: 255, a: 1 })
  expect(rgbaStringToObject('rgba(255, 0, 255, 0.5)')).toEqual({ r: 255, g: 0, b: 255, a: 0.5 })
  expect(rgbaStringToObject('rgba(255,0, 255, 0.5)')).toEqual({ r: 255, g: 0, b: 255, a: 0.5 })
  expect(rgbaStringToObject('rgba(255,  0, 255, 0.5)')).toEqual({ r: 255, g: 0, b: 255, a: 0.5 })

  expect(() => rgbaStringToObject('300,  0, 255, 0.5')).toThrowError()
  expect(() => rgbaStringToObject('rgba(300,  0, 255, 0.5)')).toThrowError()
  expect(() => rgbaStringToObject('1')).toThrowError()
})

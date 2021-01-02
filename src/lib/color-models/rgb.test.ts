import {
  rgbToHex,
  rgbToRgba,
  rgbToCmyk,
  rgbToHsl,
  rgbToHsla,
  colorToRgb,
  rgbString2Object,
} from '../../index'

////////////////////////////////////////////////////////
// rgbToHex
////////////////////////////////////////////////////////

test(`rgbToHex`, () => {
  expect(rgbToHex({ r: 0, g: 0, b: 0 })).toBe('#000000')
  expect(rgbToHex({ r: 255, g: 255, b: 255 })).toBe('#FFFFFF')

  expect(() => rgbToHex({ r: 600, g: 0, b: 0 })).toThrowError()
})

////////////////////////////////////////////////////////
// rgbToCmyk
////////////////////////////////////////////////////////

test(`rgbToCmyk`, () => {
  expect(rgbToCmyk({ r: 0, g: 0, b: 0 })).toStrictEqual({ c: 0, m: 0, y: 0, k: 100 })
  expect(rgbToCmyk({ r: 255, g: 255, b: 255 })).toStrictEqual({ c: 0, m: 0, y: 0, k: 0 })
  expect(rgbToCmyk({ r: 66, g: 135, b: 245 })).toStrictEqual({ c: 73, m: 45, y: 0, k: 4 })

  expect(() => rgbToCmyk({ r: 600, g: 0, b: 0 })).toThrowError()
})

////////////////////////////////////////////////////////
// rgbToHsl
////////////////////////////////////////////////////////

test(`rgbToHsl`, () => {
  expect(rgbToHsl({ r: 0, g: 0, b: 0 })).toStrictEqual({ h: 0, s: 0, l: 0 })
  expect(rgbToHsl({ r: 255, g: 255, b: 255 })).toStrictEqual({ h: 0, s: 0, l: 100 })
  expect(rgbToHsl({ r: 242, g: 185, b: 13 })).toStrictEqual({ h: 45, s: 90, l: 50 })
  expect(rgbToHsl({ r: 242, g: 242, b: 13 })).toStrictEqual({ h: 60, s: 90, l: 50 })
  expect(rgbToHsl({ r: 204, g: 242, b: 13 })).toStrictEqual({ h: 70, s: 90, l: 50 })
  expect(rgbToHsl({ r: 13, g: 242, b: 51 })).toStrictEqual({ h: 130, s: 90, l: 50 })
  expect(rgbToHsl({ r: 13, g: 223, b: 242 })).toStrictEqual({ h: 185, s: 90, l: 50 })
  expect(rgbToHsl({ r: 89, g: 13, b: 242 })).toStrictEqual({ h: 260, s: 90, l: 50 })
  expect(rgbToHsl({ r: 242, g: 13, b: 204 })).toStrictEqual({ h: 310, s: 90, l: 50 })
  expect(rgbToHsl({ r: 242, g: 13, b: 17 })).toStrictEqual({ h: 359, s: 90, l: 50 })

  expect(() => rgbToHsl({ r: 600, g: 0, b: 0 })).toThrowError()
})

////////////////////////////////////////////////////////
// rgbToRgba
////////////////////////////////////////////////////////

test(`rgbToRgba`, () => {
  expect(rgbToRgba({ r: 0, g: 0, b: 0 })).toStrictEqual({ r: 0, g: 0, b: 0, a: 1 })
  expect(rgbToRgba({ r: 0, g: 0, b: 0 }, 0.3)).toStrictEqual({ r: 0, g: 0, b: 0, a: 0.3 })

  expect(() => rgbToRgba({ r: 100, g: 0, b: 0 }, 10)).toThrowError()
  expect(() => rgbToRgba({ r: 600, g: 0, b: 0 })).toThrowError()
})

////////////////////////////////////////////////////////
// rgbToHsla
////////////////////////////////////////////////////////

test(`rgbToHsla`, () => {
  expect(rgbToHsla({ r: 0, g: 0, b: 0 })).toStrictEqual({ h: 0, s: 0, l: 0, a: 1 })
  expect(rgbToHsla({ r: 0, g: 0, b: 0 }, 0)).toStrictEqual({ h: 0, s: 0, l: 0, a: 0 })
  expect(rgbToHsla({ r: 255, g: 255, b: 255 })).toStrictEqual({ h: 0, s: 0, l: 100, a: 1 })
  expect(rgbToHsla({ r: 255, g: 255, b: 255 }, 0.8)).toStrictEqual({ h: 0, s: 0, l: 100, a: 0.8 })

  expect(() => rgbToHsla({ r: 600, g: 0, b: 0 })).toThrowError()
  expect(() => rgbToHsla({ r: 10, g: 0, b: 0 }, 10)).toThrowError()
})

////////////////////////////////////////////////////////
// colorToRgb
////////////////////////////////////////////////////////

test(`colorToRgb`, () => {
  expect(colorToRgb('#FFFFFF')).toStrictEqual({ r: 255, g: 255, b: 255 })
  expect(colorToRgb({ r: 0, g: 0, b: 0 })).toStrictEqual({ r: 0, g: 0, b: 0 })
  expect(colorToRgb({ r: 0, g: 0, b: 0, a: 1 })).toStrictEqual({ r: 0, g: 0, b: 0 })
  expect(colorToRgb({ c: 0, m: 0, y: 0, k: 0 })).toStrictEqual({ r: 255, g: 255, b: 255 })
  expect(colorToRgb({ h: 0, s: 0, l: 0 })).toStrictEqual({ r: 0, g: 0, b: 0 })
  expect(colorToRgb({ h: 0, s: 0, l: 0, a: 1 })).toStrictEqual({ r: 0, g: 0, b: 0 })

  expect(() => colorToRgb('#')).toThrowError()
})

////////////////////////////////////////////////////////
// rgbString2Object
////////////////////////////////////////////////////////

test(`rgbString2Object`, () => {
  expect(rgbString2Object('255, 0, 255')).toEqual({ r: 255, g: 0, b: 255 })
  expect(rgbString2Object('255,0, 255')).toEqual({ r: 255, g: 0, b: 255 })
  expect(rgbString2Object('255,  0, 255')).toEqual({ r: 255, g: 0, b: 255 })
  expect(rgbString2Object('rgb(255, 0, 255)')).toEqual({ r: 255, g: 0, b: 255 })
  expect(rgbString2Object('rgb(255,0, 255)')).toEqual({ r: 255, g: 0, b: 255 })
  expect(rgbString2Object('rgb(255,  0, 255)')).toEqual({ r: 255, g: 0, b: 255 })

  expect(() => rgbString2Object('300,  0, 255')).toThrowError()
  expect(() => rgbString2Object('rgb(300,  0, 255)')).toThrowError()
  expect(() => rgbString2Object('1')).toThrowError()
})

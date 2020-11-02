import {
  cmyk2hex,
  cmyk2rgb,
  cmykToRgba,
  cmyk2hsl,
  cmykToHsla,
  colorToCmyk,
  cmykString2Object,
} from '../../index'

////////////////////////////////////////////////////////
// cmyk2hex
////////////////////////////////////////////////////////

test(`cmyk2hex`, () => {
  expect(cmyk2hex({ c: 0, m: 0, y: 0, k: 0 })).toStrictEqual('#FFFFFF')
  expect(cmyk2hex({ c: 0, m: 0, y: 0, k: 100 })).toStrictEqual('#000000')
  expect(cmyk2hex({ c: 73, m: 45, y: 0, k: 4 })).toStrictEqual('#4287F5')

  expect(() => cmyk2hex({ c: -1, m: 0, y: 0, k: 0 })).toThrowError()
})

////////////////////////////////////////////////////////
// cmyk2rgb
////////////////////////////////////////////////////////

test(`cmyk2rgb`, () => {
  expect(cmyk2rgb({ c: 0, m: 0, y: 0, k: 100 })).toStrictEqual({ r: 0, g: 0, b: 0 })
  expect(cmyk2rgb({ c: 0, m: 0, y: 0, k: 0 })).toStrictEqual({ r: 255, g: 255, b: 255 })
  expect(cmyk2rgb({ c: 73, m: 45, y: 0, k: 4 })).toStrictEqual({ r: 66, g: 135, b: 245 })

  expect(() => cmyk2rgb({ c: -1, m: 0, y: 0, k: 0 })).toThrowError()
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
// cmyk2hsl
////////////////////////////////////////////////////////

test(`cmyk2hsl`, () => {
  expect(cmyk2hsl({ c: 0, m: 0, y: 0, k: 100 })).toStrictEqual({ h: 0, s: 0, l: 0 })
  expect(cmyk2hsl({ c: 0, m: 0, y: 0, k: 0 })).toStrictEqual({ h: 0, s: 0, l: 100 })
  expect(cmyk2hsl({ c: 0, m: 24, y: 95, k: 5 })).toStrictEqual({ h: 45, s: 90, l: 50 })
  expect(cmyk2hsl({ c: 0, m: 0, y: 95, k: 5 })).toStrictEqual({ h: 60, s: 90, l: 50 })
  expect(cmyk2hsl({ c: 16, m: 0, y: 95, k: 5 })).toStrictEqual({ h: 70, s: 90, l: 50 })
  expect(cmyk2hsl({ c: 95, m: 0, y: 79, k: 5 })).toStrictEqual({ h: 130, s: 90, l: 50 })
  expect(cmyk2hsl({ c: 95, m: 8, y: 0, k: 5 })).toStrictEqual({ h: 185, s: 90, l: 50 })
  expect(cmyk2hsl({ c: 63, m: 95, y: 0, k: 5 })).toStrictEqual({ h: 260, s: 90, l: 50 })
  expect(cmyk2hsl({ c: 0, m: 95, y: 16, k: 5 })).toStrictEqual({ h: 310, s: 90, l: 50 })
  expect(cmyk2hsl({ c: 0, m: 95, y: 93, k: 5 })).toStrictEqual({ h: 359, s: 90, l: 50 })

  expect(() => cmyk2hsl({ c: -1, m: 0, y: 0, k: 0 })).toThrowError()
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
// cmykString2Object
////////////////////////////////////////////////////////

test(`cmykString2Object`, () => {
  expect(cmykString2Object('0, 50, 20, 100')).toEqual({ c: 0, m: 50, y: 20, k: 100 })
  expect(cmykString2Object('0,50, 20, 100')).toEqual({ c: 0, m: 50, y: 20, k: 100 })
  expect(cmykString2Object('0,  50, 20, 100')).toEqual({ c: 0, m: 50, y: 20, k: 100 })
  expect(cmykString2Object('cmyk(0, 50, 20, 100)')).toEqual({ c: 0, m: 50, y: 20, k: 100 })
  expect(cmykString2Object('cmyk(0,50, 20, 100)')).toEqual({ c: 0, m: 50, y: 20, k: 100 })
  expect(cmykString2Object('cmyk(0,  50, 20, 100)')).toEqual({ c: 0, m: 50, y: 20, k: 100 })

  expect(() => cmykString2Object('1')).toThrowError()
  expect(() => cmykString2Object('600, 50, 20, 100')).toThrowError()
  expect(() => cmykString2Object('cmyk(600, 50, 20, 100)')).toThrowError()
})

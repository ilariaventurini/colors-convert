import {
  hslToHex,
  hslToRgb,
  hslToRgba,
  hslToCmyk,
  hslToHsla,
  colorToHsl,
  hslStringToObject,
} from '../../index'

////////////////////////////////////////////////////////
// hslToHex
////////////////////////////////////////////////////////

test(`hslToHex`, () => {
  expect(hslToHex({ h: 0, s: 0, l: 0 })).toEqual('#000000')
  expect(hslToHex({ h: 0, s: 0, l: 100 })).toEqual('#FFFFFF')
  expect(hslToHex({ h: 45, s: 90, l: 50 })).toEqual('#F2B90D')
  expect(hslToHex({ h: 60, s: 90, l: 50 })).toEqual('#F2F20D')
  expect(hslToHex({ h: 70, s: 90, l: 50 })).toEqual('#CCF20D')
  expect(hslToHex({ h: 130, s: 90, l: 50 })).toEqual('#0DF233')
  expect(hslToHex({ h: 185, s: 90, l: 50 })).toEqual('#0DDFF2')
  expect(hslToHex({ h: 260, s: 90, l: 50 })).toEqual('#590DF2')
  expect(hslToHex({ h: 310, s: 90, l: 50 })).toEqual('#F20DCC')
  expect(hslToHex({ h: 359, s: 90, l: 50 })).toEqual('#F20D11')

  expect(() => hslToHex({ h: -1, s: 90, l: 50 })).toThrowError()
})

////////////////////////////////////////////////////////
// hslToRgb
////////////////////////////////////////////////////////

test(`hslToRgb`, () => {
  expect(hslToRgb({ h: 0, s: 0, l: 0 })).toStrictEqual({ r: 0, g: 0, b: 0 }) // s01 = 0
  expect(hslToRgb({ h: 359, s: 0, l: 100 })).toStrictEqual({ r: 255, g: 255, b: 255 }) // s01 = 0
  expect(hslToRgb({ h: 359, s: 100, l: 100 })).toStrictEqual({ r: 255, g: 255, b: 255 }) // angleRangeIndex = 0
  expect(hslToRgb({ h: 45, s: 90, l: 50 })).toStrictEqual({ r: 242, g: 185, b: 13 }) // angleRangeIndex = 0
  expect(hslToRgb({ h: 60, s: 90, l: 50 })).toStrictEqual({ r: 242, g: 242, b: 13 }) // angleRangeIndex = 1
  expect(hslToRgb({ h: 70, s: 90, l: 50 })).toStrictEqual({ r: 204, g: 242, b: 13 }) // angleRangeIndex = 1
  expect(hslToRgb({ h: 130, s: 90, l: 50 })).toStrictEqual({ r: 13, g: 242, b: 51 }) // angleRangeIndex = 2
  expect(hslToRgb({ h: 185, s: 90, l: 50 })).toStrictEqual({ r: 13, g: 223, b: 242 }) // angleRangeIndex = 3
  expect(hslToRgb({ h: 260, s: 90, l: 50 })).toStrictEqual({ r: 89, g: 13, b: 242 }) // angleRangeIndex = 4
  expect(hslToRgb({ h: 310, s: 90, l: 50 })).toStrictEqual({ r: 242, g: 13, b: 204 }) // angleRangeIndex = 5
  expect(hslToRgb({ h: 359, s: 90, l: 50 })).toStrictEqual({ r: 242, g: 13, b: 17 }) // angleRangeIndex = 5

  expect(() => hslToRgb({ h: -1, s: 90, l: 50 })).toThrowError()
})

////////////////////////////////////////////////////////
// hslToRgba
////////////////////////////////////////////////////////

test(`hslToRgba`, () => {
  expect(hslToRgba({ h: 0, s: 0, l: 0 })).toStrictEqual({ r: 0, g: 0, b: 0, a: 1 }) // s01 = 0
  expect(hslToRgba({ h: 359, s: 0, l: 100 }, 0)).toStrictEqual({ r: 255, g: 255, b: 255, a: 0 }) // s01 = 0
  expect(hslToRgba({ h: 359, s: 100, l: 100 })).toStrictEqual({ r: 255, g: 255, b: 255, a: 1 }) // angleRangeIndex = 0
  expect(hslToRgba({ h: 45, s: 90, l: 50 }, 0.5)).toStrictEqual({ r: 242, g: 185, b: 13, a: 0.5 }) // angleRangeIndex = 0

  expect(() => hslToRgba({ h: 1, s: 90, l: 50 }, 30)).toThrowError()
  expect(() => hslToRgba({ h: -1, s: 90, l: 50 })).toThrowError()
})

////////////////////////////////////////////////////////
// hslToCmyk
////////////////////////////////////////////////////////

test(`hslToCmyk`, () => {
  expect(hslToCmyk({ h: 0, s: 0, l: 0 })).toStrictEqual({ c: 0, m: 0, y: 0, k: 100 })
  expect(hslToCmyk({ h: 0, s: 0, l: 100 })).toStrictEqual({ c: 0, m: 0, y: 0, k: 0 })
  expect(hslToCmyk({ h: 45, s: 90, l: 50 })).toStrictEqual({ c: 0, m: 24, y: 95, k: 5 })
  expect(hslToCmyk({ h: 60, s: 90, l: 50 })).toStrictEqual({ c: 0, m: 0, y: 95, k: 5 })
  expect(hslToCmyk({ h: 70, s: 90, l: 50 })).toStrictEqual({ c: 16, m: 0, y: 95, k: 5 })
  expect(hslToCmyk({ h: 130, s: 90, l: 50 })).toStrictEqual({ c: 95, m: 0, y: 79, k: 5 })
  expect(hslToCmyk({ h: 185, s: 90, l: 50 })).toStrictEqual({ c: 95, m: 8, y: 0, k: 5 })
  expect(hslToCmyk({ h: 260, s: 90, l: 50 })).toStrictEqual({ c: 63, m: 95, y: 0, k: 5 })
  expect(hslToCmyk({ h: 310, s: 90, l: 50 })).toStrictEqual({ c: 0, m: 95, y: 16, k: 5 })
  expect(hslToCmyk({ h: 359, s: 90, l: 50 })).toStrictEqual({ c: 0, m: 95, y: 93, k: 5 })

  expect(() => hslToCmyk({ h: -1, s: 90, l: 50 })).toThrowError()
})

////////////////////////////////////////////////////////
// hslToHsla
////////////////////////////////////////////////////////

test(`hslToHsla`, () => {
  expect(hslToHsla({ h: 0, s: 0, l: 0 })).toStrictEqual({ h: 0, s: 0, l: 0, a: 1 })
  expect(hslToHsla({ h: 0, s: 0, l: 0 }, 0)).toStrictEqual({ h: 0, s: 0, l: 0, a: 0 })
  expect(hslToHsla({ h: 0, s: 0, l: 0 }, 0.5)).toStrictEqual({ h: 0, s: 0, l: 0, a: 0.5 })
  expect(hslToHsla({ h: 45, s: 90, l: 50 })).toStrictEqual({ h: 45, s: 90, l: 50, a: 1 })

  expect(() => hslToHsla({ h: -1, s: 90, l: 50 })).toThrowError()
  expect(() => hslToHsla({ h: 0, s: 0, l: 0 }, 30)).toThrowError()
})

////////////////////////////////////////////////////////
// colorToHsl
////////////////////////////////////////////////////////

test(`colorToHsl`, () => {
  expect(colorToHsl('#FFFFFF')).toEqual({ h: 0, s: 0, l: 100 })
  expect(colorToHsl('#FFFFFF00')).toEqual({ h: 0, s: 0, l: 100 })
  expect(colorToHsl('#FFF')).toEqual({ h: 0, s: 0, l: 100 })
  expect(colorToHsl({ r: 0, g: 0, b: 0 })).toEqual({ h: 0, s: 0, l: 0 })
  expect(colorToHsl({ r: 0, g: 0, b: 0, a: 1 })).toEqual({ h: 0, s: 0, l: 0 })
  expect(colorToHsl({ c: 0, m: 100, y: 0, k: 0 })).toEqual({ h: 300, s: 100, l: 50 })
  expect(colorToHsl({ h: 0, s: 0, l: 100 })).toEqual({ h: 0, s: 0, l: 100 })
  expect(colorToHsl({ h: 0, s: 0, l: 0, a: 1 })).toEqual({ h: 0, s: 0, l: 0 })

  expect(() => colorToHsl('#')).toThrowError()
})

////////////////////////////////////////////////////////
// hslStringToObject
////////////////////////////////////////////////////////

test(`hslStringToObject`, () => {
  expect(hslStringToObject('322, 79%, 52%')).toEqual({ h: 322, s: 79, l: 52 })
  expect(hslStringToObject('322,79%, 52%')).toEqual({ h: 322, s: 79, l: 52 })
  expect(hslStringToObject('322,  79%, 52%')).toEqual({ h: 322, s: 79, l: 52 })
  expect(hslStringToObject('hsl(322, 79%, 52%)')).toEqual({ h: 322, s: 79, l: 52 })
  expect(hslStringToObject('hsl(322,79%, 52%)')).toEqual({ h: 322, s: 79, l: 52 })
  expect(hslStringToObject('hsl(322,  79%, 52%)')).toEqual({ h: 322, s: 79, l: 52 })

  expect(() => hslStringToObject('1')).toThrowError()
  expect(() => hslStringToObject('hsl(322,  79, 52%)')).toThrowError()
  expect(() => hslStringToObject('600, 79%, 52%')).toThrowError()
  expect(() => hslStringToObject('hsl(600, 79%, 52%)')).toThrowError()
})

import { hsl2hex, hsl2rgb, hsl2cmyk, hslString2Object } from '../index'

////////////////////////////////////////////////////////
// hsl2hex
////////////////////////////////////////////////////////

test(`hsl2hex`, () => {
  expect(hsl2hex({ h: 0, s: 0, l: 0 })).toEqual('#000000')
  expect(hsl2hex({ h: 0, s: 0, l: 100 })).toEqual('#ffffff')
  expect(hsl2hex({ h: 45, s: 90, l: 50 })).toEqual('#f2b90d')
  expect(hsl2hex({ h: 60, s: 90, l: 50 })).toEqual('#f2f20d')
  expect(hsl2hex({ h: 70, s: 90, l: 50 })).toEqual('#ccf20d')
  expect(hsl2hex({ h: 130, s: 90, l: 50 })).toEqual('#0df233')
  expect(hsl2hex({ h: 185, s: 90, l: 50 })).toEqual('#0ddff2')
  expect(hsl2hex({ h: 260, s: 90, l: 50 })).toEqual('#590df2')
  expect(hsl2hex({ h: 310, s: 90, l: 50 })).toEqual('#f20dcc')
  expect(hsl2hex({ h: 359, s: 90, l: 50 })).toEqual('#f20d11')
})

////////////////////////////////////////////////////////
// hsl2rgb
////////////////////////////////////////////////////////

test(`hsl2rgb`, () => {
  expect(hsl2rgb({ h: 0, s: 0, l: 0 })).toStrictEqual({ r: 0, g: 0, b: 0 }) // s01 = 0
  expect(hsl2rgb({ h: 359, s: 0, l: 100 })).toStrictEqual({ r: 255, g: 255, b: 255 }) // s01 = 0
  expect(hsl2rgb({ h: 359, s: 100, l: 100 })).toStrictEqual({ r: 255, g: 255, b: 255 }) // angleRangeIndex = 0
  expect(hsl2rgb({ h: 45, s: 90, l: 50 })).toStrictEqual({ r: 242, g: 185, b: 13 }) // angleRangeIndex = 0
  expect(hsl2rgb({ h: 60, s: 90, l: 50 })).toStrictEqual({ r: 242, g: 242, b: 13 }) // angleRangeIndex = 1
  expect(hsl2rgb({ h: 70, s: 90, l: 50 })).toStrictEqual({ r: 204, g: 242, b: 13 }) // angleRangeIndex = 1
  expect(hsl2rgb({ h: 130, s: 90, l: 50 })).toStrictEqual({ r: 13, g: 242, b: 51 }) // angleRangeIndex = 2
  expect(hsl2rgb({ h: 185, s: 90, l: 50 })).toStrictEqual({ r: 13, g: 223, b: 242 }) // angleRangeIndex = 3
  expect(hsl2rgb({ h: 260, s: 90, l: 50 })).toStrictEqual({ r: 89, g: 13, b: 242 }) // angleRangeIndex = 4
  expect(hsl2rgb({ h: 310, s: 90, l: 50 })).toStrictEqual({ r: 242, g: 13, b: 204 }) // angleRangeIndex = 5
  expect(hsl2rgb({ h: 359, s: 90, l: 50 })).toStrictEqual({ r: 242, g: 13, b: 17 }) // angleRangeIndex = 5
})

////////////////////////////////////////////////////////
// hsl2cmyk
////////////////////////////////////////////////////////

test(`hsl2cmyk`, () => {
  expect(hsl2cmyk({ h: 0, s: 0, l: 0 })).toStrictEqual({ c: 0, m: 0, y: 0, k: 100 })
  expect(hsl2cmyk({ h: 0, s: 0, l: 100 })).toStrictEqual({ c: 0, m: 0, y: 0, k: 0 })
  expect(hsl2cmyk({ h: 45, s: 90, l: 50 })).toStrictEqual({ c: 0, m: 24, y: 95, k: 5 })
  expect(hsl2cmyk({ h: 60, s: 90, l: 50 })).toStrictEqual({ c: 0, m: 0, y: 95, k: 5 })
  expect(hsl2cmyk({ h: 70, s: 90, l: 50 })).toStrictEqual({ c: 16, m: 0, y: 95, k: 5 })
  expect(hsl2cmyk({ h: 130, s: 90, l: 50 })).toStrictEqual({ c: 95, m: 0, y: 79, k: 5 })
  expect(hsl2cmyk({ h: 185, s: 90, l: 50 })).toStrictEqual({ c: 95, m: 8, y: 0, k: 5 })
  expect(hsl2cmyk({ h: 260, s: 90, l: 50 })).toStrictEqual({ c: 63, m: 95, y: 0, k: 5 })
  expect(hsl2cmyk({ h: 310, s: 90, l: 50 })).toStrictEqual({ c: 0, m: 95, y: 16, k: 5 })
  expect(hsl2cmyk({ h: 359, s: 90, l: 50 })).toStrictEqual({ c: 0, m: 95, y: 93, k: 5 })
})

////////////////////////////////////////////////////////
// hslString2Object
////////////////////////////////////////////////////////

test(`hslString2Object`, () => {
  expect(hslString2Object('322°, 79%, 52%')).toEqual({ h: 322, s: 79, l: 52 })
  expect(hslString2Object('322°,79%, 52%')).toEqual({ h: 322, s: 79, l: 52 })
  expect(hslString2Object('322°,  79%, 52%')).toEqual({ h: 322, s: 79, l: 52 })
  expect(hslString2Object('hsl(322°, 79%, 52%)')).toEqual({ h: 322, s: 79, l: 52 })
  expect(hslString2Object('hsl(322°,79%, 52%)')).toEqual({ h: 322, s: 79, l: 52 })
  expect(hslString2Object('hsl(322°,  79%, 52%)')).toEqual({ h: 322, s: 79, l: 52 })
  expect(() => hslString2Object('600°, 79%, 52%')).toThrow()
  expect(() => hslString2Object('hsl(600°, 79%, 52%)')).toThrow()
})

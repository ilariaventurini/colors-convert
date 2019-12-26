import { hsl2hex, hsl2rgb, hsl2cmyk } from '../index'

////////////////////////////////////////////////////////
// hsl2hex
////////////////////////////////////////////////////////

// TODO: implement it
test(`hsl2hex`, () => {
  // expect(hsl2hex({ h: 0, s: 0, l: 0 })).toStrictEqual({ r: 0, g: 0, b: 0 })
  // expect(hsl2hex('')).toThrow(new Error(' is not a hex color.'))
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
  // expect(hsl2rgb('')).toThrow(new Error(' is not a hex color.'))
})

////////////////////////////////////////////////////////
// hsl2cmyk
////////////////////////////////////////////////////////

// TODO: implement it
test(`hsl2cmyk`, () => {
  // expect(hsl2cmyk({ h: 0, s: 0, l: 0 })).toStrictEqual({ r: 0, g: 0, b: 0 })
  // expect(hsl2cmyk('')).toThrow(new Error(' is not a hex color.'))
})

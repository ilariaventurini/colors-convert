import { hsl2hex, hsl2rgb, hsl2rgba, hsl2cmyk } from '../index'

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

// TODO: implement it
test(`hsl2rgb`, () => {
  expect(hsl2rgb({ h: 0, s: 0, l: 0 })).toStrictEqual({ r: 0, g: 0, b: 0 })
  expect(hsl2rgb({ h: 360, s: 0, l: 100 })).toStrictEqual({ r: 255, g: 255, b: 255 })
  expect(hsl2rgb({ h: 360, s: 100, l: 100 })).toStrictEqual({ r: 255, g: 255, b: 255 })
  expect(hsl2rgb({ h: 45, s: 90, l: 50 })).toStrictEqual({ r: 242, g: 185, b: 13 })
  // expect(hsl2rgb('')).toThrow(new Error(' is not a hex color.'))
})

////////////////////////////////////////////////////////
// hsl2rgba
////////////////////////////////////////////////////////

// TODO: implement it
test(`hsl2rgba`, () => {
  // expect(hsl2rgba({ h: 0, s: 0, l: 0 })).toStrictEqual({ r: 0, g: 0, b: 0 })
  // expect(hsl2rgba('')).toThrow(new Error(' is not a hex color.'))
})

////////////////////////////////////////////////////////
// hsl2cmyk
////////////////////////////////////////////////////////

// TODO: implement it
test(`hsl2cmyk`, () => {
  // expect(hsl2cmyk({ h: 0, s: 0, l: 0 })).toStrictEqual({ r: 0, g: 0, b: 0 })
  // expect(hsl2cmyk('')).toThrow(new Error(' is not a hex color.'))
})


import { rgb2hex, rgb2cmyk, rgb2hsl } from '../index'

////////////////////////////////////////////////////////
// rgb2hex
////////////////////////////////////////////////////////

test(`rgb2hex`, () => {
  expect(rgb2hex({ r: 0, g: 0, b: 0 })).toBe('#000000')
  expect(rgb2hex({ r: 255, g: 255, b: 255 })).toBe('#ffffff')
  // expect(rgb2hex({})).toThrow(new Error('{} is not a rgb color.'))
})

////////////////////////////////////////////////////////
// rgb2cmyk
////////////////////////////////////////////////////////

test(`rgb2cmyk`, () => {
  expect(rgb2cmyk({ r: 0, g: 0, b: 0 })).toStrictEqual({ c: 0, m: 0, y: 0, k: 100 })
  expect(rgb2cmyk({ r: 255, g: 255, b: 255 })).toStrictEqual({ c: 0, m: 0, y: 0, k: 0 })
  expect(rgb2cmyk({ r: 66, g: 135, b: 245 })).toStrictEqual({ c: 73, m: 45, y: 0, k: 4 })
  // expect(rgb2cmyk('')).toThrow(new Error(' is not a rgb color.'))
})

////////////////////////////////////////////////////////
// rgb2hsl
////////////////////////////////////////////////////////

// TODO: implement it
test(`rgb2hsl`, () => {
  // expect(rgb2hsl({ r: 0, g: 0, b: 0 })).toStrictEqual({ h: 0, s: 0, l: 0 })
  // expect(rgb2hsl({ r: 255, g: 255, b: 255 })).toStrictEqual({ h: 0, s: 0, l: 0 })
  // expect(rgb2hsl({ r: 66, g: 135, b: 245 })).toStrictEqual({ h: 73, s: 45, l: 0 })
  // expect(rgb2hsl('')).toThrow(new Error(' is not a rgb color.'))
})

import { cmyk2rgb, cmyk2hex, cmyk2hsl, cmykString2Object } from '../index'

////////////////////////////////////////////////////////
// cmyk2rgb
////////////////////////////////////////////////////////

test(`cmyk2rgb`, () => {
  expect(cmyk2rgb({ c: 0, m: 0, y: 0, k: 100 })).toStrictEqual({ r: 0, g: 0, b: 0 })
  expect(cmyk2rgb({ c: 0, m: 0, y: 0, k: 0 })).toStrictEqual({ r: 255, g: 255, b: 255 })
  expect(cmyk2rgb({ c: 73, m: 45, y: 0, k: 4 })).toStrictEqual({ r: 66, g: 135, b: 245 })
})

////////////////////////////////////////////////////////
// cmyk2hex
////////////////////////////////////////////////////////

test(`cmyk2hex`, () => {
  expect(cmyk2hex({ c: 0, m: 0, y: 0, k: 0 })).toStrictEqual('#ffffff')
  expect(cmyk2hex({ c: 0, m: 0, y: 0, k: 100 })).toStrictEqual('#000000')
  expect(cmyk2hex({ c: 73, m: 45, y: 0, k: 4 })).toStrictEqual('#4287f5')
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
  expect(() => cmykString2Object('600, 50, 20, 100')).toThrow()
  expect(() => cmykString2Object('cmyk(600, 50, 20, 100)')).toThrow()
})

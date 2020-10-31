import { hslaToHex, hslaToRgb, hslaToRgba, hslaToHsl, hslaToCmyk } from '../../index'

////////////////////////////////////////////////////////
// hslaToHex
////////////////////////////////////////////////////////

test(`hslaToHex`, () => {
  expect(hslaToHex({ h: 0, s: 0, l: 0, a: 0 })).toBe('#00000000')
  expect(hslaToHex({ h: 0, s: 0, l: 100, a: 0 })).toBe('#ffffff00')
  expect(hslaToHex({ h: 45, s: 90, l: 50, a: 1 })).toBe('#f2b90dFF')
  expect(hslaToHex({ h: 60, s: 90, l: 50, a: 0 })).toBe('#f2f20d00')

  expect(() => hslaToHex({ h: -1, s: 90, l: 50, a: 0 })).toThrowError()
})

////////////////////////////////////////////////////////
// hslaToRgb
////////////////////////////////////////////////////////

test(`hslaToRgb`, () => {
  expect(hslaToRgb({ h: 0, s: 0, l: 0, a: 0 })).toEqual({ r: 0, g: 0, b: 0 })
  expect(hslaToRgb({ h: 0, s: 0, l: 100, a: 0 })).toEqual({ r: 255, g: 255, b: 255 })
  expect(hslaToRgb({ h: 45, s: 90, l: 50, a: 1 })).toEqual({ r: 242, g: 185, b: 13 })
  expect(hslaToRgb({ h: 60, s: 90, l: 50, a: 0 })).toEqual({ r: 242, g: 242, b: 13 })
  expect(hslaToRgb({ h: 0, s: 0, l: 100, a: 0.5 })).toEqual({ r: 255, g: 255, b: 255 })

  expect(() => hslaToRgb({ h: -1, s: 90, l: 50, a: 0 })).toThrowError()
})

////////////////////////////////////////////////////////
// hslaToRgba
////////////////////////////////////////////////////////

test(`hslaToRgba`, () => {
  expect(hslaToRgba({ h: 0, s: 0, l: 0, a: 0 })).toEqual({ r: 0, g: 0, b: 0, a: 0 })
  expect(hslaToRgba({ h: 0, s: 0, l: 100, a: 0 })).toEqual({ r: 255, g: 255, b: 255, a: 0 })
  expect(hslaToRgba({ h: 45, s: 90, l: 50, a: 1 })).toEqual({ r: 242, g: 185, b: 13, a: 1 })
  expect(hslaToRgba({ h: 60, s: 90, l: 50, a: 0 })).toEqual({ r: 242, g: 242, b: 13, a: 0 })
  expect(hslaToRgba({ h: 0, s: 0, l: 100, a: 0.5 })).toEqual({ r: 255, g: 255, b: 255, a: 0.5 })

  expect(() => hslaToRgba({ h: -1, s: 90, l: 50, a: 0 })).toThrowError()
})

////////////////////////////////////////////////////////
// hslaToHsl
////////////////////////////////////////////////////////

test(`hslaToHsl`, () => {
  expect(hslaToHsl({ h: 0, s: 0, l: 0, a: 0 })).toEqual({ h: 0, s: 0, l: 0 })
  expect(hslaToHsl({ h: 0, s: 0, l: 100, a: 0 })).toEqual({ h: 0, s: 0, l: 100 })
  expect(hslaToHsl({ h: 45, s: 90, l: 50, a: 1 })).toEqual({ h: 45, s: 90, l: 50 })
  expect(hslaToHsl({ h: 60, s: 90, l: 50, a: 0 })).toEqual({ h: 60, s: 90, l: 50 })
  expect(hslaToHsl({ h: 0, s: 0, l: 100, a: 0.5 })).toEqual({ h: 0, s: 0, l: 100 })

  expect(() => hslaToHsl({ h: -1, s: 90, l: 50, a: 0 })).toThrowError()
})

////////////////////////////////////////////////////////
// hslaToCmyk
////////////////////////////////////////////////////////

test(`hslaToCmyk`, () => {
  expect(hslaToCmyk({ h: 0, s: 0, l: 0, a: 0 })).toStrictEqual({ c: 0, m: 0, y: 0, k: 100 })
  expect(hslaToCmyk({ h: 0, s: 0, l: 100, a: 1 })).toStrictEqual({ c: 0, m: 0, y: 0, k: 0 })
  expect(hslaToCmyk({ h: 45, s: 90, l: 50, a: 0 })).toStrictEqual({ c: 0, m: 24, y: 95, k: 5 })
  expect(hslaToCmyk({ h: 60, s: 90, l: 50, a: 0.5 })).toStrictEqual({ c: 0, m: 0, y: 95, k: 5 })
  expect(hslaToCmyk({ h: 70, s: 90, l: 50, a: 0 })).toStrictEqual({ c: 16, m: 0, y: 95, k: 5 })
  expect(hslaToCmyk({ h: 130, s: 90, l: 50, a: 0 })).toStrictEqual({ c: 95, m: 0, y: 79, k: 5 })
  expect(hslaToCmyk({ h: 185, s: 90, l: 50, a: 0 })).toStrictEqual({ c: 95, m: 8, y: 0, k: 5 })
  expect(hslaToCmyk({ h: 260, s: 90, l: 50, a: 0 })).toStrictEqual({ c: 63, m: 95, y: 0, k: 5 })
  expect(hslaToCmyk({ h: 310, s: 90, l: 50, a: 0 })).toStrictEqual({ c: 0, m: 95, y: 16, k: 5 })
  expect(hslaToCmyk({ h: 359, s: 90, l: 50, a: 0 })).toStrictEqual({ c: 0, m: 95, y: 93, k: 5 })

  expect(() => hslaToCmyk({ h: -1, s: 90, l: 50, a: 0 })).toThrowError()
})

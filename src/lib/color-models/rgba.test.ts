import { rgbaToHex, rgba2rgb, rgbaToCmyk, rgbaString2Object } from '../../index'

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
// rgba2rgb
////////////////////////////////////////////////////////

test(`rgba2rgb`, () => {
  expect(rgba2rgb({ r: 0, g: 0, b: 0, a: 0 })).toStrictEqual({ r: 0, g: 0, b: 0 })

  expect(() => rgba2rgb({ r: 600, g: 0, b: 0, a: 0 })).toThrowError()
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
// rgbaString2Object
////////////////////////////////////////////////////////

test(`rgbaString2Object`, () => {
  expect(rgbaString2Object('255, 0, 255, 0')).toEqual({ r: 255, g: 0, b: 255, a: 0 })
  expect(rgbaString2Object('255,0, 255, 0.5')).toEqual({ r: 255, g: 0, b: 255, a: 0.5 })
  expect(rgbaString2Object('255,  0, 255, 1')).toEqual({ r: 255, g: 0, b: 255, a: 1 })
  expect(rgbaString2Object('rgba(255, 0, 255, 0.5)')).toEqual({ r: 255, g: 0, b: 255, a: 0.5 })
  expect(rgbaString2Object('rgba(255,0, 255, 0.5)')).toEqual({ r: 255, g: 0, b: 255, a: 0.5 })
  expect(rgbaString2Object('rgba(255,  0, 255, 0.5)')).toEqual({ r: 255, g: 0, b: 255, a: 0.5 })

  expect(() => rgbaString2Object('300,  0, 255, 0.5')).toThrowError()
  expect(() => rgbaString2Object('rgba(300,  0, 255, 0.5)')).toThrowError()
  expect(() => rgbaString2Object('1')).toThrowError()
})

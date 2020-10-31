import { rgba2rgb, rgbaString2Object } from '../../index'

////////////////////////////////////////////////////////
// rgba2rgb
////////////////////////////////////////////////////////

test(`rgba2rgb`, () => {
  expect(rgba2rgb({ r: 0, g: 0, b: 0, a: 0 })).toStrictEqual({ r: 0, g: 0, b: 0 })

  expect(() => rgba2rgb({ r: 600, g: 0, b: 0, a: 0 })).toThrowError()
})

////////////////////////////////////////////////////////
// rgbaString2Object
////////////////////////////////////////////////////////

test(`rgbaString2Object`, () => {
  expect(rgbaString2Object('255, 0, 255, 0.5')).toEqual({ r: 255, g: 0, b: 255, a: 0.5 })
  expect(rgbaString2Object('255,0, 255, 0.5')).toEqual({ r: 255, g: 0, b: 255, a: 0.5 })
  expect(rgbaString2Object('255,  0, 255, 0.5')).toEqual({ r: 255, g: 0, b: 255, a: 0.5 })
  expect(rgbaString2Object('rgba(255, 0, 255, 0.5)')).toEqual({ r: 255, g: 0, b: 255, a: 0.5 })
  expect(rgbaString2Object('rgba(255,0, 255, 0.5)')).toEqual({ r: 255, g: 0, b: 255, a: 0.5 })
  expect(rgbaString2Object('rgba(255,  0, 255, 0.5)')).toEqual({ r: 255, g: 0, b: 255, a: 0.5 })

  expect(() => rgbaString2Object('1')).toThrowError()
})

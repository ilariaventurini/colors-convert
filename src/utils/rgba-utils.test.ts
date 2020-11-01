import { shortRgbaFormatToRgbaObject, fromLongToShortRgbaFormat } from './rgba-utils'

////////////////////////////////////////////////////////
// shortRgbaFormatToRgbaObject
////////////////////////////////////////////////////////

test(`shortRgbaFormatToRgbaObject`, () => {
  expect(shortRgbaFormatToRgbaObject('255, 0, 255, 0')).toEqual({ r: 255, g: 0, b: 255, a: 0 })
  expect(shortRgbaFormatToRgbaObject('255,0, 255, 0.5')).toEqual({ r: 255, g: 0, b: 255, a: 0.5 })
  expect(shortRgbaFormatToRgbaObject('255,  0, 255, 1')).toEqual({ r: 255, g: 0, b: 255, a: 1 })

  expect(() => shortRgbaFormatToRgbaObject('300,  0, 255, 0')).toThrowError()
  expect(() => shortRgbaFormatToRgbaObject('rgba(255,  0, 255, 0)')).toThrowError()
  expect(() => shortRgbaFormatToRgbaObject('1')).toThrowError()
})

////////////////////////////////////////////////////////
// fromLongToShortRgbaFormat
////////////////////////////////////////////////////////

test(`fromLongToShortRgbaFormat`, () => {
  expect(fromLongToShortRgbaFormat('rgba(255, 0, 255, 0)')).toBe('255, 0, 255, 0')
  expect(fromLongToShortRgbaFormat('rgba(255,0, 255, 0.5)')).toBe('255, 0, 255, 0.5')
  expect(fromLongToShortRgbaFormat('rgba(255,  0, 255, 1)')).toBe('255, 0, 255, 1')

  expect(() => fromLongToShortRgbaFormat('rgba(300,  0, 255, 1)')).toThrowError()
  expect(() => fromLongToShortRgbaFormat('255,  0, 255, 1')).toThrowError()
  expect(() => fromLongToShortRgbaFormat('1')).toThrowError()
})

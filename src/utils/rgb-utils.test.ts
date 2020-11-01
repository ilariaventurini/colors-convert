import { shortRgbFormatToRgbObject, fromLongToShortRgbFormat } from './rgb-utils'

////////////////////////////////////////////////////////
// shortRgbFormatToRgbObject
////////////////////////////////////////////////////////

test(`shortRgbFormatToRgbObject`, () => {
  expect(shortRgbFormatToRgbObject('255, 0, 255')).toEqual({ r: 255, g: 0, b: 255 })
  expect(shortRgbFormatToRgbObject('255,0, 255')).toEqual({ r: 255, g: 0, b: 255 })
  expect(shortRgbFormatToRgbObject('255,  0, 255')).toEqual({ r: 255, g: 0, b: 255 })

  expect(() => shortRgbFormatToRgbObject('300,  0, 255')).toThrowError()
  expect(() => shortRgbFormatToRgbObject('rgb(255,  0, 255)')).toThrowError()
  expect(() => shortRgbFormatToRgbObject('1')).toThrowError()
})

////////////////////////////////////////////////////////
// fromLongToShortRgbFormat
////////////////////////////////////////////////////////

test(`fromLongToShortRgbFormat`, () => {
  expect(fromLongToShortRgbFormat('rgb(255, 0, 255)')).toBe('255, 0, 255')
  expect(fromLongToShortRgbFormat('rgb(255,0, 255)')).toBe('255, 0, 255')
  expect(fromLongToShortRgbFormat('rgb(255,  0, 255)')).toBe('255, 0, 255')

  expect(() => fromLongToShortRgbFormat('255,  0, 255')).toThrowError()
  expect(() => fromLongToShortRgbFormat('1')).toThrowError()
})

import { shortCmykFormatToCmykObject, fromLongToShortCmykFormat } from './cmyk-utils'

////////////////////////////////////////////////////////
// shortCmykFormatToCmykObject
////////////////////////////////////////////////////////

test(`shortCmykFormatToCmykObject`, () => {
  expect(shortCmykFormatToCmykObject('0, 50, 20, 100')).toEqual({ c: 0, m: 50, y: 20, k: 100 })
  expect(shortCmykFormatToCmykObject('0,50, 20, 100')).toEqual({ c: 0, m: 50, y: 20, k: 100 })
  expect(shortCmykFormatToCmykObject('0,  50, 20, 100')).toEqual({ c: 0, m: 50, y: 20, k: 100 })

  expect(() => shortCmykFormatToCmykObject('300,  0, 100, 0')).toThrowError()
  expect(() => shortCmykFormatToCmykObject('cmyk(100,  0, 50, 0)')).toThrowError()
  expect(() => shortCmykFormatToCmykObject('1')).toThrowError()
})

////////////////////////////////////////////////////////
// fromLongToShortCmykFormat
////////////////////////////////////////////////////////

test(`fromLongToShortCmykFormat`, () => {
  expect(fromLongToShortCmykFormat('cmyk(100, 0, 43, 0)')).toBe('100, 0, 43, 0')
  expect(fromLongToShortCmykFormat('cmyk(10,0, 100, 0)')).toBe('10, 0, 100, 0')
  expect(fromLongToShortCmykFormat('cmyk(5,  0, 100, 1)')).toBe('5, 0, 100, 1')

  expect(() => fromLongToShortCmykFormat('cmyk(800,  0, 100, 1)')).toThrowError()
  expect(() => fromLongToShortCmykFormat('70,  0, 100, 1')).toThrowError()
  expect(() => fromLongToShortCmykFormat('1')).toThrowError()
})

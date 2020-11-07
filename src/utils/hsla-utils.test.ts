import { fromLongToShortFormat, shortHslaFormatToHslaObject } from './hsla-utils'

////////////////////////////////////////////////////////
// shortHslaFormatToHslaObject
////////////////////////////////////////////////////////

test(`shortHslaFormatToHslaObject`, () => {
  expect(shortHslaFormatToHslaObject('0, 0%, 0%, 0.4')).toEqual({ h: 0, s: 0, l: 0, a: 0.4 })
  expect(shortHslaFormatToHslaObject('0,0%, 0%, 0.4')).toEqual({ h: 0, s: 0, l: 0, a: 0.4 })
  expect(shortHslaFormatToHslaObject('0,   0%, 0%, 0.4')).toEqual({ h: 0, s: 0, l: 0, a: 0.4 })

  expect(() => shortHslaFormatToHslaObject('0, 0, 0%, 1')).toThrowError()
  expect(() => shortHslaFormatToHslaObject('0, 0, 0%, 33')).toThrowError()
  expect(() => shortHslaFormatToHslaObject('380,  0%, 100%, 1')).toThrowError()
  expect(() => shortHslaFormatToHslaObject('hsla(0,  0%, 50%, 1)')).toThrowError()
  expect(() => shortHslaFormatToHslaObject('1')).toThrowError()
})

////////////////////////////////////////////////////////
// fromLongToShortFormat
////////////////////////////////////////////////////////

test(`fromLongToShortFormat`, () => {
  expect(fromLongToShortFormat('hsla(100, 0%, 43%, 1)')).toBe('100, 0%, 43%, 1')
  expect(fromLongToShortFormat('hsla(10,0%, 100%, 0)')).toBe('10, 0%, 100%, 0')
  expect(fromLongToShortFormat('hsla(5,  0%, 100%, 1)')).toBe('5, 0%, 100%, 1')
  expect(fromLongToShortFormat('hsla(100, 0%, 43%, 0.4)')).toBe('100, 0%, 43%, 0.4')
  expect(fromLongToShortFormat('hsla(10,0%, 100%, 0.4)')).toBe('10, 0%, 100%, 0.4')
  expect(fromLongToShortFormat('hsla(5,  0%, 100%, 0.4)')).toBe('5, 0%, 100%, 0.4')

  expect(() => fromLongToShortFormat('hsla(800,  0%, 100%, 1)')).toThrowError()
  expect(() => fromLongToShortFormat('hsla(0,  0%, 100%, 33)')).toThrowError()
  expect(() => fromLongToShortFormat('70,  0, 100%, 1%, 1')).toThrowError()
  expect(() => fromLongToShortFormat('1')).toThrowError()
})

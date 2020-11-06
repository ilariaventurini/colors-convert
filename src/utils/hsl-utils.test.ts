import { fromLongToShortFormat, shortHslFormatToHslObject } from './hsl-utils'

////////////////////////////////////////////////////////
// shortHslFormatToHslObject
////////////////////////////////////////////////////////

test(`shortHslFormatToHslObject`, () => {
  expect(shortHslFormatToHslObject('0, 0%, 0%')).toEqual({ h: 0, s: 0, l: 0 })
  expect(shortHslFormatToHslObject('0,0%, 0%')).toEqual({ h: 0, s: 0, l: 0 })
  expect(shortHslFormatToHslObject('0,   0%, 0%')).toEqual({ h: 0, s: 0, l: 0 })

  expect(() => shortHslFormatToHslObject('0, 0, 0%')).toThrowError()
  expect(() => shortHslFormatToHslObject('380,  0%, 100%')).toThrowError()
  expect(() => shortHslFormatToHslObject('hsl(0,  0%, 50%)')).toThrowError()
  expect(() => shortHslFormatToHslObject('1')).toThrowError()
})

////////////////////////////////////////////////////////
// fromLongToShortFormat
////////////////////////////////////////////////////////

test(`fromLongToShortFormat`, () => {
  expect(fromLongToShortFormat('hsl(100, 0%, 43%)')).toBe('100, 0%, 43%')
  expect(fromLongToShortFormat('hsl(10,0%, 100%)')).toBe('10, 0%, 100%')
  expect(fromLongToShortFormat('hsl(5,  0%, 100%)')).toBe('5, 0%, 100%')

  expect(() => fromLongToShortFormat('hsl(800,  0%, 100%)')).toThrowError()
  expect(() => fromLongToShortFormat('70,  0, 100%, 1%')).toThrowError()
  expect(() => fromLongToShortFormat('1')).toThrowError()
})

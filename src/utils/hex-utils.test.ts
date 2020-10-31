import { percentToHex, hexToPercent } from './hex-utils'

////////////////////////////////////////////////////////
// percentToHex
////////////////////////////////////////////////////////

test(`percentToHex`, () => {
  expect(percentToHex(0)).toBe('00')
  expect(percentToHex(0.1)).toBe('1A')
  expect(percentToHex(0.13)).toBe('21')
  expect(percentToHex(0.5)).toBe('80')
  expect(percentToHex(0.8)).toBe('CC')
  expect(percentToHex(0.85)).toBe('D9')
  expect(percentToHex(0.855)).toBe('DA')
  expect(percentToHex(0.8555)).toBe('DA')
  expect(percentToHex(1)).toBe('FF')

  expect(() => percentToHex(-1)).toThrowError()
  expect(() => percentToHex(100)).toThrowError()
})

////////////////////////////////////////////////////////
// hexToPercent
////////////////////////////////////////////////////////

test(`hexToPercent`, () => {
  expect(hexToPercent('00')).toBe(0)
  expect(hexToPercent('1A')).toBe(0.1)
  expect(hexToPercent('21')).toBe(0.13)
  expect(hexToPercent('80')).toBe(0.5)
  expect(hexToPercent('CC')).toBe(0.8)
  expect(hexToPercent('D9')).toBe(0.85)
  expect(hexToPercent('DA')).toBe(0.85)
  expect(hexToPercent('DA', 3)).toBe(0.855)
  expect(hexToPercent('DA', 4)).toBe(0.8549)
  expect(hexToPercent('FF')).toBe(1)
  expect(hexToPercent('FF', -6)).toBe(0)

  expect(() => hexToPercent('')).toThrowError()
  expect(() => hexToPercent('F')).toThrowError()
  expect(() => hexToPercent('GA')).toThrowError()
  expect(() => hexToPercent('ABC')).toThrowError()
})

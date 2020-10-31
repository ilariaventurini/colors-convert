import { alphaToHex, hexToAlpha, hexAlphaTo0255, number0255ToHex } from './hex-utils'

////////////////////////////////////////////////////////
// alphaToHex
////////////////////////////////////////////////////////

test(`alphaToHex`, () => {
  expect(alphaToHex(0)).toBe('00')
  expect(alphaToHex(0.1)).toBe('1A')
  expect(alphaToHex(0.13)).toBe('21')
  expect(alphaToHex(0.5)).toBe('80')
  expect(alphaToHex(0.8)).toBe('CC')
  expect(alphaToHex(0.85)).toBe('D9')
  expect(alphaToHex(0.855)).toBe('DA')
  expect(alphaToHex(0.8555)).toBe('DA')
  expect(alphaToHex(1)).toBe('FF')

  expect(() => alphaToHex(-1)).toThrowError()
  expect(() => alphaToHex(100)).toThrowError()
})

////////////////////////////////////////////////////////
// hexToAlpha
////////////////////////////////////////////////////////

test(`hexToAlpha`, () => {
  expect(hexToAlpha('00')).toBe(0)
  expect(hexToAlpha('1A')).toBe(0.1)
  expect(hexToAlpha('21')).toBe(0.13)
  expect(hexToAlpha('80')).toBe(0.5)
  expect(hexToAlpha('CC')).toBe(0.8)
  expect(hexToAlpha('D9')).toBe(0.85)
  expect(hexToAlpha('DA')).toBe(0.85)
  expect(hexToAlpha('DA', 3)).toBe(0.855)
  expect(hexToAlpha('DA', 4)).toBe(0.8549)
  expect(hexToAlpha('FF')).toBe(1)
  expect(hexToAlpha('FF', -6)).toBe(0)

  expect(() => hexToAlpha('')).toThrowError()
  expect(() => hexToAlpha('F')).toThrowError()
  expect(() => hexToAlpha('GA')).toThrowError()
  expect(() => hexToAlpha('ABC')).toThrowError()
})

////////////////////////////////////////////////////////
// hexAlphaTo0255
////////////////////////////////////////////////////////

test(`hexAlphaTo0255`, () => {
  expect(hexAlphaTo0255('00')).toBe(0)
  expect(hexAlphaTo0255('1A')).toBe(26)
  expect(hexAlphaTo0255('21')).toBe(33)
  expect(hexAlphaTo0255('80')).toBe(128)
  expect(hexAlphaTo0255('CC')).toBe(204)
  expect(hexAlphaTo0255('D9')).toBe(217)
  expect(hexAlphaTo0255('DA')).toBe(217)
  expect(hexAlphaTo0255('FF')).toBe(255)

  expect(() => hexAlphaTo0255('')).toThrowError()
  expect(() => hexAlphaTo0255('F')).toThrowError()
  expect(() => hexAlphaTo0255('GA')).toThrowError()
  expect(() => hexAlphaTo0255('ABC')).toThrowError()
})

////////////////////////////////////////////////////////
// number0255ToHex
////////////////////////////////////////////////////////

test(`number0255ToHex`, () => {
  expect(number0255ToHex(0)).toBe('00')
  expect(number0255ToHex(0.2)).toBe('00')
  expect(number0255ToHex(26)).toBe('1A')
  expect(number0255ToHex(33)).toBe('21')
  expect(number0255ToHex(128)).toBe('80')
  expect(number0255ToHex(204)).toBe('CC')
  expect(number0255ToHex(217)).toBe('D9')
  expect(number0255ToHex(255)).toBe('FF')

  expect(() => number0255ToHex(-1)).toThrowError()
})

import {
  between,
  betweenMaxNotIncluded,
  decimalToHexadecimal,
  hexadecimalToDecimal,
  isInteger,
  isFloat,
  decimalsLenght,
} from './math-utils'

////////////////////////////////////////////////////////
// between
////////////////////////////////////////////////////////

test(`between`, () => {
  expect(between(5, [0, 10])).toBe(true)
  expect(between(5, [5, 10])).toBe(true)
  expect(between(5, [5, 5])).toBe(true)
  expect(between(0, [5, 10])).toBe(false)
})

////////////////////////////////////////////////////////
// betweenMaxNotIncluded
////////////////////////////////////////////////////////

test(`betweenMaxNotIncluded`, () => {
  expect(betweenMaxNotIncluded(5, [0, 10])).toBe(true)
  expect(betweenMaxNotIncluded(5, [5, 10])).toBe(true)
  expect(betweenMaxNotIncluded(5, [4, 5])).toBe(false)
  expect(betweenMaxNotIncluded(0, [5, 10])).toBe(false)
})

////////////////////////////////////////////////////////
// decimalToHexadecimal
////////////////////////////////////////////////////////

test(`decimalToHexadecimal`, () => {
  expect(decimalToHexadecimal(0)).toBe('0')
  expect(decimalToHexadecimal(1)).toBe('1')
  expect(decimalToHexadecimal(3)).toBe('3')
  expect(decimalToHexadecimal(9)).toBe('9')
  expect(decimalToHexadecimal(10)).toBe('A')
  expect(decimalToHexadecimal(15)).toBe('F')
  expect(decimalToHexadecimal(128)).toBe('80')
  expect(decimalToHexadecimal(204)).toBe('CC')
  expect(decimalToHexadecimal(217)).toBe('D9')
  expect(decimalToHexadecimal(218)).toBe('DA')
  expect(decimalToHexadecimal(255)).toBe('FF')
  expect(decimalToHexadecimal(2748)).toBe('ABC')
  expect(decimalToHexadecimal(0.00390625)).toBe('0.01')
  expect(decimalToHexadecimal(0.0625)).toBe('0.1')
  expect(decimalToHexadecimal(10.0625)).toBe('A.1')
  expect(decimalToHexadecimal(2748.94140625)).toBe('ABC.F1')
  expect(decimalToHexadecimal(-1)).toBe('1') // warn, it's ok
})

////////////////////////////////////////////////////////
// hexadecimalToDecimal
////////////////////////////////////////////////////////

test(`hexadecimalToDecimal`, () => {
  expect(hexadecimalToDecimal('0')).toBe(0)
  expect(hexadecimalToDecimal('00')).toBe(0)
  expect(hexadecimalToDecimal('1')).toBe(1)
  expect(hexadecimalToDecimal('3')).toBe(3)
  expect(hexadecimalToDecimal('03')).toBe(3)
  expect(hexadecimalToDecimal('9')).toBe(9)
  expect(hexadecimalToDecimal('A')).toBe(10)
  expect(hexadecimalToDecimal('F')).toBe(15)
  expect(hexadecimalToDecimal('80')).toBe(128)
  expect(hexadecimalToDecimal('CC')).toBe(204)
  expect(hexadecimalToDecimal('D9')).toBe(217)
  expect(hexadecimalToDecimal('DA')).toBe(218)
  expect(hexadecimalToDecimal('FF')).toBe(255)
  expect(hexadecimalToDecimal('ABC')).toBe(2748)
  expect(hexadecimalToDecimal('0.01')).toBe(0.00390625)
  expect(hexadecimalToDecimal('0.1')).toBe(0.0625)
  expect(hexadecimalToDecimal('A.1')).toBe(10.0625)
  expect(hexadecimalToDecimal('ABC.F1')).toBe(2748.94140625)

  expect(() => hexadecimalToDecimal('')).toThrowError()
  expect(() => hexadecimalToDecimal('#')).toThrowError()
  expect(() => hexadecimalToDecimal('Z')).toThrowError()
  expect(() => hexadecimalToDecimal('.0')).toThrowError()
  expect(() => hexadecimalToDecimal('AA.s')).toThrowError()
})

////////////////////////////////////////////////////////
// isInteger
////////////////////////////////////////////////////////

test(`isInteger`, () => {
  expect(isInteger(0)).toBe(true)
  expect(isInteger(-1)).toBe(true)
  expect(isInteger(10)).toBe(true)

  expect(isInteger(0.1)).toBe(false)
  expect(isInteger(0.101)).toBe(false)
  expect(isInteger(-0.101)).toBe(false)
})

////////////////////////////////////////////////////////
// isFloat
////////////////////////////////////////////////////////

test(`isFloat`, () => {
  expect(isFloat(0.1)).toBe(true)
  expect(isFloat(0.101)).toBe(true)
  expect(isFloat(-0.101)).toBe(true)

  expect(isFloat(0)).toBe(false)
  expect(isFloat(-1)).toBe(false)
  expect(isFloat(10)).toBe(false)
})

////////////////////////////////////////////////////////
// decimalsLenght
////////////////////////////////////////////////////////

test(`decimalsLenght`, () => {
  expect(decimalsLenght(0)).toBe(0)
  expect(decimalsLenght(0.1)).toBe(1)
  expect(decimalsLenght(0.1)).toBe(1)
  expect(decimalsLenght(0.101)).toBe(3)
})

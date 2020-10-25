import {
  // base10ToBase16,
  // base16ToBase10,
  // opacity01ToHex, hexOpacityTo01
  isInteger,
  isFloat,
  decimalsLenght,
} from '../utils/math-utils'

////////////////////////////////////////////////////////
// base10ToBase16
////////////////////////////////////////////////////////

// test(`base10ToBase16`, () => {
//   // expect(base10ToBase16(0)).toBe('0')
//   expect(base10ToBase16(0.5)).toBe('0.8')
//   expect(base10ToBase16(1)).toBe('1')
//   expect(base10ToBase16(10)).toBe('a')
//   expect(base10ToBase16(70.205)).toBe('46.347ae147ae14')
//   expect(base10ToBase16(100)).toBe('64')
// })

////////////////////////////////////////////////////////
// base16ToBase10
////////////////////////////////////////////////////////

// test(`base16ToBase10`, () => {
//   expect(base16ToBase10('0')).toBe(0)
//   expect(base16ToBase10('0.8')).toBe(0.5)
//   expect(base16ToBase10('1')).toBe(1)
//   expect(base16ToBase10('a')).toBe(10)
//   expect(base16ToBase10('46.347ae147ae14')).toBe(70.205)
//   expect(base16ToBase10('64')).toBe(100)
// })

// ////////////////////////////////////////////////////////
// // opacity01ToHex
// ////////////////////////////////////////////////////////

// test(`opacity01ToHex`, () => {
//   expect(opacity01ToHex(0)).toBe('00')
//   expect(opacity01ToHex(0.1)).toBe('1a')
//   expect(opacity01ToHex(0.13)).toBe('21')
//   expect(opacity01ToHex(0.5)).toBe('80')
//   expect(opacity01ToHex(0.8)).toBe('cc')
//   expect(opacity01ToHex(0.85)).toBe('d9')
//   expect(opacity01ToHex(0.855)).toBe('da')
//   expect(opacity01ToHex(0.8555)).toBe('da')
//   expect(opacity01ToHex(1)).toBe('ff')
// })

// ////////////////////////////////////////////////////////
// // hexOpacityTo01
// ////////////////////////////////////////////////////////

// test(`hexOpacityTo01`, () => {
//   expect(hexOpacityTo01('00')).toBe(0)
//   expect(hexOpacityTo01('1a')).toBe(0.1)
//   expect(hexOpacityTo01('21')).toBe(0.13)
//   expect(hexOpacityTo01('80')).toBe(0.5)
//   expect(hexOpacityTo01('cc')).toBe(0.8)
//   expect(hexOpacityTo01('d9')).toBe(0.85)
//   expect(hexOpacityTo01('da')).toBe(0.855)
//   expect(hexOpacityTo01('da')).toBe(0.8555)
//   expect(hexOpacityTo01('ff')).toBe(1)
// })
// // [
// //   { d: '00', r: 0 },
// //   { d: '1a', r: 26 },
// //   { d: '21', r: 33 },
// //   { d: '80', r: 128 },
// //   { d: 'cc', r: 204 },
// //   { d: 'd9', r: 217 },
// //   { d: 'da', r: 218 },
// //   { d: 'da', r: 218 },
// //   { d: 'ff', r: 255 }
// // ]

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

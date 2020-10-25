import // opacity01ToHex, hexOpacityTo01
'./math-utils'

////////////////////////////////////////////////////////
// opacity01ToHex
////////////////////////////////////////////////////////

test(`test`, () => {
  expect(0).toBe(0)
})

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

////////////////////////////////////////////////////////
// hexOpacityTo01
////////////////////////////////////////////////////////

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

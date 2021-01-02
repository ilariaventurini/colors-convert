import {
  hexToRgbOrRgba,
  hexToRgb,
  hexToRgba,
  hexToHexWithAlpha,
  hexToCmyk,
  hex2hsl,
  hexToHsla,
  shortToLongHex,
  colorToHex,
} from '../../index'

////////////////////////////////////////////////////////
// hexToRgbOrRgba
////////////////////////////////////////////////////////

test(`hexToRgbOrRgba`, () => {
  expect(hexToRgbOrRgba('#FFFFFF')).toStrictEqual({ r: 255, g: 255, b: 255 })
  expect(hexToRgbOrRgba('#000000')).toStrictEqual({ r: 0, g: 0, b: 0 })
  expect(hexToRgbOrRgba('#BADA55')).toStrictEqual({ r: 186, g: 217, b: 84 })
  expect(hexToRgbOrRgba('#FF00FF')).toStrictEqual({ r: 255, g: 0, b: 255 })
  expect(hexToRgbOrRgba('#F0F')).toStrictEqual({ r: 255, g: 0, b: 255 })
  expect(hexToRgbOrRgba('#FF00FF00')).toStrictEqual({ r: 255, g: 0, b: 255, a: 0 })
  expect(hexToRgbOrRgba('#FF00FFFF')).toStrictEqual({ r: 255, g: 0, b: 255, a: 1 })
  expect(hexToRgbOrRgba('#FF00FF99')).toStrictEqual({ r: 255, g: 0, b: 255, a: 0.6 })
  expect(hexToRgbOrRgba('#F0F0')).toStrictEqual({ r: 255, g: 0, b: 255, a: 0 })
  expect(hexToRgbOrRgba('#F0FF')).toStrictEqual({ r: 255, g: 0, b: 255, a: 1 })
  expect(hexToRgbOrRgba('#F0F9')).toStrictEqual({ r: 255, g: 0, b: 255, a: 0.6 })

  expect(() => hexToRgbOrRgba('')).toThrowError()
  expect(() => hexToRgbOrRgba('FFF')).toThrowError()
  expect(() => hexToRgbOrRgba('#FFK')).toThrowError()
  expect(() => hexToRgbOrRgba('#')).toThrowError()
})

////////////////////////////////////////////////////////
// hexToRgb
////////////////////////////////////////////////////////

test(`hexToRgb`, () => {
  expect(hexToRgb('#000')).toStrictEqual({ r: 0, g: 0, b: 0 })
  expect(hexToRgb('#0000')).toStrictEqual({ r: 0, g: 0, b: 0 })
  expect(hexToRgb('#000000')).toStrictEqual({ r: 0, g: 0, b: 0 })
  expect(hexToRgb('#00000000')).toStrictEqual({ r: 0, g: 0, b: 0 })
  expect(hexToRgb('#FFFFFF')).toStrictEqual({ r: 255, g: 255, b: 255 })
  expect(hexToRgb('#000000')).toStrictEqual({ r: 0, g: 0, b: 0 })
  expect(hexToRgb('#BADA55')).toStrictEqual({ r: 186, g: 217, b: 84 })
  expect(hexToRgb('#FF00FF')).toStrictEqual({ r: 255, g: 0, b: 255 })
  expect(hexToRgb('#F0F')).toStrictEqual({ r: 255, g: 0, b: 255 })

  expect(() => hexToRgb('#')).toThrowError()
})

////////////////////////////////////////////////////////
// hexToRgba
////////////////////////////////////////////////////////

test(`hexToRgba`, () => {
  expect(hexToRgba('#000')).toStrictEqual({ r: 0, g: 0, b: 0, a: 1 })
  expect(hexToRgba('#0000')).toStrictEqual({ r: 0, g: 0, b: 0, a: 0 })
  expect(hexToRgba('#000', 0)).toStrictEqual({ r: 0, g: 0, b: 0, a: 0 })
  expect(hexToRgba('#000000')).toStrictEqual({ r: 0, g: 0, b: 0, a: 1 })
  expect(hexToRgba('#00000000')).toStrictEqual({ r: 0, g: 0, b: 0, a: 0 })
  expect(hexToRgba('#000000', 0)).toStrictEqual({ r: 0, g: 0, b: 0, a: 0 })
  expect(hexToRgba('#000000', 1)).toStrictEqual({ r: 0, g: 0, b: 0, a: 1 })
  expect(hexToRgba('#000000', 0.5)).toStrictEqual({ r: 0, g: 0, b: 0, a: 0.5 })
  expect(hexToRgba('#FF00FF00')).toStrictEqual({ r: 255, g: 0, b: 255, a: 0 })
  expect(hexToRgba('#FF00FFFF')).toStrictEqual({ r: 255, g: 0, b: 255, a: 1 })
  expect(hexToRgba('#FF00FF99')).toStrictEqual({ r: 255, g: 0, b: 255, a: 0.6 })
  expect(hexToRgba('#F0F0')).toStrictEqual({ r: 255, g: 0, b: 255, a: 0 })
  expect(hexToRgba('#F0FF')).toStrictEqual({ r: 255, g: 0, b: 255, a: 1 })
  expect(hexToRgba('#F0F9')).toStrictEqual({ r: 255, g: 0, b: 255, a: 0.6 })

  expect(() => hexToRgba('#', 1)).toThrowError()
  expect(() => hexToRgba('#000000', 10)).toThrowError()
})

////////////////////////////////////////////////////////
// hexToHexWithAlpha
////////////////////////////////////////////////////////

test(`hexToHexWithAlpha`, () => {
  expect(hexToHexWithAlpha('#000000', 0)).toBe('#00000000')
  expect(hexToHexWithAlpha('#000000')).toBe('#000000FF')
  expect(hexToHexWithAlpha('#000000', 1)).toBe('#000000FF')
  expect(hexToHexWithAlpha('#000', 1)).toBe('#000000FF')
  expect(hexToHexWithAlpha('#000', 0.6)).toBe('#00000099')
  expect(hexToHexWithAlpha('#000F', 1)).toBe('#000000FF')
  expect(hexToHexWithAlpha('#000000FF', 1)).toBe('#000000FF')
  expect(hexToHexWithAlpha('#000000', 0.6)).toBe('#00000099')

  expect(() => hexToHexWithAlpha('#', 1)).toThrowError()
  expect(() => hexToHexWithAlpha('#000000', 10)).toThrowError()
})

////////////////////////////////////////////////////////
// hexToCmyk
////////////////////////////////////////////////////////

test(`hexToCmyk`, () => {
  expect(hexToCmyk('#FFFFFF')).toStrictEqual({ c: 0, m: 0, y: 0, k: 0 })
  expect(hexToCmyk('#000000')).toStrictEqual({ c: 0, m: 0, y: 0, k: 100 })
  expect(hexToCmyk('#4287F5')).toStrictEqual({ c: 73, m: 45, y: 0, k: 4 })
  expect(hexToCmyk('#000')).toStrictEqual({ c: 0, m: 0, y: 0, k: 100 })
  expect(hexToCmyk('#000F')).toStrictEqual({ c: 0, m: 0, y: 0, k: 100 })
  expect(hexToCmyk('#00000000')).toStrictEqual({ c: 0, m: 0, y: 0, k: 100 })

  expect(() => hexToCmyk('#')).toThrowError()
})

////////////////////////////////////////////////////////
// hex2hsl
////////////////////////////////////////////////////////

test(`hex2hsl`, () => {
  expect(hex2hsl('#000000')).toEqual({ h: 0, s: 0, l: 0 })
  expect(hex2hsl('#000000FF')).toEqual({ h: 0, s: 0, l: 0 })
  expect(hex2hsl('#FFFFFF')).toEqual({ h: 0, s: 0, l: 100 })
  expect(hex2hsl('#F2B90D')).toEqual({ h: 45, s: 90, l: 50 })
  expect(hex2hsl('#F2F20D')).toEqual({ h: 60, s: 90, l: 50 })
  expect(hex2hsl('#CCF20D')).toEqual({ h: 70, s: 90, l: 50 })
  expect(hex2hsl('#0DF233')).toEqual({ h: 130, s: 90, l: 50 })
  expect(hex2hsl('#0DDFF2')).toEqual({ h: 185, s: 90, l: 50 })
  expect(hex2hsl('#590DF2')).toEqual({ h: 260, s: 90, l: 50 })
  expect(hex2hsl('#F20DCC')).toEqual({ h: 310, s: 90, l: 50 })
  expect(hex2hsl('#F20D11')).toEqual({ h: 359, s: 90, l: 50 })
  expect(hex2hsl('#000')).toEqual({ h: 0, s: 0, l: 0 })
  expect(hex2hsl('#000F')).toEqual({ h: 0, s: 0, l: 0 })

  expect(() => hex2hsl('#')).toThrowError()
})

////////////////////////////////////////////////////////
// hexToHsla
////////////////////////////////////////////////////////

test(`hexToHsla`, () => {
  expect(hexToHsla('#FF00FF')).toEqual({ h: 300, s: 100, l: 50, a: 1 })
  expect(hexToHsla('#F0F')).toEqual({ h: 300, s: 100, l: 50, a: 1 })
  expect(hexToHsla('#F0F0')).toEqual({ h: 300, s: 100, l: 50, a: 0 })
  expect(hexToHsla('#FF00FF', 0.5)).toEqual({ h: 300, s: 100, l: 50, a: 0.5 })
  expect(hexToHsla('#F0F', 0.5)).toEqual({ h: 300, s: 100, l: 50, a: 0.5 })
  expect(hexToHsla('#FF00FF99')).toEqual({ h: 300, s: 100, l: 50, a: 0.6 })
  expect(hexToHsla('#F0F9')).toEqual({ h: 300, s: 100, l: 50, a: 0.6 })
  expect(hexToHsla('#F0F', 0.6)).toEqual({ h: 300, s: 100, l: 50, a: 0.6 })
  expect(hexToHsla('#FF00FF99', 1)).toEqual({ h: 300, s: 100, l: 50, a: 0.6 })

  expect(() => hexToHsla('#000F', 3)).toThrowError()
  expect(() => hexToHsla('#')).toThrowError()
})

////////////////////////////////////////////////////////
// shortToLongHex
////////////////////////////////////////////////////////

test(`shortToLongHex`, () => {
  expect(shortToLongHex('#0F0')).toBe('#00FF00')
  expect(shortToLongHex('#09C')).toBe('#0099CC')
  expect(shortToLongHex('#09CA')).toBe('#0099CCAA')
  expect(shortToLongHex('#FF00FF')).toBe('#FF00FF')
  expect(shortToLongHex('#FF00FFAA')).toBe('#FF00FFAA')

  expect(() => shortToLongHex('#')).toThrowError()
})

////////////////////////////////////////////////////////
// colorToHex
////////////////////////////////////////////////////////

test(`colorToHex`, () => {
  expect(colorToHex('#FFFFFF')).toEqual('#FFFFFF')
  expect(colorToHex('#FFFFFF00')).toEqual('#FFFFFF00')
  expect(colorToHex('#FFF')).toEqual('#FFF')
  expect(colorToHex({ r: 0, g: 0, b: 0 })).toEqual('#000000')
  expect(colorToHex({ r: 0, g: 0, b: 0, a: 0.6 })).toEqual('#00000099')
  expect(colorToHex({ c: 0, m: 100, y: 0, k: 0 })).toEqual('#FF00FF')
  expect(colorToHex({ h: 0, s: 0, l: 100 })).toEqual('#FFFFFF')
  expect(colorToHex({ h: 0, s: 0, l: 0, a: 0.2 })).toEqual('#00000033')

  expect(() => colorToHex('#')).toThrowError()
})

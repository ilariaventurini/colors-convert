import { colorToString, colorToCssString, stringToColor, isHex } from '../../index'
import { isCmyk, isColor, isHsl, isHsla, isRgb, isRgba } from '../types/isType'

////////////////////////////////////////////////////////
// colorToString
////////////////////////////////////////////////////////

test(`colorToString`, () => {
  expect(colorToString('#000000')).toBe('#000000')
  expect(colorToString({ r: 0, g: 0, b: 0 })).toBe('0, 0, 0')
  expect(colorToString({ r: 0, g: 0, b: 0, a: 0 })).toBe('0, 0, 0, 0')
  expect(colorToString({ c: 0, m: 0, y: 0, k: 0 })).toBe('0%, 0%, 0%, 0%')
  expect(colorToString({ h: 0, s: 0, l: 0 })).toBe('0, 0%, 0%')
  expect(colorToString({ h: 0, s: 0, l: 0, a: 0 })).toBe('0, 0%, 0%, 0')

  expect(() => colorToString('#')).toThrowError()
})

////////////////////////////////////////////////////////
// colorToCssString
////////////////////////////////////////////////////////

test(`colorToCssString`, () => {
  expect(colorToCssString('#000000')).toBe('#000000')
  expect(colorToCssString({ r: 0, g: 0, b: 0 })).toBe('rgb(0, 0, 0)')
  expect(colorToCssString({ r: 0, g: 0, b: 0, a: 0 })).toBe('rgba(0, 0, 0, 0)')
  expect(colorToCssString({ c: 0, m: 0, y: 0, k: 0 })).toBe('cmyk(0%, 0%, 0%, 0%)')
  expect(colorToCssString({ h: 0, s: 0, l: 0 })).toBe('hsl(0, 0%, 0%)')
  expect(colorToCssString({ h: 0, s: 0, l: 0, a: 0 })).toBe('hsla(0, 0%, 0%, 0)')

  expect(() => colorToCssString('#')).toThrowError()
})

////////////////////////////////////////////////////////
// stringToColor
////////////////////////////////////////////////////////

test(`stringToColor`, () => {
  expect(isHex(stringToColor('#000000'))).toBe(true)
  expect(isHex(stringToColor('#ffF000'))).toBe(true)
  expect(isRgb(stringToColor('rgb(0, 0, 0)'))).toBe(true)
  expect(isRgba(stringToColor('rgba(0, 0, 0, 1)'))).toBe(true)
  expect(isCmyk(stringToColor('cmyk(0, 0, 0, 0)'))).toBe(true)
  expect(isHsl(stringToColor('hsl(0, 0%, 0%)'))).toBe(true)
  expect(isHsla(stringToColor('hsla(0, 0%, 0%, 0)'))).toBe(true)

  expect(() => stringToColor('#')).toThrowError()
})

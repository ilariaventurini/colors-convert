import { colorToString, colorToCssString } from '../../index'

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

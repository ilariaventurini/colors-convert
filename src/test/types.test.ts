import { isHex, isRgb, isRgba } from '../index'

////////////////////////////////////////////////////////
// isHex
////////////////////////////////////////////////////////

// test valid hex
const HEX_VALID = ['#000000', '#FFFFFF', '#efefef', '#eFeeFa', '#FFF', '#0a0A00', '#000', '#EfE']
HEX_VALID.forEach(color => test(color, () => expect(isHex(color)).toBe(true)))

// test not valid hex
const HEX_NOT_VALID = ['', '#', '#0', '#00', '#0000', '0a0A00', '#000ZGF']
HEX_NOT_VALID.forEach(color => test(color, () => expect(isHex(color)).toBe(false)))


////////////////////////////////////////////////////////
// isRgb
////////////////////////////////////////////////////////

// test valid rgb
const RGB_VALID = [{ r: 0, g: 0, b: 0 }, { r: 255, g: 255, b: 255 }, { r: 10, g: 255, b: 100 }, { r: 2, g: 2, b: 2 }]
RGB_VALID.forEach(color => test(JSON.stringify(color), () => expect(isRgb(color)).toBe(true)))

// test not valid rgb
const RGB_NOT_VALID = [{}, { r: 0 }, { b: 0 }, { r: 0, g: 0, b: 0, a: 1 }, { r: -1, g: 0, b: 0 }, { r: 300, g: 0, b: 0 }, { r: 'twenty', g: 0, b: 0 }]
RGB_NOT_VALID.forEach(color => test(JSON.stringify(color), () => expect(isRgb(color)).toBe(false)))

////////////////////////////////////////////////////////
// isRgba
////////////////////////////////////////////////////////

// test valid rgba
const RGBA_VALID = [{ r: 0, g: 0, b: 0, a: 0 }, { r: 255, g: 255, b: 255, a: 1 }, { r: 10, g: 255, b: 100, a: 0.5 }, { r: 2, g: 2, b: 2, a: 1 }]
RGBA_VALID.forEach(color => test(JSON.stringify(color), () => expect(isRgba(color)).toBe(true)))

// test not valid rgba
const RGBA_NOT_VALID = [{}, { r: 0 }, { b: 0 }, { r: 0, g: 0, b: 0, a: 0, o: 3 }, { r: -1, g: 0, b: 0, a: 0 }, { r: 300, g: 0, b: 0, a: 0 }, { r: 'twenty', g: 0, b: 0, a: 0 }]
RGBA_NOT_VALID.forEach(color => test(JSON.stringify(color), () => expect(isRgba(color)).toBe(false)))
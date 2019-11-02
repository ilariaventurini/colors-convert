import { isHex } from '../index'

////////////////////////////////////////////////////////
// isHex
////////////////////////////////////////////////////////

// test single hex color
const color = '#efefef'
test(color, () => expect(isHex(color)).toBe(true));

// test valid hex
const HEX_VALID = ['#000000', '#FFFFFF', '#efefef', '#eFeeFa', '#FFF', '#0a0A00', '#000', '#EfE']
HEX_VALID.forEach(color => test(color, () => expect(isHex(color)).toBe(true)))

// test not valid hex
const HEX_NOT_VALID = ['', '#', '#0', '#00', '#0000', '0a0A00', '#000ZGF']
HEX_NOT_VALID.forEach(color => test(color, () => expect(isHex(color)).toBe(false)))
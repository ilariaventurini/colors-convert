import { color2string, color2cssString } from '../index';
////////////////////////////////////////////////////////
// color2string
////////////////////////////////////////////////////////
test("color2string", function () {
    expect(color2string('#000000')).toBe('#000000');
    expect(color2string({ r: 0, g: 0, b: 0 })).toBe('0, 0, 0');
    expect(color2string({ r: 0, g: 0, b: 0, a: 0 })).toBe('0, 0, 0, 0');
    expect(color2string({ c: 0, m: 0, y: 0, k: 0 })).toBe('0%, 0%, 0%, 0%');
    // expect(color2string('')).toThrow(new Error(' is not a color.'))
});
////////////////////////////////////////////////////////
// color2cssString
////////////////////////////////////////////////////////
test("color2cssString", function () {
    expect(color2cssString('#000000')).toBe('#000000');
    expect(color2cssString({ r: 0, g: 0, b: 0 })).toBe('rgb(0, 0, 0)');
    expect(color2cssString({ r: 0, g: 0, b: 0, a: 0 })).toBe('rgba(0, 0, 0, 0)');
    expect(color2cssString({ c: 0, m: 0, y: 0, k: 0 })).toBe('cmyk(0%, 0%, 0%, 0%)');
    // expect(color2cssString('')).toThrow(new Error(' is not a color.'))
});
//# sourceMappingURL=color.test.js.map
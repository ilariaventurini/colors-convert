import { color2string, color2cssString, hex2rgbOrRgba, hex2rgba, rgb2hex, hex2hexWithAlpha, hex2cmyk, rgb2cmyk, cmyk2rgb, cmyk2hex } from '../index';
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
////////////////////////////////////////////////////////
// hex2rgbOrRgba
////////////////////////////////////////////////////////
test("hex2rgbOrRgba", function () {
    expect(hex2rgbOrRgba('#000000')).toStrictEqual({ r: 0, g: 0, b: 0 });
    expect(hex2rgbOrRgba('#00000000')).toStrictEqual({ r: 0, g: 0, b: 0, a: 0 });
    // expect(hex2rgbOrRgba('')).toThrow(new Error(' is not a hex color.'))
});
////////////////////////////////////////////////////////
// hex2rgba
////////////////////////////////////////////////////////
test("hex2rgba", function () {
    expect(hex2rgba('#000000')).toStrictEqual({ r: 0, g: 0, b: 0, a: 1 });
    expect(hex2rgba('#00000000')).toStrictEqual({ r: 0, g: 0, b: 0, a: 0 });
    expect(hex2rgba('#000000', 0)).toStrictEqual({ r: 0, g: 0, b: 0, a: 0 });
    expect(hex2rgba('#000000', 1)).toStrictEqual({ r: 0, g: 0, b: 0, a: 1 });
    expect(hex2rgba('#000000', 0.5)).toStrictEqual({ r: 0, g: 0, b: 0, a: 0.5 });
    // expect(hex2rgba('')).toThrow(new Error(' is not a hex color.'))
    // expect(hex2rgba('#000000', 3)).toThrow(new Error('3 is not in the range [0, 1].'))
});
////////////////////////////////////////////////////////
// rgb2hex
////////////////////////////////////////////////////////
test("rgb2hex", function () {
    expect(rgb2hex({ r: 0, g: 0, b: 0 })).toBe('#000000');
    expect(rgb2hex({ r: 255, g: 255, b: 255 })).toBe('#ffffff');
    // expect(rgb2hex({})).toThrow(new Error('{} is not a rgb color.'))
});
////////////////////////////////////////////////////////
// hex2hexWithAlpha
////////////////////////////////////////////////////////
test("hex2hexWithAlpha", function () {
    expect(hex2hexWithAlpha('#000000', 0)).toBe('#00000000');
    expect(hex2hexWithAlpha('#000000', 1)).toBe('#000000ff');
    expect(hex2hexWithAlpha('#000', 1)).toBe('#000ff');
    // expect(hex2hexWithAlpha('')).toThrow(new Error(' is not a hex color.'))
    // expect(hex2hexWithAlpha('#000000', 3)).toThrow(new Error('3 is not in the range [0, 1].'))
});
////////////////////////////////////////////////////////
// rgb2cmyk
////////////////////////////////////////////////////////
test("rgb2cmyk", function () {
    expect(rgb2cmyk({ r: 0, g: 0, b: 0 })).toStrictEqual({ c: 0, m: 0, y: 0, k: 100 });
    expect(rgb2cmyk({ r: 255, g: 255, b: 255 })).toStrictEqual({ c: 0, m: 0, y: 0, k: 0 });
    expect(rgb2cmyk({ r: 66, g: 135, b: 245 })).toStrictEqual({ c: 73, m: 45, y: 0, k: 4 });
    // expect(rgb2cmyk('')).toThrow(new Error(' is not a rgb color.'))
});
////////////////////////////////////////////////////////
// hex2cmyk
////////////////////////////////////////////////////////
test("hex2cmyk", function () {
    expect(hex2cmyk('#ffffff')).toStrictEqual({ c: 0, m: 0, y: 0, k: 0 });
    expect(hex2cmyk('#000000')).toStrictEqual({ c: 0, m: 0, y: 0, k: 100 });
    expect(hex2cmyk('#4287f5')).toStrictEqual({ c: 73, m: 45, y: 0, k: 4 });
    expect(hex2cmyk('#000')).toStrictEqual({ c: 0, m: 0, y: 0, k: 100 });
    expect(hex2cmyk('#00000000')).toStrictEqual({ c: 0, m: 0, y: 0, k: 100 });
    // expect(hex2cmyk('')).toThrow(new Error(' is not a hex color.'))
});
////////////////////////////////////////////////////////
// cmyk2rgb
////////////////////////////////////////////////////////
test("cmyk2rgb", function () {
    expect(cmyk2rgb({ c: 0, m: 0, y: 0, k: 100 })).toStrictEqual({ r: 0, g: 0, b: 0 });
    expect(cmyk2rgb({ c: 0, m: 0, y: 0, k: 0 })).toStrictEqual({ r: 255, g: 255, b: 255 });
    expect(cmyk2rgb({ c: 73, m: 45, y: 0, k: 4 })).toStrictEqual({ r: 66, g: 135, b: 245 });
    // expect(hex2cmyk('')).toThrow(new Error(' is not a cmyk color.'))
});
////////////////////////////////////////////////////////
// cmyk2hex
////////////////////////////////////////////////////////
test("cmyk2hex", function () {
    expect(cmyk2hex({ c: 0, m: 0, y: 0, k: 0 })).toStrictEqual('#ffffff');
    expect(cmyk2hex({ c: 0, m: 0, y: 0, k: 100 })).toStrictEqual('#000000');
    expect(cmyk2hex({ c: 73, m: 45, y: 0, k: 4 })).toStrictEqual('#4287f5');
    // expect(cmyk2hex('')).toThrow(new Error(' is not a cmyk color.'))
});
//# sourceMappingURL=conversion.test.js.map
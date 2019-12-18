import { isHex, isRgb, isRgba, isCmyk, isColor } from '../index';
////////////////////////////////////////////////////////
// isHex
////////////////////////////////////////////////////////
test("isHex", function () {
    expect(isHex('#000000')).toBe(true);
    expect(isHex('#a00000')).toBe(true);
    expect(isHex('#A00000')).toBe(true);
    expect(isHex('#000')).toBe(true);
    expect(isHex('#00000')).toBe(true);
    expect(isHex('#00000000')).toBe(true);
    expect(isHex('')).toBe(false);
    expect(isHex('#')).toBe(false);
    expect(isHex('#0')).toBe(false);
    expect(isHex('#00')).toBe(false);
    expect(isHex('000')).toBe(false);
    expect(isHex('#0000000')).toBe(false);
    expect(isHex('#000000000')).toBe(false);
    expect(isHex('#00000Z')).toBe(false);
});
////////////////////////////////////////////////////////
// isRgb
////////////////////////////////////////////////////////
test("isRgb", function () {
    expect(isRgb({ r: 0, g: 0, b: 0 })).toBe(true);
    expect(isRgb({ r: 255, g: 255, b: 255 })).toBe(true);
    expect(isRgb({})).toBe(false);
    expect(isRgb({ r: 0 })).toBe(false);
    expect(isRgb({ b: 0 })).toBe(false);
    expect(isRgb({ r: 0, g: 0, b: 0, a: 1 })).toBe(false);
    expect(isRgb({ r: -1, g: 0, b: 0 })).toBe(false);
    expect(isRgb({ r: 300, g: 0, b: 0 })).toBe(false);
    expect(isRgb({ r: 'zero', g: 0, b: 0 })).toBe(false);
});
////////////////////////////////////////////////////////
// isRgba
////////////////////////////////////////////////////////
test("isRgba", function () {
    expect(isRgba({ r: 0, g: 0, b: 0, a: 0 })).toBe(true);
    expect(isRgba({ r: 255, g: 255, b: 255, a: 1 })).toBe(true);
    expect(isRgba({})).toBe(false);
    expect(isRgba({ r: 0 })).toBe(false);
    expect(isRgba({ b: 0 })).toBe(false);
    expect(isRgba({ r: 0, g: 0, b: 0, a: 0, o: 3 })).toBe(false);
    expect(isRgba({ r: -1, g: 0, b: 0, a: 0 })).toBe(false);
    expect(isRgba({ r: 300, g: 0, b: 0, a: 0 })).toBe(false);
    expect(isRgba({ r: 'zero', g: 0, b: 0, a: 0 })).toBe(false);
    expect(isRgba({ r: 0, g: 0, b: 0, a: 3 })).toBe(false);
});
////////////////////////////////////////////////////////
// isCmyk
////////////////////////////////////////////////////////
test("isCmyk", function () {
    expect(isCmyk({ c: 0, m: 0, y: 0, k: 0 })).toBe(true);
    expect(isCmyk({ c: 100, m: 100, y: 100, k: 100 })).toBe(true);
    expect(isCmyk({ c: 73, m: 45, y: 0, k: 4 })).toBe(true);
    expect(isCmyk({})).toBe(false);
    expect(isCmyk({ c: 0 })).toBe(false);
    expect(isCmyk({ y: 0 })).toBe(false);
    expect(isCmyk({ c: 0, m: 0, y: 0, k: 0, o: 3 })).toBe(false);
    expect(isCmyk({ c: -1, m: 0, y: 0, k: 0 })).toBe(false);
    expect(isCmyk({ c: 300, m: 0, y: 0, k: 0 })).toBe(false);
    expect(isCmyk({ c: 'twenty', m: 0, y: 0, k: 0 })).toBe(false);
});
////////////////////////////////////////////////////////
// isColor
////////////////////////////////////////////////////////
test("isColor", function () {
    expect(isColor('#000000')).toBe(true);
    expect(isColor({ a: '' })).toBe(false);
});
//# sourceMappingURL=types.test.js.map
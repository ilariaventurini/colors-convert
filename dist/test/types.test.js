"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../index");
////////////////////////////////////////////////////////
// isHex
////////////////////////////////////////////////////////
test("isHex", function () {
    expect(index_1.isHex('#000000')).toBe(true);
    expect(index_1.isHex('#a00000')).toBe(true);
    expect(index_1.isHex('#A00000')).toBe(true);
    expect(index_1.isHex('#000')).toBe(true);
    expect(index_1.isHex('#00000')).toBe(true);
    expect(index_1.isHex('#00000000')).toBe(true);
    expect(index_1.isHex('')).toBe(false);
    expect(index_1.isHex('#')).toBe(false);
    expect(index_1.isHex('#0')).toBe(false);
    expect(index_1.isHex('#00')).toBe(false);
    expect(index_1.isHex('000')).toBe(false);
    expect(index_1.isHex('#0000000')).toBe(false);
    expect(index_1.isHex('#000000000')).toBe(false);
    expect(index_1.isHex('#00000Z')).toBe(false);
});
////////////////////////////////////////////////////////
// isRgb
////////////////////////////////////////////////////////
test("isRgb", function () {
    expect(index_1.isRgb({ r: 0, g: 0, b: 0 })).toBe(true);
    expect(index_1.isRgb({ r: 255, g: 255, b: 255 })).toBe(true);
    expect(index_1.isRgb({})).toBe(false);
    expect(index_1.isRgb({ r: 0 })).toBe(false);
    expect(index_1.isRgb({ b: 0 })).toBe(false);
    expect(index_1.isRgb({ r: 0, g: 0, b: 0, a: 1 })).toBe(false);
    expect(index_1.isRgb({ r: -1, g: 0, b: 0 })).toBe(false);
    expect(index_1.isRgb({ r: 300, g: 0, b: 0 })).toBe(false);
    expect(index_1.isRgb({ r: 'zero', g: 0, b: 0 })).toBe(false);
});
////////////////////////////////////////////////////////
// isRgba
////////////////////////////////////////////////////////
test("isRgba", function () {
    expect(index_1.isRgba({ r: 0, g: 0, b: 0, a: 0 })).toBe(true);
    expect(index_1.isRgba({ r: 255, g: 255, b: 255, a: 1 })).toBe(true);
    expect(index_1.isRgba({})).toBe(false);
    expect(index_1.isRgba({ r: 0 })).toBe(false);
    expect(index_1.isRgba({ b: 0 })).toBe(false);
    expect(index_1.isRgba({ r: 0, g: 0, b: 0, a: 0, o: 3 })).toBe(false);
    expect(index_1.isRgba({ r: -1, g: 0, b: 0, a: 0 })).toBe(false);
    expect(index_1.isRgba({ r: 300, g: 0, b: 0, a: 0 })).toBe(false);
    expect(index_1.isRgba({ r: 'zero', g: 0, b: 0, a: 0 })).toBe(false);
    expect(index_1.isRgba({ r: 0, g: 0, b: 0, a: 3 })).toBe(false);
});
////////////////////////////////////////////////////////
// isCmyk
////////////////////////////////////////////////////////
test("isCmyk", function () {
    expect(index_1.isCmyk({ c: 0, m: 0, y: 0, k: 0 })).toBe(true);
    expect(index_1.isCmyk({ c: 100, m: 100, y: 100, k: 100 })).toBe(true);
    expect(index_1.isCmyk({})).toBe(false);
    expect(index_1.isCmyk({ c: 0 })).toBe(false);
    expect(index_1.isCmyk({ y: 0 })).toBe(false);
    expect(index_1.isCmyk({ c: 0, m: 0, y: 0, k: 0, o: 3 })).toBe(false);
    expect(index_1.isCmyk({ c: -1, m: 0, y: 0, k: 0 })).toBe(false);
    expect(index_1.isCmyk({ c: 300, m: 0, y: 0, k: 0 })).toBe(false);
    expect(index_1.isCmyk({ c: 'twenty', m: 0, y: 0, k: 0 })).toBe(false);
});
////////////////////////////////////////////////////////
// isColor
////////////////////////////////////////////////////////
test("isColor", function () {
    expect(index_1.isColor('#000000')).toBe(true);
    expect(index_1.isColor({ a: '' })).toBe(false);
});

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../index");
var colors_1 = require("./colors");
////////////////////////////////////////////////////////
// isHex
////////////////////////////////////////////////////////
// test valid hex
colors_1.colors.forEach(function (_a) {
    var name = _a.name, hex = _a.hex, opacity = _a.opacity;
    return test("isHex: " + name + " (" + hex + ", " + opacity + ")", function () { return expect(index_1.isHex(hex)).toBe(true); });
});
// test not valid hex
var HEX_NOT_VALID = ['', '#', '#0', '#00', '#0000', '0a0A00', '#000ZGF', '#FFFFFFGG'];
HEX_NOT_VALID.forEach(function (color) { return test(color, function () { return expect(index_1.isHex(color)).toBe(false); }); });
////////////////////////////////////////////////////////
// isRgb
////////////////////////////////////////////////////////
// test valid rgb
colors_1.colors.forEach(function (_a) {
    var name = _a.name, rgb = _a.rgb;
    return test("isHex: " + name + " (" + rgb + ")", function () { return expect(index_1.isRgb(rgb)).toBe(true); });
});
// test not valid rgb
var RGB_NOT_VALID = [
    {},
    { r: 0 },
    { b: 0 },
    { r: 0, g: 0, b: 0, a: 1 },
    { r: -1, g: 0, b: 0 },
    { r: 300, g: 0, b: 0 },
    { r: 'twenty', g: 0, b: 0 },
];
RGB_NOT_VALID.forEach(function (color) { return test(JSON.stringify(color), function () { return expect(index_1.isRgb(color)).toBe(false); }); });
////////////////////////////////////////////////////////
// isRgba
////////////////////////////////////////////////////////
// test valid rgba
colors_1.colors.forEach(function (_a) {
    var name = _a.name, rgba = _a.rgba;
    return test("isHex: " + name + " (" + rgba + ")", function () { return expect(index_1.isRgba(rgba)).toBe(true); });
});
// test not valid rgba
var RGBA_NOT_VALID = [
    {},
    { r: 0 },
    { b: 0 },
    { r: 0, g: 0, b: 0, a: 0, o: 3 },
    { r: -1, g: 0, b: 0, a: 0 },
    { r: 300, g: 0, b: 0, a: 0 },
    { r: 'twenty', g: 0, b: 0, a: 0 },
];
RGBA_NOT_VALID.forEach(function (color) {
    return test(JSON.stringify(color), function () { return expect(index_1.isRgba(color)).toBe(false); });
});
////////////////////////////////////////////////////////
// isCmyk
////////////////////////////////////////////////////////
// test valid cmyk
colors_1.colors.forEach(function (_a) {
    var name = _a.name, cmyk = _a.cmyk;
    return test("isHex: " + name + " (" + cmyk + ")", function () { return expect(index_1.isCmyk(cmyk)).toBe(true); });
});
// test not valid cmyk
var CMYK_NOT_VALID = [
    {},
    { c: 0 },
    { y: 0 },
    { c: 0, m: 0, y: 0, k: 0, o: 3 },
    { c: -1, m: 0, y: 0, k: 0 },
    { c: 300, m: 0, y: 0, k: 0 },
    { c: 'twenty', m: 0, y: 0, k: 0 },
];
CMYK_NOT_VALID.forEach(function (color) {
    return test(JSON.stringify(color), function () { return expect(index_1.isCmyk(color)).toBe(false); });
});
////////////////////////////////////////////////////////
// isColor
////////////////////////////////////////////////////////
// TODO: add tests

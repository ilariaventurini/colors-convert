"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../index");
var colors_1 = require("./colors");
////////////////////////////////////////////////////////
// color2string
////////////////////////////////////////////////////////
var STRING_VALID = [
    '#ffffff',
    { r: 0, g: 0, b: 0 },
    { r: 0, g: 0, b: 0, a: 0 },
    { c: 0, m: 0, y: 0, k: 0 },
];
var STRING_VALID_CHECK = ['#FFFFFF', "0, 0, 0", "0, 0, 0, 0", "0%, 0%, 0%, 0%"];
STRING_VALID.forEach(function (color, i) {
    return test(JSON.stringify(color), function () { return expect(index_1.color2string(color)).toBe(STRING_VALID_CHECK[i]); });
});
////////////////////////////////////////////////////////
// color2cssString
////////////////////////////////////////////////////////
var STRING_CSS_VALID = [
    '#ffffff',
    { r: 0, g: 0, b: 0 },
    { r: 0, g: 0, b: 0, a: 0 },
    { c: 0, m: 0, y: 0, k: 0 },
];
var STRING_CSS_VALID_CHECK = [
    '#FFFFFF',
    "rgb(0, 0, 0)",
    "rgba(0, 0, 0, 0)",
    "cmyk(0%, 0%, 0%, 0%)",
];
STRING_CSS_VALID.forEach(function (color, i) {
    return test(JSON.stringify(color), function () { return expect(index_1.color2cssString(color)).toBe(STRING_CSS_VALID_CHECK[i]); });
});
////////////////////////////////////////////////////////
// hex2rgbOrRgba
////////////////////////////////////////////////////////
colors_1.colors.forEach(function (_a) {
    var name = _a.name, hex = _a.hex, rgb = _a.rgb, rgba = _a.rgba;
    return test("hex2rgbOrRgba: " + name + " (" + hex + ")", function () {
        if (hex.length > 7)
            expect(index_1.hex2rgbOrRgba(hex)).toStrictEqual(rgba);
        else
            expect(index_1.hex2rgbOrRgba(hex)).toStrictEqual(rgb);
    });
});
////////////////////////////////////////////////////////
// hex2rgba
////////////////////////////////////////////////////////
colors_1.colors.forEach(function (_a) {
    var name = _a.name, hex = _a.hex, rgba = _a.rgba, opacity = _a.opacity;
    return test("hex2rgba: " + name + " (" + hex + ", " + opacity + ")", function () { return expect(index_1.hex2rgba(hex)).toStrictEqual(rgba); });
});
////////////////////////////////////////////////////////
// rgb2hex
////////////////////////////////////////////////////////
colors_1.colors
    .filter(function (c) { return c.hex.length === 7; })
    .forEach(function (_a) {
    var name = _a.name, hex = _a.hex, rgb = _a.rgb;
    return test("rgb2hex: " + name + " (" + hex + ")", function () { return expect(index_1.rgb2hex(rgb)).toStrictEqual(hex); });
});
////////////////////////////////////////////////////////
// hex2hexWithAlpha
////////////////////////////////////////////////////////
colors_1.colors
    .filter(function (c) { return c.hex.length === 9; })
    .forEach(function (_a) {
    var name = _a.name, hex = _a.hex, opacity = _a.opacity;
    var hexWithoutAlpha = hex.slice(0, 7);
    return test("hex2hexWithAlpha: " + name + " (" + hexWithoutAlpha + ")", function () {
        return expect(index_1.hex2hexWithAlpha(hexWithoutAlpha, opacity)).toStrictEqual(hex);
    });
});

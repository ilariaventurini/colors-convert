"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("../lib/utils");
// Accept:
//  - long form: #FFFFFF
//  - short form: #FFF
//  - long form with opacity: #FFFFFFFF (white with opacity FF=1)
function isHex(color) {
    var reg = /^#([0-9A-F]{3}){1,2}([0-9A-F]{2})?$/i;
    return reg.test(color);
}
exports.isHex = isHex;
// Accept an object like this {r, g, b} with r,b,g numeric values in range [0, 255]
function isRgb(color) {
    var keys = Object.keys(color);
    if (keys.length !== 3)
        return false;
    if (!utils_1.sameContent(keys, ['r', 'g', 'b']))
        return false;
    var isValid = function (value) { return typeof value === 'number' && utils_1.between(value, [0, 255]); };
    var r = isValid(color.r);
    var g = isValid(color.g);
    var b = isValid(color.b);
    return r && g && b;
}
exports.isRgb = isRgb;
// TODO: add support for values in [0, 100]%
// TODO: accept also rgba without a, consider it 1 as default
// Accept an object like this {r, g, b, a} with r,g,b numeric values in range [0, 255] and a in range [0,1]
function isRgba(color) {
    var keys = Object.keys(color);
    if (keys.length !== 4)
        return false;
    if (!utils_1.sameContent(keys, ['r', 'g', 'b', 'a']))
        return false;
    var isValid = function (value) { return typeof value === 'number' && utils_1.between(value, [0, 255]); };
    var r = isValid(color.r);
    var g = isValid(color.g);
    var b = isValid(color.b);
    var a = typeof color.a === 'number' && utils_1.between(color.a, [0, 1]);
    return r && g && b && a;
}
exports.isRgba = isRgba;
// TODO: add support for values in [0, 1]
// Accept an object like this {c, m, y, k} with c,m,y,k numeric values in range [0, 100]
function isCmyk(color) {
    var keys = Object.keys(color);
    if (keys.length !== 4)
        return false;
    if (!utils_1.sameContent(keys, ['c', 'm', 'y', 'k']))
        return false;
    var isValid = function (value) { return typeof value === 'number' && utils_1.between(value, [0, 100]); };
    var c = isValid(color.c);
    var m = isValid(color.m);
    var y = isValid(color.y);
    var k = isValid(color.k);
    return c && m && y && k;
}
exports.isCmyk = isCmyk;
function isColor(color) {
    return isHex(color) || isRgb(color) || isRgba(color) || isCmyk(color);
}
exports.isColor = isColor;

import { between, sameContent } from '../lib/utils';
// Accept:
//  - long form: #FFFFFF
//  - short form: #FFF
//  - long form with opacity: #FFFFFFFF (white with opacity FF=1)
export function isHex(color) {
    var reg = /^#([0-9A-F]{3}){1,2}([0-9A-F]{2})?$/i;
    return reg.test(color);
}
// Accept an object like this {r, g, b} with r,b,g numeric values in range [0, 255]
export function isRgb(color) {
    var keys = Object.keys(color);
    if (keys.length !== 3)
        return false;
    if (!sameContent(keys, ['r', 'g', 'b']))
        return false;
    var isValid = function (value) { return typeof value === 'number' && between(value, [0, 255]); };
    var r = isValid(color.r);
    var g = isValid(color.g);
    var b = isValid(color.b);
    return r && g && b;
}
// TODO: add support for values in [0, 100]%
// TODO: accept also rgba without a, consider it 1 as default
// Accept an object like this {r, g, b, a} with r,g,b numeric values in range [0, 255] and a in range [0,1]
export function isRgba(color) {
    var keys = Object.keys(color);
    if (keys.length !== 4)
        return false;
    if (!sameContent(keys, ['r', 'g', 'b', 'a']))
        return false;
    var isValid = function (value) { return typeof value === 'number' && between(value, [0, 255]); };
    var r = isValid(color.r);
    var g = isValid(color.g);
    var b = isValid(color.b);
    var a = typeof color.a === 'number' && between(color.a, [0, 1]);
    return r && g && b && a;
}
// TODO: add support for values in [0, 1]
// Accept an object like this {c, m, y, k} with c,m,y,k numeric values in range [0, 100]
export function isCmyk(color) {
    var keys = Object.keys(color);
    if (keys.length !== 4)
        return false;
    if (!sameContent(keys, ['c', 'm', 'y', 'k']))
        return false;
    var isValid = function (value) { return typeof value === 'number' && between(value, [0, 100]); };
    var c = isValid(color.c);
    var m = isValid(color.m);
    var y = isValid(color.y);
    var k = isValid(color.k);
    return c && m && y && k;
}
// Accept HSL colors with:
//  - h (hue): [0-359]°
//  - s (saturation): [0-100]%
//  - l (lightness): [0-100]%
export function isHsl(color) {
    var keys = Object.keys(color);
    if (keys.length !== 3)
        return false;
    if (!sameContent(keys, ['h', 's', 'l']))
        return false;
    var isValid = function (value, range) {
        return typeof value === 'number' && between(value, range);
    };
    var h = isValid(color.h, [0, 359]);
    var s = isValid(color.s, [0, 100]);
    var l = isValid(color.l, [0, 100]);
    return h && s && l;
}
export function isColor(color) {
    return isHex(color) || isRgb(color) || isRgba(color) || isCmyk(color);
}
//# sourceMappingURL=isType.js.map
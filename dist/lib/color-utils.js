"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var types_1 = require("../types/types");
var lodash_1 = require("lodash");
var utils_1 = require("../lib/utils");
// TODO: add check that color is a valid color
// Convert a color to a string format
exports.color2string = function (color) {
    if (types_1.isHex(color)) {
        return lodash_1.toUpper(color);
    }
    else if (types_1.isRgb(color)) {
        return color.r + ", " + color.g + ", " + color.b;
    }
    else if (types_1.isRgba(color)) {
        return color.r + ", " + color.g + ", " + color.b + ", " + color.a;
    }
    else if (types_1.isCmyk(color)) {
        return color.c + "%, " + color.m + "%, " + color.y + "%, " + color.k + "%";
    }
    else
        throw new Error(color + " is not a valid type of color.");
};
// TODO: add check that color is a valid color
// Convert a color to a string format usable in CSS
exports.color2cssString = function (color) {
    if (types_1.isHex(color)) {
        return lodash_1.toUpper(color);
    }
    else if (types_1.isRgb(color)) {
        return "rgb(" + color.r + ", " + color.g + ", " + color.b + ")";
    }
    else if (types_1.isRgba(color)) {
        return "rgba(" + color.r + ", " + color.g + ", " + color.b + ", " + color.a + ")";
    }
    else if (types_1.isCmyk(color)) {
        return "cmyk(" + color.c + "%, " + color.m + "%, " + color.y + "%, " + color.k + "%)";
    }
    else
        throw new Error(color + " is not a valid type of color.");
};
// TODO: add check that hex is a valid hex
// Convert an hex to a rgb or rgba color (depeds on hex format)
exports.hex2rgbOrRgba = function (hex) {
    var RGB_HEX = /^#?(?:([0-9a-f]{3})|([0-9a-f]{6})([0-9a-f]{2})?)$/i;
    // short and long are or undefined or the original_hex without #
    var _a = hex.match(RGB_HEX) || [], original_hex = _a[0], short = _a[1], long = _a[2], opacity = _a[3];
    if (long) {
        var value = Number.parseInt(long, 16);
        var rgb = { r: value >> 16, g: (value >> 8) & 0xff, b: value & 0xff };
        if (opacity) {
            var alpha = lodash_1.round(parseInt(opacity, 16) / 255, 2);
            return __assign(__assign({}, rgb), { a: alpha });
        }
        else {
            return rgb;
        }
    }
    else {
        // expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
        var _b = Array.from(short, function (s) { return Number.parseInt(s, 16); }).map(function (n) { return (n << 4) | n; }), r = _b[0], g = _b[1], b = _b[2];
        return { r: r, g: g, b: b };
    }
};
// TODO: add check that hex is a valid hex
// Convert an hex to a rgba object
exports.hex2rgba = function (hex, alpha) {
    if (alpha === void 0) { alpha = 1; }
    if (!utils_1.between(alpha, [0, 1])) {
        throw new Error(alpha + " is not in the range [0, 1].");
    }
    var rgbOrRgba = exports.hex2rgbOrRgba(hex);
    if (types_1.isRgb(rgbOrRgba)) {
        return __assign(__assign({}, rgbOrRgba), { a: alpha });
    }
    else if (types_1.isRgba(rgbOrRgba)) {
        return rgbOrRgba;
    }
    else {
        throw new Error(rgbOrRgba + " is neither RGB nor RGBA.");
    }
};
// TODO: add check that rgb is a valid rgb
// Convert an rgb object to hex
exports.rgb2hex = function (rgb) {
    var r = rgb.r, g = rgb.g, b = rgb.b;
    var hex = [r, g, b]
        .map(function (value) {
        var hex = value.toString(16);
        var paddedHex = hex.length === 1 ? "0" + hex : hex;
        return paddedHex;
    })
        .join('');
    return "#" + hex;
};
// Convert an hex to another hex with the given alpha
exports.hex2hexWithAlpha = function (hex, alpha) {
    if (!utils_1.between(alpha, [0, 1])) {
        throw new Error(alpha + " is not in the range [0, 1].");
    }
    var alpha255 = Math.round(alpha * 255);
    var alphaHex = alpha255.toString(16);
    var alphaHexPadded = alphaHex.length === 1 ? "0" + alphaHex : alphaHex;
    return "" + hex + alphaHexPadded;
};
// TODO: consider also alpha
// TODO: check all types of hex formats
// Convert an hex to a cmyk
exports.hex2cmyk = function (hex) {
    var _a = exports.hex2rgba(hex), r = _a.r, g = _a.g, b = _a.b;
    var c = 0;
    var m = 0;
    var y = 0;
    var k = 0;
    if (r === 0 && g === 0 && b === 0) {
        k = 1;
        return { c: c, m: m, y: y, k: k };
    }
    c = 1 - r / 255;
    m = 1 - g / 255;
    y = 1 - b / 255;
    var minCMY = Math.min(c, Math.min(m, y));
    c = (c - minCMY) / (1 - minCMY);
    m = (m - minCMY) / (1 - minCMY);
    y = (y - minCMY) / (1 - minCMY);
    k = minCMY;
    return { c: c, m: m, y: y, k: k };
};

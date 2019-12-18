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
import { isHex, isRgb, isRgba, isCmyk, isColor } from '../types/types';
import { toUpper, round } from 'lodash';
import { between, applyFnToEachObjValue } from '../lib/utils';
// Convert a color to a string format
export var color2string = function (color) {
    if (!isColor(color)) {
        throw new Error(color + " is not a color.");
    }
    if (isHex(color)) {
        return toUpper(color);
    }
    else if (isRgb(color)) {
        return color.r + ", " + color.g + ", " + color.b;
    }
    else if (isRgba(color)) {
        return color.r + ", " + color.g + ", " + color.b + ", " + color.a;
    }
    else if (isCmyk(color)) {
        return color.c + "%, " + color.m + "%, " + color.y + "%, " + color.k + "%";
    }
    else {
        throw new Error(color + " is not a valid type of color.");
    }
};
// Convert a color to a string format usable in CSS
export var color2cssString = function (color) {
    if (!isColor(color)) {
        throw new Error(color + " is not a color.");
    }
    if (isHex(color)) {
        return toUpper(color);
    }
    else if (isRgb(color)) {
        return "rgb(" + color.r + ", " + color.g + ", " + color.b + ")";
    }
    else if (isRgba(color)) {
        return "rgba(" + color.r + ", " + color.g + ", " + color.b + ", " + color.a + ")";
    }
    else if (isCmyk(color)) {
        return "cmyk(" + color.c + "%, " + color.m + "%, " + color.y + "%, " + color.k + "%)";
    }
    else {
        throw new Error(color + " is not a valid type of color.");
    }
};
// Convert an hex to a rgb or rgba color (depeds on hex format)
export var hex2rgbOrRgba = function (hex) {
    if (!isHex(hex)) {
        throw new Error(hex + " is not a hex color.");
    }
    var RGB_HEX = /^#?(?:([0-9a-f]{3})|([0-9a-f]{6})([0-9a-f]{2})?)$/i;
    // short and long are or undefined or the original_hex without #
    var _a = hex.match(RGB_HEX) || [], original_hex = _a[0], short = _a[1], long = _a[2], opacity = _a[3];
    if (long) {
        var value = Number.parseInt(long, 16);
        var rgb = { r: value >> 16, g: (value >> 8) & 0xff, b: value & 0xff };
        if (opacity) {
            var alpha = round(parseInt(opacity, 16) / 255, 2);
            return __assign(__assign({}, rgb), { a: alpha });
        }
        else {
            return rgb;
        }
    }
    else {
        // expand short form (e.g. "03F") to long form (e.g. "0033FF")
        var _b = Array.from(short, function (s) { return Number.parseInt(s, 16); }).map(function (n) { return (n << 4) | n; }), r = _b[0], g = _b[1], b = _b[2];
        return { r: r, g: g, b: b };
    }
};
// Convert an hex to a rgba object
export var hex2rgba = function (hex, alpha) {
    if (alpha === void 0) { alpha = 1; }
    if (!isHex(hex)) {
        throw new Error(hex + " is not a hex color.");
    }
    if (!between(alpha, [0, 1])) {
        throw new Error(alpha + " is not in the range [0, 1].");
    }
    var rgbOrRgba = hex2rgbOrRgba(hex);
    if (isRgb(rgbOrRgba)) {
        return __assign(__assign({}, rgbOrRgba), { a: alpha });
    }
    else if (isRgba(rgbOrRgba)) {
        return rgbOrRgba;
    }
    else {
        throw new Error(rgbOrRgba + " is neither RGB nor RGBA.");
    }
};
// Convert an rgb object to hex
export var rgb2hex = function (rgb) {
    if (!isRgb(rgb)) {
        throw new Error(rgb + " is not a rgb color.");
    }
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
export var hex2hexWithAlpha = function (hex, alpha) {
    if (!isHex(hex)) {
        throw new Error(hex + " is not a hex color.");
    }
    if (!between(alpha, [0, 1])) {
        throw new Error(alpha + " is not in the range [0, 1].");
    }
    var alpha255 = Math.round(alpha * 255);
    var alphaHex = alpha255.toString(16);
    var alphaHexPadded = alphaHex.length === 1 ? "0" + alphaHex : alphaHex;
    return "" + hex + alphaHexPadded;
};
// Convert an rgb to a cmyk
export var rgb2cmyk = function (rgb) {
    if (!isRgb(rgb)) {
        throw new Error(rgb + " is not a rgb color.");
    }
    var r = rgb.r, g = rgb.g, b = rgb.b;
    // normalize r,g,b values (from 0-255 to 0-1)
    var r01 = r / 255;
    var g01 = g / 255;
    var b01 = b / 255;
    if (r01 === 0 && g01 === 0 && b01 === 0) {
        return { c: 0, m: 0, y: 0, k: 100 };
    }
    var k = 1 - Math.max(r01, g01, b01);
    var c = (1 - r01 - k) / (1 - k);
    var m = (1 - g01 - k) / (1 - k);
    var y = (1 - b01 - k) / (1 - k);
    var roundedCmyk = applyFnToEachObjValue({ c: c, m: m, y: y, k: k }, function (c) { return round(c * 100); });
    return roundedCmyk;
};
// Convert an hex to a cmyk. If hex is in the long format (e.g. #000000FF) it removes the last two chars because cmyk doens't support opacity
export var hex2cmyk = function (hex) {
    if (!isHex(hex)) {
        throw new Error(hex + " is not a hex color.");
    }
    // remove opacity chars
    var hexShortFormat = hex.substring(0, 7);
    var rgb = hex2rgbOrRgba(hexShortFormat);
    var cmyk = rgb2cmyk(rgb);
    return cmyk;
};
// Convert a cmyk color to a rgb
export var cmyk2rgb = function (cmyk) {
    if (!isCmyk(cmyk)) {
        throw new Error(cmyk + " is not a cmyk color.");
    }
    var _a = applyFnToEachObjValue(cmyk, function (c) { return c / 100; }), c = _a.c, m = _a.m, y = _a.y, k = _a.k;
    var rgb01 = {
        r: 1 - Math.min(1, c * (1 - k) + k),
        g: 1 - Math.min(1, m * (1 - k) + k),
        b: 1 - Math.min(1, y * (1 - k) + k)
    };
    var rgb = applyFnToEachObjValue(rgb01, function (c) { return round(c * 255); });
    return rgb;
};
// Convert a cmyk color to a hex
export var cmyk2hex = function (cmyk) {
    if (!isCmyk(cmyk)) {
        throw new Error(cmyk + " is not a cmyk color.");
    }
    var rgb = cmyk2rgb(cmyk);
    var hex = rgb2hex(rgb);
    return hex;
};
//# sourceMappingURL=color-utils.js.map
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
import { isHex, isRgb, isRgba } from '../types/isType';
import { round } from 'lodash';
import { between } from './utils';
import { rgb2cmyk } from './rgb';
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
//# sourceMappingURL=hex.js.map
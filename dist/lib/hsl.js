import { isHsl } from '../types/isType';
import { applyFnToEachObjValue } from './utils';
import { round } from 'lodash';
import { rgb2hex, rgb2cmyk } from './rgb';
// Convert an hsl object to hex
export var hsl2hex = function (hsl) {
    if (!isHsl(hsl)) {
        throw new Error(hsl + " is not a hsl color.");
    }
    var rgb = hsl2rgb(hsl);
    var hex = rgb2hex(rgb);
    return hex;
};
// Convert an hsl object to rgb
export var hsl2rgb = function (hsl) {
    if (!isHsl(hsl)) {
        throw new Error(hsl + " is not a hsl color.");
    }
    var h = hsl.h, s = hsl.s, l = hsl.l;
    // normalize values
    var s01 = s / 100;
    var l01 = l / 100;
    if (s01 === 0) {
        var l_1 = l01 * 255;
        return { r: l_1, g: l_1, b: l_1 };
    }
    var angle = (h / 60) % 6;
    var angleRangeIndex = Math.floor(angle);
    var f = angle - angleRangeIndex;
    var chroma = s01 * (1 - Math.abs(2 * l01 - 1));
    var p = l01 + chroma / 2;
    var q = l01 - chroma / 2;
    var t = p - chroma * f;
    var w = q + chroma * f;
    var rgb01 = { r: 0, g: 0, b: 0 };
    if (angleRangeIndex === 0) {
        rgb01 = { r: p, g: w, b: q };
    }
    else if (angleRangeIndex === 1) {
        rgb01 = { r: t, g: p, b: q };
    }
    else if (angleRangeIndex === 2) {
        rgb01 = { r: q, g: p, b: w };
    }
    else if (angleRangeIndex === 3) {
        rgb01 = { r: q, g: t, b: p };
    }
    else if (angleRangeIndex === 4) {
        rgb01 = { r: w, g: q, b: p };
    }
    else if (angleRangeIndex === 5) {
        rgb01 = { r: p, g: q, b: t };
    }
    else {
        throw new Error("Error during conversion of hsl2rgb with " + hsl + ".");
    }
    var rgb = applyFnToEachObjValue(rgb01, function (c) { return round(c * 255); });
    return rgb;
};
// Convert an hsl object to cmyk
export var hsl2cmyk = function (hsl) {
    if (!isHsl(hsl)) {
        throw new Error(hsl + " is not a hsl color.");
    }
    var rgb = hsl2rgb(hsl);
    var cmyk = rgb2cmyk(rgb);
    return cmyk;
};
//# sourceMappingURL=hsl.js.map
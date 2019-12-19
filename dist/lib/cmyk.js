import { applyFnToEachObjValue } from './utils';
import { round } from 'lodash';
import { isCmyk } from '../types/isType';
import { rgb2hex } from './rgb';
// Convert a cmyk color to a rgb
export var cmyk2rgb = function (cmyk) {
    if (!isCmyk(cmyk)) {
        throw new Error(cmyk + " is not a cmyk color.");
    }
    var _a = applyFnToEachObjValue(cmyk, function (col) { return col / 100; }), c = _a.c, m = _a.m, y = _a.y, k = _a.k;
    var rgb01 = {
        r: 1 - Math.min(1, c * (1 - k) + k),
        g: 1 - Math.min(1, m * (1 - k) + k),
        b: 1 - Math.min(1, y * (1 - k) + k),
    };
    var rgb = applyFnToEachObjValue(rgb01, function (col) { return round(col * 255); });
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
//# sourceMappingURL=cmyk.js.map
import { isRgb, isRgba, isColor, isHex, isCmyk } from '../types/isType';
import { applyFnToEachObjValue } from './utils';
import { round } from 'lodash';
import { hex2rgba, cmyk2rgb, hsl2rgb } from '..';
// Convert an rgb object to hex
export function rgb2hex(rgb) {
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
}
// Convert an rgb to a cmyk
export function rgb2cmyk(rgb) {
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
}
// Convert an rgb object to hsl
export function rgb2hsl(rgb) {
    if (!isRgb(rgb)) {
        throw new Error(rgb + " is not a rgb color.");
    }
    var r = rgb.r, g = rgb.g, b = rgb.b;
    var max = Math.max(r, g, b);
    var min = Math.min(r, g, b);
    var l = (max + min) / 2;
    if (max === min) {
        // achromatic
        return { h: 0, s: 0, l: (l / 255) * 100 };
    }
    var chroma = max - min;
    var s = Math.abs(chroma / (1 - Math.abs(2 * l - 1))) * 100 - 1;
    var h;
    switch (max) {
        case r:
            h = 60 * ((g - b) / chroma) + (g < b ? 360 : 0);
            break;
        case g:
            h = 120 + (60 * (b - r)) / chroma;
            break;
        case b:
            h = 240 + (60 * (r - g)) / chroma;
            break;
    }
    var hsl = { h: h, s: s, l: (l / 255) * 100 };
    var hslRounded = applyFnToEachObjValue(hsl, function (c) { return round(c); });
    return hslRounded;
}
// Convert an rgba color to a rgb color removing the alpha value
export function rgba2rgb(rgba) {
    if (!isRgba(rgba)) {
        throw new Error(rgba + " is not a rgba color.");
    }
    return { r: rgba.r, g: rgba.g, b: rgba.b };
}
// Convert an rgb color to a rgba color adding 1 as alpha
export function rgb2rgba(rgb) {
    if (!isRgb(rgb)) {
        throw new Error(rgb + " is not a rgb color.");
    }
    return { r: rgb.r, g: rgb.g, b: rgb.b, a: 1 };
}
// Convert a generic color to rgb
export function color2rgb(color) {
    if (!isColor(color)) {
        throw new Error(color + " is not a valid color.");
    }
    else if (isHex(color)) {
        return rgba2rgb(hex2rgba(color));
    }
    else if (isRgb(color)) {
        return color;
    }
    else if (isRgba(color)) {
        return rgba2rgb(color);
    }
    else if (isCmyk(color)) {
        return cmyk2rgb(color);
    }
    else {
        // hsl
        return hsl2rgb(color);
    }
}
//# sourceMappingURL=rgb.js.map
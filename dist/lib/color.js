import { isHex, isRgb, isRgba, isCmyk, isColor } from '../types/isType';
import { toUpper } from 'lodash';
// Convert a color to a string format
export function color2string(color) {
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
}
// Convert a color to a string format usable in CSS
export function color2cssString(color) {
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
}
//# sourceMappingURL=color.js.map
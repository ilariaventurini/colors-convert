import { color2rgb } from './rgb';
import { colorNames } from '../constants/colorNames';
import { minBy } from 'lodash';
export function name(color) {
    var colorRgb = color2rgb(color);
    var distances = colorNames.map(function (_a) {
        var name = _a.name, hex = _a.hex, rgb = _a.rgb;
        var d = distance(rgb, colorRgb);
        return { name: name, distance: d, hex: hex, rgb: rgb };
    });
    var nearestColor = minBy(distances, 'distance');
    if (!nearestColor)
        throw new Error("Something went wrong finding a name to " + color + ".");
    return nearestColor.name;
}
function distance(color1, color2) {
    var c1Rgb = color2rgb(color1);
    var c2Rgb = color2rgb(color2);
    var distance = euclideanRgbDistance(c1Rgb, c2Rgb);
    return distance;
}
function euclideanRgbDistance(color1, color2) {
    var rDiff = Math.pow(color1.r - color2.r, 2);
    var gDiff = Math.pow(color1.g - color2.g, 2);
    var bDiff = Math.pow(color1.b - color2.b, 2);
    return Math.sqrt(rDiff + gDiff + bDiff);
}
//# sourceMappingURL=name.js.map
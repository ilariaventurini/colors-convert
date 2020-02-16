import { color2rgb } from './rgb';
import { sum, sumBy, round } from 'lodash';
import { applyFnToEachObjValue } from './utils';
// Blend two or more colors based on their weights.
// Given [c1, c2, c3, ...] and [w1, w2, w3, ...], it returns:
//   mixedCol = {
//      r: sqrt(r1^2 * w1 + r2^2 * w2 + r3^2 * w3 + ...)
//      g: sqrt(g1^2 * w1 + g2^2 * w2 + g3^2 * w3 + ...)
//      b: sqrt(b1^2 * w1 + b2^2 * w2 + b3^2 * w3 + ...)
//   }
export function mix(colors, weights) {
    // defaulting weights
    var ws = getWeights(colors, weights);
    // convert colors in rgb
    var rgbs = colors.map(color2rgb);
    // create the mixed color
    var weightedRgbs = rgbs.map(function (rgb, i) {
        return weightedRgb(rgb, ws[i]);
    });
    var weightedR = Math.sqrt(sumBy(weightedRgbs, 'cPwR'));
    var weightedG = Math.sqrt(sumBy(weightedRgbs, 'cPwG'));
    var weightedB = Math.sqrt(sumBy(weightedRgbs, 'cPwB'));
    var mix = { r: weightedR, g: weightedG, b: weightedB };
    return applyFnToEachObjValue(mix, function (c) { return round(c); });
}
var weightedRgb = function (rgb, weight) {
    var r = rgb.r, g = rgb.g, b = rgb.b;
    var cPwR = r * r * weight;
    var cPwG = g * g * weight;
    var cPwB = b * b * weight;
    return { cPwR: cPwR, cPwG: cPwG, cPwB: cPwB };
};
var getWeights = function (colors, weights) {
    var defaultWeight = 1 / colors.length;
    var defaultWeights = Array(colors.length).fill(defaultWeight);
    if (weights && checkWeights(colors, weights)) {
        return weights;
    }
    else {
        return defaultWeights;
    }
};
var checkWeights = function (colors, weights) {
    var tot = sum(weights);
    if (tot !== 1) {
        throw new Error("The sum of the weights should be 1, instead is " + tot + ".");
    }
    if (weights.length !== colors.length) {
        throw new Error("Colors and weights should be in the same number. Colors are " + colors.length + " and weights are " + weights.length + ".");
    }
    return true;
};
//# sourceMappingURL=mix.js.map
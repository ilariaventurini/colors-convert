"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var types_1 = require("./types/types");
exports.isHex = types_1.isHex;
exports.isRgb = types_1.isRgb;
exports.isRgba = types_1.isRgba;
exports.isCmyk = types_1.isCmyk;
exports.isColor = types_1.isColor;
var color_utils_1 = require("./lib/color-utils");
exports.color2string = color_utils_1.color2string;
exports.color2cssString = color_utils_1.color2cssString;
exports.hex2rgbOrRgba = color_utils_1.hex2rgbOrRgba;
exports.hex2rgba = color_utils_1.hex2rgba;
exports.rgb2hex = color_utils_1.rgb2hex;
exports.hex2hexWithAlpha = color_utils_1.hex2hexWithAlpha;
exports.hex2cmyk = color_utils_1.hex2cmyk;
var random_1 = require("./lib/random");
exports.getRandomColor = random_1.getRandomColor;
//# sourceMappingURL=index.js.map
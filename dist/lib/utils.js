"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.between = function (value, range) {
    var min = Math.min.apply(Math, range);
    var max = Math.max.apply(Math, range);
    return value >= min && value <= max;
};
exports.sameContent = function (a, b) { return a.sort().toString() == b.sort().toString(); };

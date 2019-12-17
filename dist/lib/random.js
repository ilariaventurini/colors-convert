"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// TODO: not only hex
// TODO: choose hue, saturation, ...
// TODO: create a random color similar to another
// Create a random hex
exports.getRandomColor = function () {
    var alphabet = "0123456789ABCDEF";
    var color = "#";
    for (var i = 0; i < 6; i++) {
        color += alphabet[Math.floor(Math.random() * 16)];
    }
    return color;
};

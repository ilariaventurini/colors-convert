"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../index");
////////////////////////////////////////////////////////
// getRandomColor
////////////////////////////////////////////////////////
test("getRandomColor", function () {
    expect(index_1.isHex(index_1.getRandomColor())).toBe(true);
});

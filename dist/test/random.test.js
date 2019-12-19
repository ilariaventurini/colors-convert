import { getRandomColor, isHex } from '../index';
////////////////////////////////////////////////////////
// getRandomColor
////////////////////////////////////////////////////////
test("getRandomColor", function () {
    expect(isHex(getRandomColor())).toBe(true);
});
//# sourceMappingURL=random.test.js.map
export var between = function (value, range) {
    var min = Math.min.apply(Math, range);
    var max = Math.max.apply(Math, range);
    return value >= min && value <= max;
};
export var sameContent = function (a, b) { return a.sort().toString() == b.sort().toString(); };
export var applyFnToEachObjValue = function (obj, fn) {
    Object.entries(obj).forEach(function (_a) {
        var key = _a[0], value = _a[1];
        // @ts-ignore
        obj[key] = fn(value);
    });
    return obj;
};
//# sourceMappingURL=utils.js.map
export function between(value, range) {
    var min = Math.min.apply(Math, range);
    var max = Math.max.apply(Math, range);
    return value >= min && value <= max;
}
export function betweenMaxNotIncluded(value, range) {
    var min = Math.min.apply(Math, range);
    var max = Math.max.apply(Math, range);
    return value >= min && value < max;
}
export function sameContent(a, b) {
    return a.sort().toString() === b.sort().toString();
}
export function applyFnToEachObjValue(obj, fn) {
    Object.entries(obj).forEach(function (_a) {
        var key = _a[0], value = _a[1];
        // @ts-ignore
        obj[key] = fn(value);
    });
    return obj;
}
//# sourceMappingURL=utils.js.map
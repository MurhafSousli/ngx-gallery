export function isEqual(array1, array2) {
    if (array1 === void 0) { array1 = []; }
    if (array2 === void 0) { array2 = []; }
    if (array1.length !== array2.length) {
        return false;
    }
    array1 = array1.sort();
    array2 = array2.sort();
    for (var i = array1.length; i--;) {
        if (array1[i] !== array2[i]) {
            return false;
        }
    }
    return true;
}
//# sourceMappingURL=isEqual.js.map
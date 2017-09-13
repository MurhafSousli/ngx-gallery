export function pluck(array, field) {
    var result = [];
    for (var i = array.length; i--;) {
        result.push(array[i][field]);
    }
    return result;
}
//# sourceMappingURL=pluck.js.map
export function get(obj, path, def) {
    if (def === void 0) { def = undefined; }
    if (!obj || !path) {
        return def;
    }
    var arr = path.split('.');
    var current = obj;
    for (var i = 0; i < arr.length; i++) {
        if (!current[arr[i]]) {
            return def;
        }
        current = current[arr[i]];
    }
    return current || def;
}
//# sourceMappingURL=get.js.map
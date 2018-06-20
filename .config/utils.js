"use strict";
exports.__esModule = true;
var fs_1 = require("fs");
var path_1 = require("path");
var operators_1 = require("rxjs/operators");
var replaceExt = require("replace-ext");
var c = require("ansi-colors");
var WorkFile = /** @class */ (function () {
    function WorkFile(src, srcDir, distDir) {
        this.src = src;
        // Subtract src dir from file path
        var relativePath = path_1.relative(srcDir, src);
        // Add baseDist + relativePath
        this.distScss = path_1.join(distDir, relativePath);
        this.distCss = replaceExt(this.distScss, '.css');
    }
    return WorkFile;
}());
exports.WorkFile = WorkFile;
/** Loop over all files from directory and sub-directories */
function readFiles(filePath, fileType, callback) {
    if (path_1.extname(filePath) === fileType) {
        callback(filePath);
    }
    else if (fs_1.lstatSync(filePath).isDirectory()) {
        // src is directory
        var filesOrDirectories = fs_1.readdirSync(filePath);
        filesOrDirectories.map(function (fileName) {
            var fileOrDirectory = path_1.join(filePath, fileName);
            readFiles(fileOrDirectory, fileType, callback);
        });
    }
}
exports.readFiles = readFiles;
/** Creates directories recursively */
function dirMaker(target) {
    // check if parent directory exists
    var parentDir = path_1.dirname(target);
    if (!fs_1.existsSync(parentDir)) {
        dirMaker(parentDir);
    }
    // check if directory exists
    if (!fs_1.existsSync(target)) {
        fs_1.mkdirSync(target);
    }
}
exports.dirMaker = dirMaker;
/** Make directory for the work file */
exports.makeDirectory = operators_1.map(function (file) {
    dirMaker(path_1.dirname(file.distScss));
    return file;
});
/** Copy file from src to dist */
exports.copyFile = operators_1.map(function (file) {
    fs_1.createReadStream(file.src).pipe(fs_1.createWriteStream(file.distScss));
    return file;
});
function logError(err) {
    console.log(c.bgred('[Error]:'), c.red(err));
}
exports.logError = logError;
function logSuccess(file) {
    console.log(c.magenta(path_1.basename(file.distScss)), c.green(c.symbols.check));
}
exports.logSuccess = logSuccess;

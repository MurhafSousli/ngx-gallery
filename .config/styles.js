"use strict";
exports.__esModule = true;
var node_sass_1 = require("node-sass");
var postcss = require("postcss");
var cssnano = require("cssnano");
var autoprefixer = require("autoprefixer");
var stripInlineComments = require("postcss-strip-inline-comments");
var fs_1 = require("fs");
var Subject_1 = require("rxjs/Subject");
var bindNodeCallback_1 = require("rxjs/observable/bindNodeCallback");
var fromPromise_1 = require("rxjs/observable/fromPromise");
var operators_1 = require("rxjs/operators");
var utils_1 = require("./utils");
/** Compile SCSS to CSS */
var compileScssFile = operators_1.mergeMap(function (file) {
    var compileSass$ = bindNodeCallback_1.bindNodeCallback(node_sass_1.render);
    return compileSass$({ file: file.src }).pipe(operators_1.mergeMap(function (res) { return processCss(res.css); }), operators_1.mergeMap(function (result) { return createCssFile(file.distCss, result.css); }), operators_1.tap(function () { return utils_1.logSuccess(file); }));
});
/** Process CSS file */
function processCss(cssData) {
    var CSS_PROCESSORS = [stripInlineComments, autoprefixer, cssnano];
    var process$ = postcss(CSS_PROCESSORS).process(cssData.toString('utf8'));
    return fromPromise_1.fromPromise(process$);
}
/** Create css file and save it to dist */
function createCssFile(target, cssContent) {
    var cssData = new Buffer(cssContent);
    var writeFile$ = bindNodeCallback_1.bindNodeCallback(fs_1.writeFile);
    // Write css file to dist
    return writeFile$(target, cssData);
}
function sendFileToWorker(target) {
    worker$.next(new utils_1.WorkFile(target, SRC_DIR, DIST_DIR));
}
function startTask() {
    // check if SRC_DIR exists
    if (!fs_1.existsSync(SRC_DIR)) {
        utils_1.logError(SRC_DIR + " does not exist!");
        return;
    }
    utils_1.readFiles(SRC_DIR, '.scss', sendFileToWorker);
}
var worker$ = new Subject_1.Subject();
worker$.pipe(utils_1.makeDirectory, utils_1.copyFile, compileScssFile).subscribe();
/** Read arguments from process */
var SRC_DIR = process.argv[2];
var DIST_DIR = process.argv[3];
if (!SRC_DIR || !DIST_DIR) {
    throw new Error('Base dir has not been set!');
}
startTask();

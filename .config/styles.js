const sass = require('node-sass');
const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp');
const cssnano = require('cssnano');
const postcss = require('postcss');
const autoprefixer = require('autoprefixer');
const stripInlineComments = require('postcss-strip-inline-comments');

const gulpUtil = require('gulp-util');

const processors = [
  stripInlineComments,
  autoprefixer,
  cssnano
];

const srcDir = 'lib/core/src/styles/';
const distButtonDir = 'build/core/styles/';

function writeStyleFile(file) {

  console.log(file);
  /** Create dir if not exists */
  if (!fs.existsSync(path.dirname(file.path))) {
    mkdirp.sync(path.dirname(file.path), function (err) {
      if (err) gulpUtil.log('[mkdirp]:', err)
    });
  }

  /** Write css files to build dir */
  fs.writeFileSync(file.path, file.contents, function (err) {
    if (!err) {
      gulpUtil.log('[writeFileSync]:', err);
    }
  });
}


function start(startPath, filter, callback) {

  if (!fs.existsSync(startPath)) {
    console.log("no dir ", startPath);
    return;
  }

  const files = fs.readdirSync(startPath);
  for (var i = 0; i < files.length; i++) {
    var filename = path.join(startPath, files[i]);
    var stat = fs.lstatSync(filename);
    if (stat.isDirectory()) {
      start(filename, filter, callback); //recurse
    }
    else if (filter.test(filename)) callback(filename);
  }
}

function sassTask(filePath) {

  const theme = path.relative(srcDir, filePath);

  /** Compile scss to css */
  const sassObj = sass.renderSync({
    file: filePath
  });

  if (sassObj && sassObj.css) {
    const css = sassObj.css.toString('utf8');
    postcss(processors).process(css).then(function (result) {

      /** Log warnings if any exists */
      result.warnings().forEach(function (warn) {
        gulpUtil.log(warn.toString());
      });

      /** Create css file object */
      const file = {};
      file.contents = new Buffer(result.css);

      /** Write css files to button dir */
      file.path = gulpUtil.replaceExtension(distButtonDir + theme, '.css');

      writeStyleFile(file);
      fs.createReadStream(filePath).pipe(fs.createWriteStream(distButtonDir + theme));
    });
  }
}

start(srcDir, /\.scss$/, function (filename) {
  sassTask(filename);
});

import { render as renderSass, Result } from 'node-sass';
import * as postcss from 'postcss';
import * as cssnano from 'cssnano';
import * as autoprefixer from 'autoprefixer';
import * as stripInlineComments from 'postcss-strip-inline-comments';

import { existsSync, writeFile } from 'fs';
import { Subject, bindNodeCallback, from } from 'rxjs';
import { mergeMap, tap } from 'rxjs/operators';

import { WorkFile, copyFile, makeDirectory, logSuccess, logError, readFiles } from './utils';

/** Compile SCSS to CSS */
const compileScssFile = mergeMap((file: WorkFile) => {
  const compileSass$: any = bindNodeCallback(renderSass);
  return compileSass$({file: file.src}).pipe(
    mergeMap((res: Result) => processCss(res.css)),
    mergeMap((result: any) => createCssFile(file.distCss, result.css)),
    tap(() => logSuccess(file))
  );
});

/** Process CSS file */
function processCss(cssData: Buffer) {
  const CSS_PROCESSORS = [stripInlineComments, autoprefixer, cssnano];
  const process$ = postcss(CSS_PROCESSORS).process(cssData.toString('utf8'));
  return from(process$);
}

/** Create css file and save it to dist */
function createCssFile(target: string, cssContent: string) {
  const cssData = new Buffer(cssContent);
  const writeFile$: any = bindNodeCallback(writeFile);
  // Write css file to dist
  return writeFile$(target, cssData);
}

function sendFileToWorker(target: string) {
  worker$.next(new WorkFile(target, SRC_DIR, DIST_DIR));
}

function startTask() {
  // check if SRC_DIR exists
  if (!existsSync(SRC_DIR)) {
    logError( `${SRC_DIR} does not exist!`);
    return;
  }
  readFiles(SRC_DIR, '.scss', sendFileToWorker);
}

const worker$ = new Subject<WorkFile>();
worker$.pipe(
  makeDirectory,
  copyFile,
  compileScssFile
).subscribe();

/** Read arguments from process */
const SRC_DIR = process.argv[2];
const DIST_DIR = process.argv[3];
if (!SRC_DIR || !DIST_DIR) {
  throw new Error('Base dir has not been set!');
}
startTask();

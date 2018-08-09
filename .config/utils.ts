import { createReadStream, createWriteStream, existsSync, lstatSync, mkdirSync, readdirSync } from 'fs';
import { dirname, relative, join, basename, extname } from 'path';
import { map } from 'rxjs/operators';
import * as replaceExt from 'replace-ext';
import * as c from 'ansi-colors';

export class WorkFile {
  distCss: string;
  distScss: string;

  constructor(public src: string, srcDir: string, distDir: string) {
    // Subtract src dir from file path
    const relativePath = relative(srcDir, src);
    const dirName = dirname(relativePath);
    const fileName = basename(relativePath);
    // Put sass files in scss folder
    const scssPath = join(dirName, 'scss', fileName);
    // Put css files in css folder
    const cssPath = join(dirName, 'css', replaceExt(fileName, '.css'));
    // Add baseDist + relativePath
    this.distScss = join(distDir, scssPath);
    this.distCss = join(distDir, cssPath);
  }
}

/** Loop over all files from directory and sub-directories */
export function readFiles(filePath: string, fileType: string, callback: Function) {
  if (extname(filePath) === fileType) {
    callback(filePath);
  } else if (lstatSync(filePath).isDirectory()) {
    // src is directory
    const filesOrDirectories = readdirSync(filePath);
    filesOrDirectories.map((fileName: string) => {
      const fileOrDirectory = join(filePath, fileName);
      readFiles(fileOrDirectory, fileType, callback);
    });
  }
}

/** Creates directories recursively */
export function dirMaker(target: string) {
  // check if parent directory exists
  const parentDir = dirname(target);
  if (!existsSync(parentDir)) {
    dirMaker(parentDir);
  }
  // check if directory exists
  if (!existsSync(target)) {
    mkdirSync(target);
  }
}

/** Make directory for the work file */
export const makeDirectory = map((file: WorkFile): WorkFile => {
  dirMaker(dirname(file.distScss));
  dirMaker(dirname(file.distCss));
  return file;
});

/** Copy file from src to dist */
export const copyFile = map((file: WorkFile): WorkFile => {
  createReadStream(file.src).pipe(createWriteStream(file.distScss));
  return file;
});

export function logError(err: any) {
  console.log(c.bgRedBright('[Error]:'), c.red(err));
}

export function logSuccess(file: WorkFile) {
  console.log(c.magenta(basename(file.distScss)), c.green(c.symbols.check));
}

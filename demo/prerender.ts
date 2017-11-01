// Load zone.js for the server.
import 'zone.js/dist/zone-node';
import 'reflect-metadata';
import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

// Express Engine
import { ngExpressEngine } from '@nguniversal/express-engine';
// Import module map for lazy loading
import { provideModuleMap } from '@nguniversal/module-map-ngfactory-loader';

import { renderModuleFactory } from '@angular/platform-server';

// * NOTE :: leave this as require() since this file is built Dynamically from webpack
const { AppServerModuleNgFactory, LAZY_MODULE_MAP } = require('./dist-server/main.bundle');

const DIST_FOLDER = join(process.cwd(), 'dist');

// Load the index.html file containing references to your application bundle.
const index = readFileSync(join(DIST_FOLDER, 'index.html'), 'utf8');


// Writes rendered HTML to ./dist/index.html, replacing the file if it already exists.
renderModuleFactory(AppServerModuleNgFactory, {
  document: index,
  url: '/',
  extraProviders: [
    provideModuleMap(LAZY_MODULE_MAP)
  ]
})
  .then(html => {
    console.log(`Replacing 'index.html' file at '${DIST_FOLDER}/index.html'`);
    writeFileSync(join(DIST_FOLDER, 'index.html'), html);
    console.log(`File 'index.html' successfully replaced with server-side version!`);
  });

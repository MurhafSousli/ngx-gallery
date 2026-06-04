import fs from 'node:fs';

fs.copyFileSync(
  'README.md',
  'dist/ng-gallery/README.md'
);

import { Routes } from '@angular/router';
import { DocumentationComponent } from './documentation.component';

export const docRoutes: Routes = [
  {
    path: '',
    component: DocumentationComponent,
    children: [
      {
        path: '',
        redirectTo: 'core',
        pathMatch: 'full'
      },
      {
        path: 'core',
        loadChildren: './doc-core/doc-core.module#DocCoreModule',
      },
      {
        path: 'lightbox',
        loadChildren: './doc-lightbox/doc-lightbox.module#DocLightboxModule',
      },
      {
        path: 'gallerize',
        loadChildren: './doc-gallerize/doc-gallerize.module#DocGallerizeModule',
      },
    ]
  }
];

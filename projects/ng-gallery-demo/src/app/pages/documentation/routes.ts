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
        loadChildren: () => import('./doc-core/doc-core.module').then(m => m.DocCoreModule)
      },
      {
        path: 'lightbox',
        loadChildren: () => import('./doc-lightbox/doc-lightbox.module').then(m => m.DocLightboxModule)
      }
    ]
  }
];

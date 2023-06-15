import { Routes } from '@angular/router';
import { DocumentationComponent } from './documentation.component';

export const DOCUMENTATION_ROUTES: Routes = [
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
        loadComponent: () => import('./doc-core/doc-core.component').then(m => m.DocCoreComponent)
      },
      {
        path: 'lightbox',
        loadComponent: () => import('./doc-lightbox/doc-lightbox.component').then(m => m.DocLightboxComponent)
      }
    ]
  }
];

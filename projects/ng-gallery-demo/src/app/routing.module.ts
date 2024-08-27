import { Routes } from '@angular/router';

export const appRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent),
    pathMatch: 'full'
  },
  {
    path: 'getting-started',
    loadChildren: () => import('./pages/documentation/routes').then(m => m.DOCUMENTATION_ROUTES)
  },
  {
    path: 'gallery',
    loadComponent: () => import('./pages/gallery-example/gallery-example.component').then(m => m.GalleryExampleComponent)
  },
  {
    path: 'lightbox',
    loadComponent: () => import('./pages/lightbox-example/lightbox-example.component').then(m => m.LightboxExampleComponent)
  },
  {
    path: 'gallerize',
    loadComponent: () => import('./pages/gallerize-example/gallerize-example.component').then(m => m.GallerizeExampleComponent)
  },
  {
    path: 'custom-templates',
    loadComponent: () => import('./pages/templates-example/templates-example.component').then(m => m.TemplatesExampleComponent)
  },
  {
    path: 'lab',
    loadComponent: () => import('./pages/lab/lab.component').then(m => m.LabComponent)
  },
  {
    path: '**',
    loadComponent: () => import('./pages/not-found/not-found.component').then(m => m.NotFoundComponent)
  }
];

// @NgModule({
//   imports: [
//     RouterModule.forRoot(appRoutes, {useHash: true})
//   ],
//   exports: [
//     RouterModule
//   ]
// })
//
// export class AppRoutingModule {
// }
